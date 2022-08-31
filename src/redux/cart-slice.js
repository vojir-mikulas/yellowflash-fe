import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemList: [],
        cartQueue: [],
        totalQuantity: 0,
        price: 0
    },
    reducers: {
        deleteFromCartQueue(state,action){
            const index = state.cartQueue.findIndex((item)=>(item.id === action.payload.id));
            state.cartQueue.splice(index,1)
        },
        addToCartQueue(state,action){
            const newItem = action.payload;
            state.cartQueue.push({
                id: newItem.id,
                size: newItem.size,
            })

        },
        addToCart(state, action) {
            const newItem = action.payload;
            //check if item is already in cart
            const existingItem = state.itemList.find((item) => (item.id === newItem.id && item.size === newItem.size));

            if (existingItem) {
                existingItem.quantity++;
                state.totalQuantity = getCartItemsCount(state.itemList);
                return
            }
            state.itemList.push({
                id: newItem.id,
                size: newItem.size,
                quantity: 1
            })

            state.totalQuantity = getCartItemsCount(state.itemList);
        },
        removeFromCart(state, action) {
            state.itemList.forEach((item, index) => {
                if (item.id === action.payload.id && item.size === action.payload.size) {
                    if (index !== -1) state.itemList.splice(index, 1);
                }
            })
            state.totalQuantity = getCartItemsCount(state.itemList);
        },
        incrementQuantity(state,action){

            state.itemList.forEach((item, index) => {
                if (item.id === action.payload.id && item.size === action.payload.size) {
                    item.quantity++
                }
            })
            state.totalQuantity = getCartItemsCount(state.itemList);
        },
        decrementQuantity(state,action){
            state.itemList.forEach((item, index) => {
                if (item.id === action.payload.id && item.size === action.payload.size) {
                    if(item.quantity <= 1) state.itemList.splice(index, 1);
                    item.quantity--
                }
            })
            state.totalQuantity = getCartItemsCount(state.itemList);
        },
        resetCart(state,action){
            state.itemList = [];
            state.totalQuantity = getCartItemsCount(state.itemList);
        },
        setPrice(state, action) {
            state.price = action.payload.price
        },
    },
})

function getCartItemsCount(cartItems) {
    let totalCount = 0;
    cartItems.forEach((item) => {
        totalCount += item.quantity;
    })
    return totalCount
}

export const cartActions = cartSlice.actions;
export default cartSlice;