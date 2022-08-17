const CART = 'cart';

if (!JSON.parse(localStorage.getItem(CART))) {
  localStorage.setItem(CART, JSON.stringify([]));
}

const getItem = (key) => JSON.parse(localStorage
  .getItem(key)) || [];

const setItem = (key, data) => localStorage
  .setItem(key, JSON.stringify(data));

export const getProducts = () => getItem(CART);

export const setProducts = (data) => setItem(CART, data);
