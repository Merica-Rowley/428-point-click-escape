import { createContext, useContext, useState } from "react";
import type { item, worldFlag } from "../Game/Game";
import type { ReactNode } from "react";

type GameContextType = {
  inventory: item[];
  setInventory: React.Dispatch<React.SetStateAction<item[]>>;

  worldState: worldFlag[];
  setWorldState: React.Dispatch<React.SetStateAction<worldFlag[]>>;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode}) {
  const [inventory, setInventory] = useState<item[]>([]);
  const [worldState, setWorldState] = useState<worldFlag[]>([]);

  return (
    <GameContext.Provider
      value={{
        inventory,
        setInventory,
        worldState,
        setWorldState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used inside a GameProvider");
  }
  return ctx;
}
