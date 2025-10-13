import AuthButtons from "../components/auth/AuthButtons";
import GameScreen from "../components/GameScreen/Screen";
import Inventory from "../components/Inventory/Inventory";

export default function Game() {
  return (
    <>
      <AuthButtons />
      <div className="GameWindow">
        <GameScreen />
        <Inventory />
      </div>
    </>
  );
}
