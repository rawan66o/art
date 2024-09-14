import { createContext, useContext, useEffect, useState } from "react";
import ShoppingCard from "../components/ShoppingCard";
import axios from "axios";

const shoppingCartContext = createContext({});

const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider = ({ children }) => {
  // state for Offcanvas
  const [isOpen, setIsOpen] = useState(false);

  // state for all functions
  const [cartItems, setcartItems] = useState(initialCartItems);
  const [count, setCount] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalposts, settotalposts] = useState([]);
  const [index, setIndex] = useState(1);
  const [value, setValue] = useState("");
  const [selectedOptions, setSelectedOptons] = useState("");
  const [totalPages, setTotalPages] = useState(1); // Add a state for total pages

  const callApi = async () => {
    try {
      const [
        response1,
        response2,
        response3,
        response4,
        response5,
        response6,
        response7,
      ] = await axios.all([
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=1&page=${count}`
        ),
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=2&page=${count}`
        ),
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=3&page=${count}`
        ),
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=4&page=${count}`
        ),
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=5&page=${count}`
        ),
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=6&page=${count}`
        ),
        axios.get(
          `https://mall.ahmadkouja.com/api/category/show?category_id=7&page=${count}`
        ),
      ]);

      // setPosts(response1.data);
      // setPosts(response2.data);
      // setPosts(response3.data);
      setPosts([
        ...response1.data,
        ...response2.data,
        ...response3.data,
        ...response4.data,
        ...response5.data,
        ...response6.data,
        ...response7.data,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // local storage
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
    callApi();
  }, [cartItems, count, selectedOptions, value]);

  //

  // useEffect(() => {
  //   callApi();
  // }, [count, selectedOptions, value]);
  //

  // open the offcanavas
  const openCart = () => {
    setIsOpen(true);
  };
  // close the offcanavas
  const closeCart = () => {
    setIsOpen(false);
  };
  // number of quantity of offcanavas
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  // RETURN COUNT OF PRODUCTS IN SHOPPING CART
  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  // ADD ITEM TO CART AND +
  const increaseCartQuantity = (id) => {
    // currItems is previous state of cartItems
    setcartItems((currItems) => {
      // MAP ON ELEMENTS THAT EXISTS IN SHOPPING CART
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  // -
  const decreaseCartQuantity = (id) => {
    setcartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        // REMOVE ELEMENT WHO DOES NOT ACCEPT CONDITION
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  // REMOVE MATCH THE FIRST STATE IN decreaseCartQuantity
  const removeFromCart = (id) => {
    setcartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <shoppingCartContext.Provider
      //VALUE HAVE GLOBAL VARIABLES AND METHODS
      value={{
        posts,
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
      }}
    >
      {/* children IS AS APP.JS  */}
      {children}
      <ShoppingCard isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
// ShoppingCartProvider IS FOR APP COMPONENT
export default ShoppingCartProvider;

//useSoppingCart THIS IS MADE FOR EXPORT VALE TO OTHER COMPONENTS
export const useSoppingCart = () => {
  return useContext(shoppingCartContext);
};
