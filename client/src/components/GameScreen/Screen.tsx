import { useState } from "react";
import "./Screen.css";
import key from "../../assets/Screen1/key.png";
import door from "../../assets/Screen1/door.png";
import type { item, worldFlag } from "../../pages/Game/Game";

export default function GameScreen(props: {
  inventory: item[];
  worldState: worldFlag[];
  onPickUpItem: (itemName: string) => void;
  selectedItem: string;
  toggleWorldFlag: (flagName: string) => void;
}) {
  const [showWin, setShowWin] = useState(false);

  const [screenIndex, setScreenIndex] = useState(0);

  const checkWorldFlag = (flagName: string) => {
    return props.worldState.some((f) => f.name === flagName && f.state);
  };

  const handleDoorClick = () => {
    props.toggleWorldFlag("victory");
    if (props.selectedItem === "key") {
      setShowWin(true);
    }
  };

  const handleGoRight = () => {
    setScreenIndex(screenIndex + 1);
  };

  switch (screenIndex) {
    case 0:
      return (
        <div
          className={`background-container ${
            checkWorldFlag("victory")
              ? "screen-one-bg-two"
              : "screen-one-bg-one"
          }`}
        >
          {!props.inventory.find((i) => i.name === "key") && (
            <button
              className="keyButton"
              onClick={() => props.onPickUpItem("key")}
            >
              <img src={key} alt="key" />
            </button>
          )}

          <button className="doorButton" onClick={() => handleDoorClick()}>
            <img src={door} alt="door" />
          </button>

          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW PLACEHOLDER
          </button>

          {showWin && <h1 className="win-text">YOU WIN</h1>}
        </div>
      );
    case 1:
      return <p>screen 2 works</p>;
    default:
      return (
        <p>
          AAAA you went outside the boundaries of reality!!!! (contact a dev)
        </p>
      );
  }
}
