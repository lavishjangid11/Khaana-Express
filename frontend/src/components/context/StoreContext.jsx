import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const current = prev[itemId] || 0;
            if (current <= 1) {
                const next = { ...prev };
                delete next[itemId];
                return next;
            }
            return { ...prev, [itemId]: current - 1 };
        });
    }

    const clearCart = () => {
        setCartItems({});
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = food_list.find((product) => String(product._id) === String(itemId));
                if (itemInfo && typeof itemInfo.price === 'number') {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;  
