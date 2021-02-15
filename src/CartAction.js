export const initialState = [
    {
      name: "Add a Dish to Cart",
      buy: false
    }
  ];
  
  const ADD = "ADD";
  const MARK = "MARK";
  const REMOVE = "REMOVE";
  
  export function cartReducer(state, action) {
    switch (action.type) {
      case ADD:
        return [...state, action.payload.cart];
      case MARK:
        return state.map((cart, i) => {
          if (i === action.payload.cartId)
            return { ...cart, buy: action.payload.buy };
  
          return cart;
        });
      case REMOVE:
        return state.filter((_cart, i) => action.payload.cartId !== i);
      default:
        return state;
    }
  }
  
  export function addAction(cartValue) {
    return {
      type: ADD,
      payload: {
        cart: {
          name: cartValue,
          done: false
        }
      }
    };
  }
  
  export function markAction(cartId, buy) {
    return {
      type: MARK,
      payload: {
        cartId,
        buy
      }
    };
  }
  
  export function deleteAction(cartId) {
    return {
      type: REMOVE,
      payload: {
        cartId
      }
    };
  }
  