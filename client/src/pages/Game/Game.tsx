import { useState } from "react";
import AuthButtons from "../../components/auth/AuthButtons";
import GameScreen from "../../components/GameScreen/Screen";
import Inventory from "../../components/Inventory/Inventory";
import "./Game.css";

export default function Game() {
  const [inventory, setInventory] = useState({
    key: false,
  });

  const pickUpItem = (itemName: string) => {
    setInventory((prev) => ({ ...prev, [itemName]: true }));
  };

  return (
    <div className="game-screen">
      <div className="game-buttons">
        <button>Save</button>
        <AuthButtons />
      </div>
      <div className="game-window">
        <GameScreen inventory={inventory} onPickUpItem={pickUpItem} />
        <Inventory />
      </div>
    </div>
  );
}
