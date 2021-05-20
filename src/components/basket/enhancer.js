import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { selectProduct, removeProduct } from '../../redux/action/actions'
import store  from '../../redux/store/store'

let enhancer = (Component) => (props) => {
    // Variable declaration
    const [count, setCount] = useState(1)
    const productDetails = useSelector(state => state.selectedProduct)

    let totalSaving = 0;
    let subTotal = 0;
    let totalAmount = 0;


    let breadSaving = 0;
    let butterSaving = 0;
    let cheeseSaving = 0;
    let cheeseFree = false

    let free_cheese = 0;

    /************************************Scenario first**************************************/
    const soup = productDetails?.find(product => product.product_name.toUpperCase() === 'SOUP')
    const bread = productDetails?.find(product => product.product_name.toUpperCase() === 'BREAD')
    const butter = productDetails?.find(product => product.product_name.toUpperCase() === 'BUTTER')
    if (soup && bread?.product_count >= 2 && !butter) {
        breadSaving = 1.10
    }
    else if (soup && bread?.product_count >= 2 && butter) {
        breadSaving = 1.10
        butterSaving = 0.40
    }
    else if (soup && butter && !bread) {
        butterSaving = 0.40
    }
    /**************************************************************************/

    /*********************************Second scenario**************************/
    const cheese = productDetails?.find(product => product.product_name.toUpperCase() === 'CHEESE')

    if (cheese?.product_count === 3) {
        cheeseFree = true
        cheeseSaving = 0.90
        free_cheese = 1
    }
    else if (cheese?.product_count === 4) {
        cheeseFree = true
        cheeseSaving = 1.80
        free_cheese = 2
    }
    else if (cheese?.product_count >= 4) {
        cheeseFree = true
        cheeseSaving = 1.80
        free_cheese = 2
    }
    /**************************************************************************/

    // For Billing
    const product = productDetails?.forEach(element => {
        subTotal += (element.price * element.product_count)
    });

    totalSaving = breadSaving + butterSaving + cheeseSaving;
    totalAmount = subTotal - totalSaving;
    

    // for increment product count
    const incrementCount = (id, name, price, product_count) => {
        let selectedProduct = {
            id: id,
            product_name: name,
            price: price,
            product_count: product_count + 1
        }
        store.dispatch(selectProduct(selectedProduct))
        setCount(count + 1)
    }
    // For decrement product count
    const decrementCount = (id, name, price, product_count) => {
        let selectedProduct = {
            id: id,
            product_name: name,
            price: price,
            product_count: product_count - 1
        }
        store.dispatch(selectProduct(selectedProduct))
        setCount(count - 1)
    }

    // for remove product from basket
    const removeProductFromCart = (id) =>{
        store.dispatch(removeProduct(id))
    }

    return (
        <Component
            {...props}
            {...{
                count,
                productDetails,
                breadSaving,
                butterSaving,
                cheeseSaving,
                cheeseFree,
                free_cheese,
                subTotal,
                incrementCount,
                decrementCount,
                totalSaving,
                totalAmount,
                removeProductFromCart
            }}
        />
    );
}


export default enhancer;