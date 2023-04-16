import { create } from "zustand";

const useUserInfoStore = create((set) => ({
  isLogin: false,
  setLogin: (isLogin) => set({ isLogin: isLogin }),
  user: null,
  setUser: (user) => set({ user: user }),
}));

const getTotal = (cart) => {
  let total = 0;
  for (let itemOptionId in cart.cartItems) {
    let itemTotal =
      cart.cartItems[itemOptionId].price *
      cart.cartItems[itemOptionId].quantity;
    total += itemTotal;
  }
  return total;
};

const useCartStore = create((set) => ({
  cart: {},
  setCart: (cart) => set({ cart: cart }),
  add: (
    cart,
    itemOptionId,
    quantity,
    itemName,
    price,
    imageUrl,
    optionName,
    itemId
  ) => {
    if (cart.cartItems[itemOptionId] === undefined) {
      if (quantity > 0) {
        cart.cartItems[itemOptionId] = {
          quantity: quantity,
          itemName: itemName,
          price: price,
          imageUrl: imageUrl,
          optionName: optionName,
          itemId: itemId,
        };
      }
    } else {
      let oldQuantity = cart.cartItems[itemOptionId].quantity;
      let newQuantity = oldQuantity + quantity;
      cart.cartItems[itemOptionId].quantity = newQuantity;
    }
    cart["total"] = getTotal(cart);
    cart.updatedAt = Date.now();
    console.log("in add to cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },

  update: (cart, itemOptionId, quantity) => {
    cart.cartItems[itemOptionId].quantity = quantity;
    if (cart.cartItems[itemOptionId].quantity <= 0) {
      delete cart.cartItems[itemOptionId];
    }
    cart.updatedAt = Date.now();
    cart["total"] = getTotal(cart);
    console.log("in update cart", cart);
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
