import React, { ReactNode, createContext, useContext, useState } from "react";
import { CartItem } from "../../utilities/utils";

type NewItemDataContextType = {
  newItemData: CartItem | null;
  setNewItemData: React.Dispatch<React.SetStateAction<CartItem | null>>;
};

export const NewItemDataContext = createContext<NewItemDataContextType | undefined>(undefined);

type NewItemDataProviderProps = {
  children: ReactNode;
};

export const NewItemDataProvider = ({ children }: NewItemDataProviderProps) => {
  const [newItemData, setNewItemData] = useState<CartItem | null>(null);

  return (
    <NewItemDataContext.Provider value={{ newItemData, setNewItemData }}>
      {children}
    </NewItemDataContext.Provider>
  );
};
