import { SELECT_PRODUCT, REMOVE_PRODUCT } from '../action/actionTypes'

const initialState = {
    selectedProduct: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            if (state?.selectedProduct?.length === 0) {
                state?.selectedProduct.push(action.payload)
            }
            else {
                var existingIds = state?.selectedProduct?.map((obj) => obj.id);

                if (!existingIds?.includes(action.payload.id)) {
                    state?.selectedProduct?.push(action.payload);
                } else {
                    state?.selectedProduct?.forEach((element, index) => {
                        if (element.id === action.payload.id) {
                            state.selectedProduct[index] = action.payload;
                        }
                    })
                }
            }
            return {
                ...state
            }

        case REMOVE_PRODUCT:
            let itemToRemove =  state.selectedProduct.filter((item) => { return  item.id !== action.payload })
            state.selectedProduct = itemToRemove
        return{
            ...state
        }
        default: return state
    }
}

export default productReducer;