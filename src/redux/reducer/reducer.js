import { SELECT_PRODUCT, REMOVE_PRODUCT, INCREMENT_PRODUCT_COUNT, DECREMENT_PRODUCT_COUNT } from '../action/actionTypes'

const initialState = {
    selectedProduct: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            let products = []
            products = state.selectedProduct
            products.push(action.payload)
            return {
                ...state,
                selectedProduct: products
            }

        case INCREMENT_PRODUCT_COUNT:
            return {
                ...state,
                cart: [
                    ...state.selectedProduct.map((item) =>
                        item.id === action.payload
                            ? { ...item, product_count: (item.product_count += 1) }
                            : { ...item }
                    ),
                ],
            };

        case DECREMENT_PRODUCT_COUNT:
            return {
                ...state,
                cart: [
                    ...state.selectedProduct.map((item) =>
                        item.id === action.payload
                            ? { ...item, product_count: (item.product_count -= 1) }
                            : { ...item }
                    ),
                ],
            };

        case REMOVE_PRODUCT:
            let itemToRemove = state.selectedProduct.filter((item) => { return item.id !== action.payload })
            return {
                ...state,
                selectedProduct: itemToRemove
            }
        default: return state
    }
}

export default productReducer;