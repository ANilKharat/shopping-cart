import { SELECT_PRODUCT, REMOVE_PRODUCT } from '../action/actionTypes'

const initialState = {
    selectedProduct: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:

            let products = []
            products = state.selectedProduct
            if (products.length === 0) {
                products.push(action.payload)
            }
            else {
                var existingIds = products.map((obj) => obj.id);

                if (!existingIds?.includes(action.payload.id)) {
                    products.push(action.payload);
                } else {
                    products.forEach((element, index) => {
                        if (element.id === action.payload.id) {
                            products[index] = action.payload;
                        }
                    })
                }
            }
            return {
                ...state,
                selectedProduct: products
            }

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