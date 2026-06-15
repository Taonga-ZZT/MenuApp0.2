import React, {
  createContext,
  useState,
  ReactNode,
} from "react";

export type Course =
  | "Starters"
  | "Mains"
  | "Desserts";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: string;
}

interface MenuContextType {
  menuItems: MenuItem[];

  addMenuItem: (
    item: MenuItem
  ) => void;

  deleteMenuItem: (
    id: string
  ) => void;
}

export const MenuContext =
  createContext<MenuContextType>(
    {} as MenuContextType
  );

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider = ({
  children,
}: MenuProviderProps) => {
  const [menuItems, setMenuItems] =
    useState<MenuItem[]>([
      {
        id: "1",
        name: "Pan-Seared Scallops",
        description:
          "Fresh scallops with citrus beurre blanc",
        course: "Starters",
        price: "185",
      },
      {
        id: "2",
        name: "Beef Wellington",
        description:
          "Prime beef tenderloin",
        course: "Mains",
        price: "425",
      },
      {
        id: "3",
        name: "Chocolate Fondant",
        description:
          "Warm chocolate lava cake",
        course: "Desserts",
        price: "145",
      },
    ]);

  const addMenuItem = (
    item: MenuItem
  ) => {
    setMenuItems((prevItems) => {
      const exists =
        prevItems.some(
          (menuItem) =>
            menuItem.id === item.id
        );

      if (exists) {
        return prevItems;
      }

      return [
        ...prevItems,
        item,
      ];
    });
  };

  const deleteMenuItem = (
    id: string
  ) => {
    setMenuItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== id
      )
    );
  };
  
  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
