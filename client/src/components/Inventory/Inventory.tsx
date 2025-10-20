import type { item } from "../../pages/Game/Game";
import key from "../../assets/Screen1/key.png";

export default function Inventory(props: {
  inventory: item[];
  selectItem: (item: string) => void;
}) {
  const displayItems = props.inventory.slice(0, 5);
  return (
    <div className="inventory-bar">
      {displayItems.length > 0 &&
        displayItems.map((item, index) => (
          <div className="inventory-box" key={index}>
            <button
              className="keyButton"
              onClick={() => props.selectItem("key")}
            >
              <img src={key} alt="key" />
            </button>
          </div>
        ))}
    </div>
  );
}
