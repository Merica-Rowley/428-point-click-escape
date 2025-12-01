import type { item } from "../../pages/Game/Game";
import key from "../../assets/Screen1/key.png";
import screwdriver from "../../assets/Screen3/screwdriver.png";
import lightbulb from "../../assets/Screen3/lightbulb.png";
import button from "../../assets/button.png";
import { useState } from "react";
import "./Inventory.css";

export default function Inventory(props: {
  inventory: item[];
  selectItem: (item: string) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const inventorySelect = (itemName: string, index: number) => {
    props.selectItem(itemName);
    setSelectedIndex(index);
  };

  const renderItemImage = (itemName: string) => {
    switch (itemName) {
      case "key":
        return <img src={key} alt="key" />;
      case "screwdriver":
        return <img src={screwdriver} alt="screwdriver" />;
      case "lightbulb":
        return <img src={lightbulb} alt="lightbulb" />;
      case "drawer-button":
        return <img src={button} alt="button" />;
      case "piano-button":
        return <img src={button} alt="button" />;
      case "button":
        return <img src={button} alt="button" />;
      default:
        return null;
    }
  };

  const displayItems = props.inventory.slice(0, 5);
  return (
    <div className="inventory-bar">
      {displayItems.length > 0 &&
        displayItems.map((item, index) => (
          <div className="inventory-box" key={index}>
            <button
              className={`${item.name}-button ${
                index === selectedIndex ? "selected-item" : ""
              }`}
              onClick={() => inventorySelect(item.name, index)}
            >
              {renderItemImage(item.name)}
            </button>
          </div>
        ))}
    </div>
  );
}
