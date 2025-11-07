import { useState } from "react";
import "./Screen.css";
import key from "../../assets/Screen1/key.png";
import door from "../../assets/Screen1/door.png";
import screwdriver from "../../assets/Screen3/screwdriver.png";
import plus from "../../assets/Thermostat/plus.png";
import minus from "../../assets/Thermostat/minus.png";
import closedBook from "../../assets/Screen6/closed-book.png";
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

  const [temperatures, setTemperatures] = useState([72, 72, 72]);
  const [currentThermostatIndex, setCurrentThermostatIndex] = useState(0);
  const [previousScreenIndex, setPreviousScreenIndex] = useState(0);

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

  const handleGetOutClick = () => {
    const prevIndex = previousScreenIndex;
    setScreenIndex(previousScreenIndex);
    setPreviousScreenIndex(prevIndex);
  };

  const handleThermostatClick = () => {
    if (screenIndex === 0) {
      // door screen
      setCurrentThermostatIndex(0);
    }
    if (screenIndex === 1) {
      // fireplace screen
      setCurrentThermostatIndex(1);
    }
    if (screenIndex === 3) {
      // desk screen
      setCurrentThermostatIndex(2);
    }
    setPreviousScreenIndex(screenIndex);
    setScreenIndex(5); // Arbitrarily assign thermostat screen index to 5
  };

  const thermostatUpClick = () => {
    temperatures[currentThermostatIndex] += 1;
    setTemperatures([...temperatures]);
  };

  const thermostatDownClick = () => {
    temperatures[currentThermostatIndex] -= 1;
    setTemperatures([...temperatures]);
  };

  const getCurrentTemperature = () => {
    return temperatures[currentThermostatIndex];
  };

  const handleGoDesk = () => {
    setScreenIndex(6);
  };

  switch (screenIndex) {
    case 0: // door
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

          <button
            className="thermostatDoorButton"
            onClick={() => handleThermostatClick()}
          ></button>

          {showWin && <h1 className="win-text">YOU WIN</h1>}
        </div>
      );
    case 1: // fireplace
      return (
        <div className={`background-container screen-two-bg-one`}>
          <button
            className="thermostatFireplaceButton"
            onClick={() => handleThermostatClick()}
          >
            THERMOSTAT
          </button>
          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW PLACEHOLDER
          </button>
          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>
        </div>
      );
    case 2: // piano
      return (
        <div className={`background-container screen-three-bg-one`}>
          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW PLACEHOLDER
          </button>
          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>

          {!props.inventory.find((i) => i.name === "screwdriver") && (
            <button
              className="screwdriverButton"
              onClick={() => props.onPickUpItem("screwdriver")}
            >
              <img src={screwdriver} alt="screwdriver" />
            </button>
          )}
        </div>
      );
    case 3: // desk
      return (
        <div className={`background-container screen-four-bg-one`}>
          <button className="goRight" onClick={() => handleGoRight()}>
            RIGHT ARROW<br></br>PLACEHOLDER
          </button>
          <button className="goLeft" onClick={() => handleGoLeft()}>
            LEFT ARROW<br></br>PLACEHOLDER
          </button>
          <button
            className="thermostatDeskButton"
            onClick={() => handleThermostatClick()}
          ></button>
          <button className="desk" onClick={() => handleGoDesk()}></button>
        </div>
      );

    case 6:
      //TODO: still need bg assets for this one
      return (
        <div className={`background-container screen-six-bg-one`}>
          {checkWorldFlag("openedBook") ? (
            <div className="opened-book">K4t4r4W4t3rB3nd3r!</div>
          ) : (
            <button
              className="book"
              onClick={() => props.toggleWorldFlag("openedBook")}
            >
              <img src={closedBook} alt="book" />
            </button>
          )}
          {checkWorldFlag("openedDrawer") ? (
            <div className="opened-drawer">
              {!props.inventory.find((i) => i.name === "drawer-button") && (
                <button
                  className="drawer-button"
                  onClick={() => props.onPickUpItem("drawer-button")}
                >
                  ButtonPlaceholder
                </button>
              )}
            </div>
          ) : (
            <button
              className="drawer-knob"
              onClick={() => props.toggleWorldFlag("openedDrawer")}
            ></button>
          )}
        </div>
      );
    case 5: // thermostat screen
      return (
        <>
          <div className={`background-container screen-thermostat-bg`}>
            <button className="tempUp" onClick={() => thermostatUpClick()}>
              <img src={plus} alt="plus" />
            </button>
            <button className="tempDown" onClick={() => thermostatDownClick()}>
              <img src={minus} alt="minus" />
            </button>
            <div className="tempDisplayContainer">
              <div className="tempDisplay">{getCurrentTemperature()}</div>
            </div>
            <button className="getOut" onClick={() => handleGetOutClick()}>
              BACK ARROW<br></br>PLACEHOLDER
            </button>
          </div>
        </>
      );
    default:
      return (
        <p>
          AAAA you went outside the boundaries of reality!!!! (contact a dev)
        </p>
      );
  }
}
