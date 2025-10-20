import { useState } from "react";
import "./Screen.css";
import key from "../../assets/Screen1/key.png";
import door from "../../assets/Screen1/door.png";
import type { item } from "../../pages/Game/Game";

export default function GameScreen(props: {
  inventory: item[];
  onPickUpItem: (itemName: string) => void;
  selectedItem: string;
}) {
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = ["bg-one", "bg-two"];

  const [showWin, setShowWin] = useState(false);

  const handleDoorClick = () => {
    if (props.selectedItem === "key") {
      setShowWin(true);
    }
  };

  return (
    <div className={`background-container ${backgrounds[bgIndex]}`}>
      {!props.inventory.find((i) => i.name === "key") && (
        <button className="keyButton" onClick={() => props.onPickUpItem("key")}>
          <img src={key} alt="key" />
        </button>
      )}

      <button className="doorButton" onClick={() => handleDoorClick()}>
        <img src={door} alt="door" />
      </button>

      {showWin && <h1>YOU WIN</h1>}
    </div>
  );
}
