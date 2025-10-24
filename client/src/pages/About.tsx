import Navbar from "../components/navbar/Navbar";
import "./Home.css";

export default function About() {
  return (
    <>
      <Navbar />
      <h2 className="about">About</h2>
      <p>Point Click Escape is a logic puzzle game.</p>
      <br />
      <p>
        Players start out in a locked room: why are they there, and how can they
        get out? It’s up to you to find out! Explore the room, look for clues
        and tools, and find the key to escape!
      </p>
      <br />
      <p className="how-to">How to Play: </p>
      <p>
        In order to navigate, click on the arrows on the side, top, and bottom
        of the screen. Click on areas of the room to take a closer look. Each
        room contains various objects. When an object is collected, it will
        appear in the inventory. To use an object, select the object from the
        inventory and click on the desired area of use. Once an object has been
        used up, it will disappear from the inventory.
      </p>
      <br />
      <p>
        If you’d like to take a break and come back later, don’t forget to save
        your game!
      </p>
    </>
  );
}
