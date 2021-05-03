import { SELECT_PRODUCT } from "./actionTypes";

export const selectProduct = (selectedProduct) => {
    return {
        type: SELECT_PRODUCT,
        payload: selectedProduct
    }
}