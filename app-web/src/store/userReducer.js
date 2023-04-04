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
  modifyCart: (
    cart,
    update,
    itemOptionId,
    quantity,
    itemName = null,
    price = null,
    imageUrl = null,
    optionName = null
  ) => {
    if (cart.cartItems[itemOptionId] === undefined) {
      if (quantity > 0) {
        cart.cartItems[itemOptionId] = {
          quantity: quantity,
          itemName: itemName,
          price: price,
          imageUrl: imageUrl,
          optionName: optionName,
        };
      }
    } else {
      if (update) {
        cart.cartItems[itemOptionId].quantity = quantity;
      } else {
        let oldQuantity = cart.cartItems[itemOptionId].quantity;
        let newQuantity = oldQuantity + quantity;
        cart.cartItems[itemOptionId].quantity = newQuantity;
      }
    }
    if (cart.cartItems[itemOptionId].quantity <= 0) {
      delete cart.cartItems[itemOptionId];
    }
    cart.updatedAt = Date.now();
    console.log("in modify cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },
  cleanCart: () => {
    let newCart = { cartItems: {}, updatedAt: Date.now() };
    localStorage.setItem("cart", JSON.stringify(newCart));
    set({
      cart: { newCart },
    });
  },
}));
export { useUserInfoStore, useCartStore };
