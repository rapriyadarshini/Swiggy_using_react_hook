import {
    cartReducer,
    initialState,
    addAction,
    markAction,
    deleteAction
  } from "./CartAction";
  
  describe("Cart", function() {
    it("no change to cart", function() {
      const cartList = cartReducer(initialState, { type: "none" });
      expect(cartList).toEqual(initialState);
    });
  
    it("Add a Dish to Cart", function() {
      const cartList = cartReducer(initialState, addAction("Briyani"));
      expect(cartList).toEqual([
        ...initialState,
        { name: "Briyani", buy: false }
      ]);
    });
  
    it("mark a item as bought", function() {
      const cartList = cartReducer(initialState, addAction("Briyani"));
      const afterBuy = cartReducer(cartList, markAction(1, true));
      expect(afterBuy).toEqual([
        ...initialState,
        { name: "Briyani", buy: true }
      ]);
    });
  
    it("remove a item as bought", function() {
      const cartList = cartReducer(initialState, markAction(0, true));
      const afterUndo = cartReducer(cartList, markAction(0, false));
      expect(afterUndo).toEqual(initialState);
    });
  
    it("remove a item from list", function() {
      const cartList = cartReducer(initialState, addAction("Briyani"));
      const afterRemove = cartReducer(cartList, deleteAction(0));
      expect(afterRemove).toEqual([{ name: "Briyani", buy: false }]);
    });
  });
  