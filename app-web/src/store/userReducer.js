import { create } from "zustand";
const useUserInfoStore = create((set) => ({
  isLogin: false,
  setLogin: (isLogin) => set({ isLogin: isLogin }),
  user: null,
  setUser: (user) => set({ user: user }),
}));

const useCartStore = create((set) => ({
  cart: {},
  setCart: (cart) => set({ cart: cart }),
  modifyCart: (itemOptionId, quantity, itemName, price, cart) =>{
        if (cart.cartItems[itemOptionId] === undefined) {
          if (quantity > 0) {
            cart.cartItems[itemOptionId] = {
              quantity: quantity,
              itemName: itemName,
              price: price,
            };
          }
        } else {
          let oldQuantity = cart.cartItems[itemOptionId].quantity;
          let newQuantity = oldQuantity + quantity;
          console.log("old quantity",oldQuantity);
          console.log("new quantity",newQuantity);
          if (newQuantity <= 0) {
            delete cart.cartItems[itemOptionId];
          } else {
            cart.cartItems[itemOptionId].quantity = newQuantity;
          }
        }
        cart.updatedAt = Date.now();
        console.log('in modify cart',cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
      }
    ,
  cleanCart: () =>
    set({
      cart: { cartItems: {}, updatedAt: Date.now() },
    }),
}));
export { useUserInfoStore, useCartStore };
