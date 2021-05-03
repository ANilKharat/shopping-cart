import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct } from '../../redux/action/actions'

let enhancer = (Component) => (props) => {
    // Variable declaration
    const [count, setCount] = useState(1)
    const productDetails = useSelector(state => state.selectedProduct)
    const dispatch = useDispatch()

    let totalSaving = 0;
    let subTotal = 0;
    let totalAmount = 0;


    let breadSaving = 0;
    let butterSaving = 0;
    let cheeseSaving = 0;
    let cheeseFree = false

    /************************************Scenario first**************************************/
    const soup = productDetails?.find(product => product.product_name.toUpperCase() === 'SOUP')
    const bread = productDetails?.find(product => product.product_name.toUpperCase() === 'BREAD')
    const butter = productDetails?.find(product => product.product_name.toUpperCase() === 'BUTTER')
    if (soup && bread && !butter) {
        breadSaving = 0.55
    }
    else if (soup && bread && butter) {
        breadSaving = 0.55
        butterSaving = 0.40
    }
    else if (soup && butter && !bread) {
        butterSaving = 0.40
    }
    /**************************************************************************/

    /*********************************Second scenario**************************/
    const cheese = productDetails?.find(product => product.product_name.toUpperCase() === 'CHEESE')

    if (cheese?.product_count === 1 || cheese?.product_count === 2 || cheese?.product_count === 3) {
        cheeseFree = true
        cheeseSaving = 0.90
    }
    else if (cheese?.product_count === 4) {
        cheeseFree = true
        cheeseSaving = 1.80
    }
    /**************************************************************************/

    /**************************************************************************/
    let cheese_count;
    let free_cheese;
    if (cheese?.product_count === 2) {
        cheese_count = 1
        free_cheese = 1
    }
    else if (cheese?.product_count === 3) {
        cheese_count = 2
        free_cheese = 1
    }
    else if (cheese?.product_count === 4) {
        cheese_count = 2
        free_cheese = 2
    }
    /**************************************************************************/

    // For Billing
    const product = productDetails?.forEach(element => {
        subTotal += (element.price * element.product_count)
    });

    totalSaving = breadSaving + butterSaving + cheeseSaving;
    totalAmount = subTotal - totalSaving;
    // Billing end

    const incrementCount = (id, name, price, product_count) => {
        let selectedProduct = {
            id: id,
            product_name: name,
            price: price,
            product_count: product_count + 1
        }
        dispatch(selectProduct(selectedProduct))
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
        dispatch(selectProduct(selectedProduct))
        setCount(count - 1)
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
                cheese_count,
                free_cheese,
                subTotal,
                incrementCount,
                decrementCount,
                totalSaving,
                totalAmount,
                product
            }}
        />
    );
}


export default enhancer;