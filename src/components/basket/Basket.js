import React from "react";
import "./styles.css";
import basketEnhancer from './enhancer'

function Basket({
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
  totalAmount
}) {

  return (
    <div className="basket-container">
      <h1>Basket</h1>
      <span style={{ display: 'none' }}>{count}</span>
      <hr />
      {
        productDetails.length > 0 ?
          <div>
            {
              productDetails.map((item) =>
                <div key={item.id}>
                  <div className="product-container">
                    <span>{item.product_name}</span>
                    <span>£ {item.price.toFixed(2)}</span>
                    <div className="button-and-count-container">
                      <button className='plus-button'
                        id="plus_button"
                        onClick={() => incrementCount(item.id, item.product_name, item.price, item.product_count)}
                      >+</button>
                      <span>{item.product_count}</span>
                      <button className='minus-button'
                        id="minus_button"
                        disabled={item.product_name.toUpperCase() === "CHEESE" ? item.product_count === 2 : item.product_count === 1}
                        onClick={() => decrementCount(item.id, item.product_name, item.price, item.product_count)}
                      >-</button>
                    </div>
                  </div>
                  <div className="item-total-price">
                    Item price £
            {item.price.toFixed(2)} *
              {
                      (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 2) ||
                        (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 3) ||
                        (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 4) ?
                        cheese_count : item.product_count
                    }
              = £
            {
                      (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 2) ||
                        (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 3) ||
                        (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 4) ?
                        (item.price * cheese_count).toFixed(2) : (item.price * item.product_count).toFixed(2)
                    }
                  </div>
                  <hr className='bottom-line' />
                  <div className="item-cost">
                    Item cost £
              {
                      (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 2) ||
                        (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 3) ||
                        (item.product_name.toUpperCase() === "CHEESE" && item.product_count === 4) ?
                        (item.price * cheese_count).toFixed(2) : (item.price * item.product_count).toFixed(2)
                    }
                  </div>
                  <hr className='bottom-line' />

                  {
                    item.product_name.toUpperCase() === 'BREAD' && breadSaving ?
                      <div>
                        <div className='item-saving'>Offer Applied🎉🎁 Total savings {breadSaving.toFixed(2)}</div>
                        <hr className='bottom-line' />
                      </div>
                      : null
                  }

                  {
                    item.product_name.toUpperCase() === 'BUTTER' && butterSaving ?
                      <div>
                        <div className='item-saving'>Offer applied 🎉 Total savings {butterSaving.toFixed(2)}
                        </div>
                        <hr className='bottom-line' />
                      </div>
                      : null
                  }

                  {
                    item.product_name.toUpperCase() === 'CHEESE' && cheeseFree ?
                      <div>
                        <div className='item-saving'>Congratulation you got {free_cheese} cheese free 🎁 (Total saving {cheeseSaving.toFixed(2)})</div>
                        <hr className='bottom-line' />
                      </div>
                      : null
                  }
                </div>
              )
            }
            <div className="sub-total-section">
              <div className="bill-section">
                <span>Sub Total</span>
                <span>£ {subTotal.toFixed(2)}</span>
              </div>
              <div className="bill-section">
                <span>Savings</span>
                <span>£ {totalSaving.toFixed(2)}</span>
              </div>
              <div className="bill-section">
                <span>Total Amount</span>
                <span>£ {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          : <div>No product selected</div>
      }
    </div>
  );
}

export default basketEnhancer(Basket);
