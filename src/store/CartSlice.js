import {createSlice} from "@reduxjs/toolkit"

const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        cart: []
    },
    reducers: {
        addGood(state, action) {
            let check = true;
            state.cart.forEach(elem => {
                if (elem.id === action.payload.id) check = false
            })
            if (check) state.cart.push({...action.payload, count: 1})
        },
        removeGood(state,action) {
            state.cart = state.cart.filter(elem=>elem.id!==action.payload.id)
        },
        changeCount(state,action) {
            state.cart = state.cart.map((elem)=>{
                if(elem.id===action.payload.id) return {...elem, count: elem.count + action.payload.change}
                else return elem
            })
        }
    }

})

export const {addGood, removeGood, changeCount} = CartSlice.actions;

export default CartSlice.reducer;