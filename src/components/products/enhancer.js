import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../redux/action/actions';



let enhancer = (Component) => (props) => {
    const productsData = [
        { id: 1, product_name: "Bread", price: 1.10 },
        { id: 2, product_name: "Milk", price: 0.50 },
        { id: 3, product_name: "Cheese", price: 0.90 },
        { id: 4, product_name: "Soup", price: 0.60 },
        { id: 5, product_name: "Butter", price: 1.20 }
    ];

    // varibales
    const [count, setcount] = useState(0)
    const productDetails = useSelector(state => state.selectedProduct)

    let productMatching = [];
    productsData.forEach(element => {
        productDetails?.forEach(prod => {
            if (prod.product_name === element.product_name) {
                productMatching.push(prod)
            }
        })
    });

    const dispatch = useDispatch()
    const setProductToStore = (id, name, price) => {
        let selectedProduct = {
            id: id,
            product_name: name,
            price: price,
            product_count: name.toUpperCase() === "CHEESE" ? 2 : 1,
        }
        dispatch(selectProduct(selectedProduct))
        setcount(count + 1)
    }

    return (
        <Component
            {...props}
            {...{
                productsData,
                count,
                productMatching,
                setProductToStore
            }}
        />
    );
}


export default enhancer;