import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import billingInfoSlice from "./billingInfo-slice";
import wishlistSlice from "./wishlist-slice";


const persistConfigCart = {
    key: 'cart',
    storage,
}
const persistConfigBillingInfo = {
    key: 'billingInfo',
    storage,
}
const persistConfigWishlist = {
    key: 'wishlist',
    storage,
}
const persistConfigUser = {
    key: 'user',
    storage,
}
const cartReducer = persistReducer(persistConfigCart, cartSlice.reducer)
const billingInfoReducer = persistReducer(persistConfigBillingInfo, billingInfoSlice.reducer)
const wishlistReducer = persistReducer(persistConfigWishlist,wishlistSlice.reducer)
export let store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        billingInfo:  billingInfoReducer,
        middleware: [thunk]
    }
})
export let persistor = persistStore(store)

