import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

const PageCart = () => {
  const { cartNum, cart, updateCartItemQuan, deleteCartItem, checkout, subtotal } = useStateContext();
  console.log(cart);

  const quan_options = [...Array(20).keys()].map((num) => {
    return (
      <option key={num} value={num + 1}>
        {num + 1}
      </option>
    );
  });

  const change_quantity = (e) => {
    updateCartItemQuan(e.target.id, e.target.value);
  };

  const remove_item = (e) => {
    deleteCartItem(e.target.id);
  };

  let items;
  if (cart.length !== 0) {
    items = cart.map((item, id) => {
      return (
        <div key={id} className='cart-item'>
          <div className='cart-item-left'>
            <div className='cart-item-title'>{item.name}</div>
            <img className='cart-item-img' src={item.img} alt='detail'></img>
          </div>
          <div className='cart-item-right'>
            <div className='cart-info'>
              <div className='detail-info-title'>Quantity: </div>
              <div className='cart-info-text'>
                <select id={item.id} className='cart-info-quan-select' value={item.quantity} onChange={change_quantity}>
                  {quan_options}
                </select>
              </div>
            </div>
            <div className='cart-info'>
              <div className='cart-info-title'>Color: </div>
              <div className='cart-info-text'>{item.color.charAt(0).toUpperCase() + item.color.slice(1)}</div>
            </div>
            <div className='cart-info'>
              <div className='cart-info-title'>Size: </div>
              <div className='cart-info-text'>{item.size}</div>
            </div>
            <div className='cart-info'>
              <div className='cart-info-title'>Price (each): </div>
              <div className='cart-info-text'>{item.price}</div>
            </div>

            <div id={item.id} className='cart-remove-button' onClick={remove_item}>
              Remove
            </div>
          </div>
        </div>
      );
    });
  } else {
    items = <div className='cart-empty'>Your Cart is Empty</div>;
  }

  useEffect(() => {
    checkout();
  }, [cart, checkout]);

  return (
    <div className='cart-container'>
      <div className='cart-container-left'>
        <div className='cart-title'>{`My Cart (${cartNum})`}</div>
        <div className='cart-item-box'>{items}</div>
      </div>
      {cart.length !== 0 ? (
        <div className='cart-container-right'>
          <div className='summary'>
            <div className='summary-title'>Order Summary</div>
            <div className='summary-sub'>
              <div className='summary-sub-title'>Subtotal:</div>
              <div className='summary-sub-amount'>${subtotal}</div>
            </div>
            <div className='summary-sub'>
              <div className='summary-sub-title'>Est. Shopping:</div>
              <div className='summary-sub-amount'>$6.95</div>
            </div>
            <div className='summary-total'>
              <div className='summary-total-title'>Total:</div>
              <div className='summary-total-amount'>${(parseFloat(subtotal) + parseFloat(6.95)).toFixed(2)}</div>
            </div>
            <Link id='summary-checkout' className='summary-btn' to='/null'>
              Signin and Checkout
            </Link>
          </div>
          <Link id='summary-continue' className='summary-btn' to='/shirts'>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageCart;
