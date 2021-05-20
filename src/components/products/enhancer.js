import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../redux/action/actions';



let enhancer = (Component) => (props) => {
    // varibales
    const [count, setcount] = useState(0)
    const [productsData, setProductsData] = useState([])
    const productDetails = useSelector(state => state.selectedProduct)

    useEffect(() => {
        fetch('https://run.mocky.io/v3/5c6d0905-3f5c-42c8-a70f-177970992309')
        .then(res=> res.json())
        .then((result) => setProductsData(result))
    }, [])

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
            product_count: 1,
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