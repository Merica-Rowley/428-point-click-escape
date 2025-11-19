import { useEffect, useState } from "react";
import "./Screen.css";
import arrow from "../../assets/arrow.png";
import key from "../../assets/Screen1/key.png";
import door from "../../assets/Screen1/door.png";
import screwdriver from "../../assets/Screen3/screwdriver.png";
import lightbulb from "../../assets/Screen3/lightbulb.png";
import lightbulbChain from "../../assets/Screen3/lightbulb-chain.png";
import plus from "../../assets/Thermostat/plus.png";
import minus from "../../assets/Thermostat/minus.png";
import painting from "../../assets/Screen2/painting.png";
import panel from "../../assets/Safe/panel.png";
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
import button from "../../assets/button.png";

export default function GameScreen(props: {
  inventory: item[];
  worldState: worldFlag[];
  onPickUpItem: (itemName: string) => void;
  removeItem: (itemName: string) => void;
  selectedItem: string;
  toggleWorldFlag: (flagName: string) => void;
}) {
  const [showWin, setShowWin] = useState(false);

  const [screenIndex, setScreenIndex] = useState(0);

  const [temperatures, setTemperatures] = useState([72, 72, 72]);
  const [currentThermostatIndex, setCurrentThermostatIndex] = useState(0);
  const [previousScreenIndex, setPreviousScreenIndex] = useState(0);
  const [buttonColors, setButtonColors] = useState([0, 0, 0]);

  const [pianoNotes, setPianoNotes] = useState<string[]>([]);

  const correctPianoSequence = ["c1", "f1", "a1-sharp", "b1"];

  useEffect(() => {
    if (pianoNotes.toString() === correctPianoSequence.toString()) {
      props.toggleWorldFlag("showLightbulb");
      console.log("correct sequence played, show the lightbulb");
    }
  }, [pianoNotes]);

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

  const handleSheetMusicClick = () => {
    setPreviousScreenIndex(screenIndex);
    setScreenIndex(7);
  };

  const handlePianoClick = () => {
    setPreviousScreenIndex(screenIndex);
    setScreenIndex(8);
  };

  const handlePianoKeyClick = (note: string) => {
    setPianoNotes((prev) => [...prev.slice(-3), note]);
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

  const handleSafeNavigation = () => {
    setPreviousScreenIndex(screenIndex);
    setScreenIndex(9);
  };

  const handleScrewClick = () => {
    if (props.selectedItem === "screwdriver") {
      props.toggleWorldFlag("unscrewedPanel");
    }
  };

  const handleSocketClick = (sockNum: number) => {
    if (props.selectedItem === "drawer-button") {
      props.toggleWorldFlag(`placedButton${sockNum}`);
      props.removeItem("drawer-button");
    }
  };

  const handleButtonClick = (buttonNum: number) => {
    const newColor = (buttonColors[buttonNum - 1] + 1) % 4;
    buttonColors[buttonNum - 1] = newColor;
    setButtonColors([...buttonColors]);
  };

  const checkSafeButtons = () => {
    return (
      buttonColors[0] === 1 && buttonColors[1] === 3 && buttonColors[2] === 2
    );
  };

  const handleSafeOpen = () => {
    if (checkSafeButtons()) {
      props.toggleWorldFlag("safeOpen");
    }
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
          ></button>
          {checkWorldFlag("paintingDropped") ? (
            <>
              <img
                className="dropped-painting"
                src={painting}
                alt="dropped painting"
              />
              <button
                className="goToSafeButton"
                onClick={() => handleSafeNavigation()}
              ></button>
            </>
          ) : (
            <button
              className="paintingButton"
              onClick={() => props.toggleWorldFlag("paintingDropped")}
            >
              <img src={painting} alt="painting" />
            </button>
          )}
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
          <button
            className="sheet-music-button"
            onClick={() => handleSheetMusicClick()}
          ></button>

          {!props.inventory.find((i) => i.name === "screwdriver") && (
            <button
              className="screwdriverButton"
              onClick={() => props.onPickUpItem("screwdriver")}
            >
              <img src={screwdriver} alt="screwdriver" />
            </button>
          )}

          {checkWorldFlag("showLightbulb") &&
            !props.inventory.find((i) => i.name === "lightbulb") && (
              <button
                className="lightbulbButton"
                onClick={() => props.onPickUpItem("lightbulb")}
              >
                <img src={lightbulb} alt="lightbulb" />
              </button>
            )}

          {checkWorldFlag("showLightbulb") && (
            <button className="lightbulbChain">
              <img src={lightbulbChain} alt="lightbulbChain" />
            </button>
          )}
        </div>
      );
    case 3: // desk overwold screen
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
    case 6: // desktop //desk subscreen
      function getDeskBgState(): string {
        const book = checkWorldFlag("openedBook");
        const drawer = checkWorldFlag("openedDrawer");
        if (book && drawer) {
          return "screen-six-bg-both";
        } else if (book) {
          return "screen-six-bg-book";
        } else if (drawer) {
          return "screen-six-bg-drawer";
        } else {
          return "screen-six-bg-neither";
        }
      }

      function handleDrawerButtonClick() {
        props.toggleWorldFlag("drawerButtonPickedUp");
        props.onPickUpItem("button");
      }

      return (
        <div className={"background-container " + getDeskBgState()}>
          {checkWorldFlag("openedBook") ? (
            <div className="opened-book">W4t3rB3nd3r!</div>
          ) : (
            <button
              className="book"
              onClick={() => props.toggleWorldFlag("openedBook")}
            ></button>
          )}
          {checkWorldFlag("openedDrawer") ? (
            <>
              {!checkWorldFlag("drawerButtonPickedUp") && (
                <button
                  className="drawer-button"
                  onClick={() => handleDrawerButtonClick()}
                >
                  <img src={button} alt="button" />
                </button>
              )}
            </>
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
    case 7: // sheet music
      return (
        <div className={`background-container screen-seven-bg`}>
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
    case 9: // Safe subscreen
      return (
        <div className={`background-container screen-safe-bg`}>
          <button
            className="getOut exitSafe"
            onClick={() => handleGetOutClick()}
          >
            <img src={arrow} className="arrow-down" alt="back-arrow" />
          </button>
          {checkWorldFlag("unscrewedPanel") ? (
            <>
              {checkWorldFlag("safeOpen") ? (
                <>
                  {!props.inventory.find((i) => i.name === "key") && (
                    <button
                      className="keyButton"
                      onClick={() => props.onPickUpItem("key")}
                    >
                      <img src={key} alt="key" />
                    </button>
                  )}
                </>
              ) : (
                <>
                  {checkWorldFlag("placedButton1") ? (
                    <>
                      <button
                        className={`button1 buttonColor${buttonColors[0]}`}
                        onClick={() => handleButtonClick(1)}
                      ></button>
                    </>
                  ) : (
                    <>
                      <button
                        className="socket1"
                        onClick={() => handleSocketClick(1)}
                      ></button>
                    </>
                  )}
                  {checkWorldFlag("placedButton2") ? (
                    <>
                      <button
                        className={`button2 buttonColor${buttonColors[1]}`}
                        onClick={() => handleButtonClick(2)}
                      ></button>
                    </>
                  ) : (
                    <>
                      <button
                        className="socket2"
                        onClick={() => handleSocketClick(2)}
                      ></button>
                    </>
                  )}
                  {checkWorldFlag("placedButton3") ? (
                    <>
                      <button
                        className={`button3 buttonColor${buttonColors[2]}`}
                        onClick={() => handleButtonClick(3)}
                      ></button>
                    </>
                  ) : (
                    <>
                      <button
                        className="socket3"
                        onClick={() => handleSocketClick(3)}
                      ></button>
                    </>
                  )}
                  <button
                    className="safeHandle"
                    onClick={() => handleSafeOpen()}
                  ></button>
                  <button
                    className="testButton"
                    onClick={() => props.onPickUpItem("button")}
                  >
                    DELETE THIS
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <img
                className="screw-panel"
                src={panel}
                alt="panel with screws"
              />
              <button
                className="screw1"
                onClick={() => handleScrewClick()}
              ></button>
              <button
                className="screw2"
                onClick={() => props.toggleWorldFlag("unscrewedPanel")}
              ></button>
              <button
                className="screw3"
                onClick={() => props.toggleWorldFlag("unscrewedPanel")}
              ></button>
              <button
                className="screw4"
                onClick={() => props.toggleWorldFlag("unscrewedPanel")}
              ></button>
            </>
          )}
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
