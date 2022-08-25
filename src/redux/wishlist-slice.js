import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        itemList: [],
        totalQuantity: 0,
    },
    reducers: {
        handleWishlist(state, action) {
            const newItem = action.payload;
            //check if item is already in cart
            const existingItem = state.itemList.find((item) => (item.id === newItem.id));
            if (existingItem) {
                state.itemList.forEach((item, index) => {
                    if (item.id === newItem.id) {
                        if (index !== -1) state.itemList.splice(index, 1);
                    }
                })
                state.totalQuantity = state.itemList.length
                return
            }
            state.itemList.push({
                id: newItem.id,
            })
            state.totalQuantity = state.itemList.length
        }

    },
})


export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;