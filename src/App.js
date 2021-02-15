
import React, { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";


import {
  cartReducer,
  initialState,
  addAction,
  markAction,
  deleteAction
} from "./CartAction";

import "./index.css";

const cartContext = React.createContext(null);

function App() {
  const [cartList, dispatch] = useReducer(cartReducer, initialState);

  return (
    <cartContext.Provider value={dispatch}>y

      <div className="App">
        <InputCart />
        <h3>Cart</h3>
        <CartList cartList={cartList} />
      </div>
    </cartContext.Provider>
  );
}

const InputCart = React.memo(function CartForm() {
  const [cart, setCart] = useState("");
  const dispatch = useContext(cartContext);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addAction(cart));
    setCart("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          name="cart"
          onChange={(e) => {
            setCart(e.target.value);
          }}
          value={cart}
          placeholder="Add a dish to your cart"
        />
        <button className="baseButton add" type="submit">
          Add
        </button>
      </p>
    </form>
  );
});

function CartList({ cartList }) {
  return (
    <ol>
      {cartList.map((cart, i) => {
        return (
          <li key={i}>
            <span className={cart.buy}>
              {cart.name}
            </span>{" "}
            {!cart.buy && (
              <Action
                id={i}
                className="baseButton done"
                action={markWith(true)}
              >
                Buy
              </Action>
            )}
            {cart.buy && (
              <Action
                id={i}
                className="baseButton undo"
                action={markWith(false)}
              >
                Undo
              </Action>
            )}
            <Action id={i} className="baseButton delete" action={deleteAction}>
              Remove
            </Action>
          </li>
        );
      })}
    </ol>
  );
}

function markWith(mark) {
  return (id) => markAction(id, mark);
}

function Action({ id, className, action, children }) {
  const dispatch = useContext(cartContext);
  return (
    <button
      className={className}
      onClick={() => {
        dispatch(action(id));
      }}
    >
      {children}
    </button>
  );
}

export default App;