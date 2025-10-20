import { useState } from "react";
import AuthButtons from "../../components/auth/AuthButtons";
import GameScreen from "../../components/GameScreen/Screen";
import Inventory from "../../components/Inventory/Inventory";
import "./Game.css";

export type item = {
  name: string;
};

export default function Game() {
  const allItems: item[] = [{ name: "key" }] as const;

  const [inventory, setInventory] = useState<item[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const pickUpItem = (itemName: string) => {
    // Only add if inventory not full
    if (inventory.length < 5) {
      setInventory([...inventory, { name: itemName }]);
    }
  };

  const selectItem = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  return (
    <div className="game-screen">
      <div className="game-buttons">
        <button>Save</button>
        <AuthButtons />
      </div>
      <div className="game-window">
        <GameScreen
          inventory={inventory}
          onPickUpItem={pickUpItem}
          selectedItem={selectedItem}
        />
        <Inventory inventory={inventory} selectItem={selectItem} />
      </div>
    </div>
  );
}
