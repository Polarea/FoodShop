/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Cart from "../components/Cart";
import Cocktail from "../pages/Cocktail";
import Confirmation from "../components/Confirmation";
import CocktailModal from "../components/CocktailModal";
// import MenuModal from "../components/MenuModal";
const MENU_URL = "https://iths-2024-recept-grupp7-86oop6.reky.se/recipes";

const COCKTAIL_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
  
export interface Menu {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  categories: string[];
  price: number;
  quantity: number;
}
export interface Cocktail {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
  quantity: number;
  price: number;
}
export interface Cocktails {
  drinks: Cocktail[];
}
type CartContext = {
  clearCart : ()=> void;
  index: number;
  drinks: Cocktails;
  menu: Menu[];
  isConfirmationOpen : boolean;
  isMenuOpen: boolean;
  isCocktailOpen: boolean;
  isCartOpen: boolean;
  isExtrasOpen: boolean;
  open: (openClose: boolean, value: string, id: string) => void;
  totalQuantity: number;
  cart: ShoppingCart[];
  getQuantity: (id: string) => number;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
};

type ProviderValue = {
  children: ReactNode;
};

export type ShoppingCart = {
  id: string;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: ProviderValue) {
  const [menu, setMenu] = useState<Menu[]>([]);
  const fetchMenu = async () => {
    const response = await fetch(`${MENU_URL}`);
    const menus = (await response.json()) as Menu[];
    setMenu(menus);
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  const cocktails: Cocktails = {
    drinks: [],
  };
  const [drinks, setDrinks] = useState(cocktails);
  const fetchDrinks = async () => {
    const response = await fetch(`${COCKTAIL_URL}`);
    const _drinks = (await response.json()) as Cocktails;
    setDrinks(_drinks);
  };
  useEffect(() => {
    fetchDrinks();
  }, []);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCocktailOpen, setIsCockailOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const open = (openClose: boolean, value: string, id: string) => {
    switch (value) {
      case "cart":
        setIsCartOpen(openClose);
        break;
      case "menu":
        setIsMenuOpen(openClose);
        getIndex(id);
        break;
      case "cocktail":
        setIsCockailOpen(openClose);
        break;
      case "extras":
        setIsExtrasOpen(openClose);
        break;
        case 'confirmation':
          setIsConfirmationOpen(openClose);
    }
  };
  const [cart, setCart] = useLocalStorage<ShoppingCart[]>("cart", []);

  const totalQuantity = cart.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  
  function clearCart(){
    setCart([]);
  }

  function getIndex(id: string) {
    let itemIndex = 0;
    menu.map((item) => {
      if (item._id === id) {
        itemIndex = menu.indexOf(item);
      }
    });
    setIndex(itemIndex);
  }
  function getQuantity(id: string) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: string) {
    setCart((currCart) => {
      if (currCart.find((item) => item.id === id) == null) {
        return [...currCart, { id, quantity: 1 }];
      } else {
        return currCart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQuantity(id: string) {
    setCart((currCart) => {
      if (currCart.find((item) => item.id === id)?.quantity === 1) {
        return currCart.filter((item) => item.id !== id);
      } else {
        return currCart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id: string) {
    setCart((currCart) => {
      return currCart.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        clearCart,
        index,
        menu,
        drinks,
        cart,
        totalQuantity,
        isConfirmationOpen,
        isCartOpen,
        isMenuOpen,
        isCocktailOpen,
        isExtrasOpen,
        open,
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
      <Cart />
      <CocktailModal/>
      <Confirmation/>
    </CartContext.Provider>
  );
}
