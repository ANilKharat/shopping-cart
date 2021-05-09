import { SELECT_PRODUCT, REMOVE_PRODUCT } from "./actionTypes";

export const selectProduct = (selectedProduct) => {
    return {
        type: SELECT_PRODUCT,
        payload: selectedProduct
    }
}

export const removeProduct = (id) =>{
    return {
        type : REMOVE_PRODUCT,
        payload : id
    }
}