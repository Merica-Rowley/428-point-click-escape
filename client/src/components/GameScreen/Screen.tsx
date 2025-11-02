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
    if (screenIndex === 3) {
      setScreenIndex(0); // wrap around to "first" screen, this is just hardcoded for now
      return;
    }
    setScreenIndex(screenIndex + 1);
  };

  const handleGoLeft = () => {
    if (screenIndex === 0) {
      setScreenIndex(3); // wrap around to "last" screen, this is just hardcoded for now
      return;
    }
    setScreenIndex(screenIndex - 1);
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

          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>

          {showWin && <h1 className="win-text">YOU WIN</h1>}
        </div>
      );
    case 1:
      return (
        <div className={`background-container screen-two-bg-one`}>
          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW PLACEHOLDER
          </button>
          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>
        </div>
      );
    case 2:
      return (
        <div className={`background-container screen-three-bg-one`}>
          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW PLACEHOLDER
          </button>
          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>
        </div>
      );
    case 3:
      return (
        <div className={`background-container screen-four-bg-one`}>
          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW<br></br>PLACEHOLDER
          </button>
          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>
        </div>
      );
    default:
      return (
        <p>
          AAAA you went outside the boundaries of reality!!!! (contact a dev)
        </p>
      );
  }
}
