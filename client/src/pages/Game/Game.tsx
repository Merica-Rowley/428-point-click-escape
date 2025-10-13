import AuthButtons from "../../components/auth/AuthButtons";
import GameScreen from "../../components/GameScreen/Screen";
import Inventory from "../../components/Inventory/Inventory";
import "./Game.css";

export default function Game() {
  return (
    <div className="game-screen">
      <div className="game-buttons">
        <button>Save</button>
        <AuthButtons />
      </div>
      <div className="game-window">
        <GameScreen />
        <Inventory />
      </div>
    </div>
  );
}
