import type { item } from "../../pages/Game/Game";
import key from "../../assets/Screen1/key.png";
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
              <img src={key} alt="item.name" />
            </button>
          </div>
        ))}
    </div>
  );
}
