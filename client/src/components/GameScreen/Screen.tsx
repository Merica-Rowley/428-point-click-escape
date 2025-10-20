import { useState } from "react";
import "./Screen.css";
import key from "../../assets/Screen1/key.png";

export default function GameScreen(props: {
  inventory: { key: boolean };
  onPickUpItem: (itemName: string) => void;
}) {
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = ["bg-one", "bg-two"];

  return (
    <div className={`background-container ${backgrounds[bgIndex]}`}>
      {!props.inventory.key && (
        <button className="keyButton" onClick={() => props.onPickUpItem("key")}>
          <img src={key} alt="key" />
        </button>
      )}
    </div>
  );
}
