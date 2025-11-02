import { useState } from "react";
import AuthButtons from "../../components/auth/AuthButtons";
import GameScreen from "../../components/GameScreen/Screen";
import Inventory from "../../components/Inventory/Inventory";
import "./Game.css";

const BASE_URL = "https://four28-point-click-escape.onrender.com";

export type item = {
  name: string;
};

export default function Game() {
  // const allItems: item[] = [{ name: "key" }] as const;
  // Commented this out to make the linter happy for the CI on first demo; uncomment it when needed

  const [inventory, setInventory] = useState<item[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const pickUpItem = async (itemName: string) => {
    // Only add if inventory not full
    if (inventory.length < 5) {
      setInventory([...inventory, { name: itemName }]);
    }
    console.log("Picking up item:", itemName);
console.log("Sending body:", { name, item: itemName });
const res = await fetch(`${BASE_URL}/game/inventory`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, item: itemName }),
  });

  if (!res.ok) {
    console.error("Server returned error:", res.status);
    return;
  }

  const data = await res.json();
  console.log("Updated inventory from server:", data);

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
