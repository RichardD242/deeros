declare module 'react-snake-lib' {
  import type { ComponentType, CSSProperties } from 'react';

  type SnakeProps = {
    onScoreChange?: (score: number) => void;
    onGameOver?: () => void;
    onGameStart?: () => void;
    width?: string;
    height?: string;
    bgColor?: string;
    innerBorderColor?: string;
    snakeSpeed?: number;
    borderColor?: string;
    snakeColor?: string;
    snakeHeadColor?: string;
    appleColor?: string;
    borderRadius?: number;
    snakeHeadRadius?: number;
    borderWidth?: number;
    shakeBoard?: boolean;
    boxShadow?: string;
    size?: number;
    startGameText?: string;
    startButtonStyle?: CSSProperties;
    startButtonHoverStyle?: CSSProperties;
    noWall?: boolean;
  };

  export const Snake: ComponentType<SnakeProps>;
}
