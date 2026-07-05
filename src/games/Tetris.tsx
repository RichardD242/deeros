export default function TetrisGame() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-deer-bg p-4">
      <iframe
        src="https://chvin.github.io/react-tetris/?lan=en"
        title="tetris"
        className="w-full h-full rounded-deer-xl border border-deer-border"
      />
    </div>
  );
}
