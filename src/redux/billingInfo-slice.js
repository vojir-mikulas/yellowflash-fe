import {createSlice} from "@reduxjs/toolkit";



const billingInfoSlice = createSlice({
    name: "billingInformation",
    initialState: {
        deliveryInformation: {
            email: "",
            name: "",
            surname: "",
            company: "",
            address: "",
            city: "",
            zipcode: "",
            country: "CZ",
            phone: "",
        },
        shipping: {
            method: "",
            price: 0,
        },
        discount: {
            name: "",
            amount: 0
        }

    } ,
    reducers: {
        setDeliveryInfo(state, action) {
            const billingInfo = action.payload;
            state.deliveryInformation = {
                email: billingInfo.email,
                name: billingInfo.name,
                surname: billingInfo.surname,
                company: billingInfo.company,
                address: billingInfo.address,
                city: billingInfo.city,
                zipcode: billingInfo.zipcode,
                country: billingInfo.country,
                phone: billingInfo.phone,
            }
        },
        setShippingMethod(state, action) {
            state.shippingMethod = action.payload.shippingMethod
        },
        setShipping(state, action) {
            state.shipping = {
                method: action.payload.method,
                price: action.payload.price,
            }
        },
        setDiscount(state,action){
            state.discount = {
                name: action.payload.name,
                amount: action.payload.amount,
            }
        }

    }
})


export const billingInfoActions = billingInfoSlice.actions;
export default billingInfoSlice;