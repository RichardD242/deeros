const green = '#6F8A71';

export default function Button({
  variant = 'outline',
  className = '',
  style,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }) {
  const base = 'px-7 py-3 text-sm font-medium rounded-deer-xl transition-all duration-200 active:scale-95 z-10';
  const variants = {
    primary: 'text-white shadow-sm hover:brightness-110',
    outline: 'bg-deer-surface border hover:bg-deer-bg',
  };
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === 'primary' ? { backgroundColor: green, ...style } : { borderColor: green, color: green, ...style }}
    />
  );
}
