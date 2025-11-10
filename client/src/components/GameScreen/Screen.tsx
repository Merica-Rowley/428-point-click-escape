import { useState } from "react";
import "./Screen.css";
import arrow from "../../assets/arrow.png";
import key from "../../assets/Screen1/key.png";
import door from "../../assets/Screen1/door.png";
import screwdriver from "../../assets/Screen3/screwdriver.png";
import plus from "../../assets/Thermostat/plus.png";
import minus from "../../assets/Thermostat/minus.png";
import closedBook from "../../assets/Screen6/closed-book.png";
import type { item, worldFlag } from "../../pages/Game/Game";
import c1sound from "../../assets/Screen8/sounds/c1.wav";
import c1sharpsound from "../../assets/Screen8/sounds/c1-sharp.wav";
import d1sound from "../../assets/Screen8/sounds/d.wav";
import d1sharpsound from "../../assets/Screen8/sounds/d-sharp.wav";
import e1sound from "../../assets/Screen8/sounds/e.wav";
import f1sound from "../../assets/Screen8/sounds/f.wav";
import f1sharpsound from "../../assets/Screen8/sounds/f-sharp.wav";
import g1sound from "../../assets/Screen8/sounds/g.wav";
import g1sharpsound from "../../assets/Screen8/sounds/g-sharp.wav";
import a1sound from "../../assets/Screen8/sounds/a.wav";
import a1sharpsound from "../../assets/Screen8/sounds/a-sharp.wav";
import b1sound from "../../assets/Screen8/sounds/b.wav";
import c2sound from "../../assets/Screen8/sounds/c2.wav";

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

  const [pianoNotes, setPianoNotes] = useState<string[]>([]);

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
    setPreviousScreenIndex(screenIndex);
    setScreenIndex(6);
  };

  const handlePianoClick = () => {
    setPreviousScreenIndex(screenIndex);
    setScreenIndex(8);
  };

  const handlePianoKeyClick = (note: string) => {
    setPianoNotes((prevNotes) => {
      const updated = [...prevNotes.slice(-3), note];
      const correctSequence = ["c1", "f1", "a1", "b1"];
      // Check for the correct sequence
      if ([...updated].toString() === correctSequence.toString()) {
        props.toggleWorldFlag("showLightbulb");
        console.log("correct sequence played, show the lightbulb");
      }
      return updated.slice(-4); // keep only the last 4
    });

    playNote(note);
  };

  const playNote = (note: string) => {
    let audio;
    switch (note) {
      case "c1":
        audio = new Audio(c1sound);
        break;
      case "c1-sharp":
        audio = new Audio(c1sharpsound);
        break;
      case "d1":
        audio = new Audio(d1sound);
        break;
      case "d1-sharp":
        audio = new Audio(d1sharpsound);
        break;
      case "e1":
        audio = new Audio(e1sound);
        break;
      case "f1":
        audio = new Audio(f1sound);
        break;
      case "f1-sharp":
        audio = new Audio(f1sharpsound);
        break;
      case "g1":
        audio = new Audio(g1sound);
        break;
      case "g1-sharp":
        audio = new Audio(g1sharpsound);
        break;
      case "a1":
        audio = new Audio(a1sound);
        break;
      case "a1-sharp":
        audio = new Audio(a1sharpsound);
        break;
      case "b1":
        audio = new Audio(b1sound);
        break;
      case "c2":
        audio = new Audio(c2sound);
        break;
      default:
        audio = new Audio(c1sound);
        break;
    }
    audio.currentTime = 0;
    audio.play();
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
            <img src={arrow} className="arrow-right" alt="right-arrow" />
          </button>

          <button className="goLeft" onClick={() => handleGoLeft()}>
            <img src={arrow} className="arrow-left" alt="left-arrow" />
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
            <img src={arrow} className="arrow-right" alt="right-arrow" />
          </button>

          <button className="goLeft" onClick={() => handleGoLeft()}>
            <img src={arrow} className="arrow-left" alt="left-arrow" />
          </button>
        </div>
      );
    case 2: // piano
      return (
        <div className={`background-container screen-three-bg-one`}>
          <button className="goRight" onClick={() => handleGoRight()}>
            <img src={arrow} className="arrow-right" alt="right-arrow" />
          </button>

          <button className="goLeft" onClick={() => handleGoLeft()}>
            <img src={arrow} className="arrow-left" alt="left-arrow" />
          </button>
          <button
            className="piano-button"
            onClick={() => handlePianoClick()}
          ></button>

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
            <img src={arrow} className="arrow-right" alt="right-arrow" />
          </button>

          <button className="goLeft" onClick={() => handleGoLeft()}>
            <img src={arrow} className="arrow-left" alt="left-arrow" />
          </button>
          <button
            className="thermostatDeskButton"
            onClick={() => handleThermostatClick()}
          ></button>
          <button className="desk" onClick={() => handleGoDesk()}></button>
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
              <img src={arrow} className="arrow-down" alt="back-arrow" />
            </button>
          </div>
        </>
      );
    case 6: // desktop
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
          <button className="getOut" onClick={() => handleGetOutClick()}>
            <img src={arrow} className="arrow-down" alt="back-arrow" />
          </button>
        </div>
      );
    case 8: // keyboard
      return (
        <>
          <div className={`background-container screen-eight-bg`}>
            <div className={`piano-keys`}>
              <button
                className={`c1 white-key`}
                onClick={() => handlePianoKeyClick("c1")}
              ></button>
              <button
                className={`c1-sharp black-key`}
                onClick={() => handlePianoKeyClick("c1-sharp")}
              ></button>
              <button
                className={`d1 white-key`}
                onClick={() => handlePianoKeyClick("d1")}
              ></button>
              <button
                className={`d1-sharp black-key`}
                onClick={() => handlePianoKeyClick("d1-sharp")}
              ></button>
              <button
                className={`e1 white-key`}
                onClick={() => handlePianoKeyClick("e1")}
              ></button>
              <button
                className={`f1 white-key`}
                onClick={() => handlePianoKeyClick("f1")}
              ></button>
              <button
                className={`f1-sharp black-key`}
                onClick={() => handlePianoKeyClick("f1-sharp")}
              ></button>
              <button
                className={`g1 white-key`}
                onClick={() => handlePianoKeyClick("g1")}
              ></button>
              <button
                className={`g1-sharp black-key`}
                onClick={() => handlePianoKeyClick("g1-sharp")}
              ></button>
              <button
                className={`a1 white-key`}
                onClick={() => handlePianoKeyClick("a1")}
              ></button>
              <button
                className={`a1-sharp black-key`}
                onClick={() => handlePianoKeyClick("a1-sharp")}
              ></button>
              <button
                className={`b1 white-key`}
                onClick={() => handlePianoKeyClick("b1")}
              ></button>
              <button
                className={`c2 white-key`}
                onClick={() => handlePianoKeyClick("c2")}
              ></button>
            </div>
            <button className="getOut" onClick={() => handleGetOutClick()}>
              <img src={arrow} className="arrow-down" alt="back-arrow" />
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
