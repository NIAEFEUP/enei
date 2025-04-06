import { createContext } from "react";

type PointsStoreContextType = {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
};

export const StoreContext = createContext<PointsStoreContextType>({
  userPoints: 0,
  setUserPoints: () => {},
});
