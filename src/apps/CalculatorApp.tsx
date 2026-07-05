import { useState } from 'react';
import { Divide, X, Minus, Plus, Equal, Percent } from 'lucide-react';

type Operator = '/' | '*' | '-' | '+' | null;

const operatorIcons: Record<Exclude<Operator, null>, React.ReactNode> = {
    '/': <Divide size={22} />,
    '*': <X size={22} />,
    '-': <Minus size={22} />,
    '+': <Plus size={22} />,
};

function compute(a: number, b: number, op: Exclude<Operator, null>) {
    switch (op) {
        case '/': return a / b;
        case '*': return a * b;
        case '-': return a - b;
        case '+': return a + b;
    }
}

function formatValue(value: number) {
    if (!Number.isFinite(value)) return 'Error';
    const str = value.toPrecision(10).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
    return str.length > 12 ? value.toExponential(5) : str;
}

export default function CalculatorApp() {
    const [display, setDisplay] = useState('0');
    const [stored, setStored] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator>(null);
    const [resetNext, setResetNext] = useState(false);

    const inputDigit = (digit: string) => {
        if (resetNext || display === '0') {
            setDisplay(digit);
            setResetNext(false);
        } else {
            setDisplay(display + digit);
        }
    };

    const inputDecimal = () => {
        if (resetNext) {
            setDisplay('0.');
            setResetNext(false);
            return;
        }
        if (!display.includes('.')) setDisplay(display + '.');
    };

    const clear = () => {
        setDisplay('0');
        setStored(null);
        setOperator(null);
        setResetNext(false);
    };

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const inputPercent = () => {
        setDisplay(formatValue(parseFloat(display) / 100));
    };

    const chooseOperator = (op: Exclude<Operator, null>) => {
        const current = parseFloat(display);
        if (stored !== null && operator && !resetNext) {
            setDisplay(formatValue(compute(stored, current, operator)));
            setStored(compute(stored, current, operator));
        } else {
            setStored(current);
        }
        setOperator(op);
        setResetNext(true);
    };

    const equals = () => {
        if (stored === null || !operator) return;
        const current = parseFloat(display);
        setDisplay(formatValue(compute(stored, current, operator)));
        setStored(null);
        setOperator(null);
        setResetNext(true);
    };

    const numberBtn = 'bg-deer-bg text-deer-primary hover:bg-deer-border';
    const functionBtn = 'bg-sand text-deer-primary hover:bg-sand/80';
    const operatorBtn = (op: Exclude<Operator, null>) =>
        operator === op && resetNext
            ? 'bg-deer-bg text-moss'
            : 'bg-moss text-white hover:bg-moss-hover';

    const baseBtn = 'rounded-full flex items-center justify-center text-xl font-medium transition-colors select-none';
    const circleBtn = `${baseBtn} aspect-square`;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-deer-surface">
        <div className="w-full max-w-sm h-full flex flex-col gap-4 p-5">
            <div className="flex-1 flex items-end justify-end overflow-hidden">
                <span className="text-deer-primary text-5xl font-light truncate">{display}</span>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <button className={`${circleBtn} ${functionBtn}`} onClick={clear}>
                    {stored !== null || display !== '0' ? 'C' : 'AC'}
                </button>
                <button className={`${circleBtn} ${functionBtn}`} onClick={toggleSign}>
                    +/-
                </button>
                <button className={`${circleBtn} ${functionBtn}`} onClick={inputPercent}>
                    <Percent size={20} />
                </button>
                <button className={`${circleBtn} ${operatorBtn('/')}`} onClick={() => chooseOperator('/')}>
                    {operatorIcons['/']}
                </button>

                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('7')}>7</button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('8')}>8</button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('9')}>9</button>
                <button className={`${circleBtn} ${operatorBtn('*')}`} onClick={() => chooseOperator('*')}>
                    {operatorIcons['*']}
                </button>

                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('4')}>4</button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('5')}>5</button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('6')}>6</button>
                <button className={`${circleBtn} ${operatorBtn('-')}`} onClick={() => chooseOperator('-')}>
                    {operatorIcons['-']}
                </button>

                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('1')}>1</button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('2')}>2</button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={() => inputDigit('3')}>3</button>
                <button className={`${circleBtn} ${operatorBtn('+')}`} onClick={() => chooseOperator('+')}>
                    {operatorIcons['+']}
                </button>

                <button
                    className={`${baseBtn} ${numberBtn} col-span-2 justify-start pl-7 h-16`}
                    onClick={() => inputDigit('0')}
                >
                    0
                </button>
                <button className={`${circleBtn} ${numberBtn}`} onClick={inputDecimal}>.</button>
                <button className={`${circleBtn} bg-moss text-white hover:bg-moss-hover`} onClick={equals}>
                    <Equal size={22} />
                </button>
            </div>
        </div>
        </div>
    );
}
