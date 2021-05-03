import React from "react";
import Basket from "../basket/Basket";
import productEnhancer from "./enhancer";
import "./styles.css";

function Products({
  productsData,
  count,
  productMatching,
  setProductToStore
}) {
  return (
    <div className='main_container'>
      <div className="product-conainer">
        <h1>Products</h1>
        <div style={{ display: 'none' }}>{count}</div>
        <hr />
        {productsData.map((item) => (
          <div key={item.id}>
            <div className="products" >
              <span>{item.product_name}</span>
              <div className="price-and-button-wrapper">
                <span>£ {item.price.toFixed(2)}</span>
                <button
                  id='selectedProduct'
                  disabled={productMatching.find(p => p.id === item.id)}
                  onClick={() => setProductToStore(item.id, item.product_name, item.price, item.selected)}
                  style={productMatching.find(p => p.id === item.id) ? { backgroundColor: '#8080809e' } : {}}
                >
                  Add
              </button>
              </div>
            </div>
            <hr className='line' />
          </div>
        ))}
      </div>
      <Basket />
    </div>
  );
}

export default productEnhancer(Products);
