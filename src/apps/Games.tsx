import { useState } from "react";
import { Gamepad2, ChevronRight } from "lucide-react";

import Wolfenstein from "../games/Wolfenstein";
import Tetris from "../games/Tetris";
import Snake from "../games/Snake";

type Game = "menu" | "wolfenstein" | "tetris" | "snake";

export default function GamesApp() {
    const [game, setGame] = useState<Game>("menu");
    
    if (game === "wolfenstein") return <Wolfenstein />;
    if (game === "tetris") return <Tetris />;
    if (game === "snake") return <Snake />;

    return (
        <div className="h-full bg-deer-bg text-deer-primary p-6">
            <div className="flex items-center gap-3 mb-6">
                <Gamepad2 size={28} />
                <h1 className="text-2xl font-semibold">games</h1>
            </div>
            <div className="space-y-3">

                <button
                    onClick={() => setGame("wolfenstein")}
                    className="w-full flex items-center justify-between rounded-2xl bg-deer-primary/10 p-4 hover:bg-deer-primary/20 transition"
                >
                    <span>wolfenstein 3D</span>
                    <ChevronRight size={20} />
                </button>

                <button
                    onClick={() => setGame("tetris")}
                    className="w-full flex items-center justify-between rounded-2xl bg-deer-primary/10 p-4 hover:bg-deer-primary/20 transition"
                >
                    <span>tetris</span>
                    <ChevronRight size={20} />
                </button>

                <button
                    onClick={() => setGame("snake")}
                    className="w-full flex items-center justify-between rounded-2xl bg-deer-primary/10 p-4 hover:bg-deer-primary/20 transition"
                >
                    <span>snake</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}                   