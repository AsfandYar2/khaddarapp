import uuid from 'uuid';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { toast } from 'react-toastify';
const ENDPOINT = 'https://synergysol.herokuapp.com';

const socket = socketIOClient(ENDPOINT);

export const addCart = (cart) => (dispatch) => {
  dispatch({
    type: 'ADD_CART',
    payload: cart,
  });
  toast('🛒 Item added to Cart', {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const updateCart = (cart) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CART',
    payload: cart,
  });
  toast('🛒 Cart Updated', {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: 'cart_updated',
  });
};
export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_ITEM',
    payload: id,
  });
  toast('❎ Item removed', {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const addLike = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_WISHLIST',
    payload: product,
  });
  toast('💓 Item Added to wishlist', {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const unLike = (product) => (dispatch) => {
  dispatch({
    type: 'REMOVE_WISHLIST',
    payload: product,
  });
  toast('❎ Item removed from wishlist', {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// ADD orderPlace
export const orderPlace = (orderdata) => async (dispatch) => {
  const config = { 'Content-Type': 'application/json' };
  const res = await axios.post(`/api/orders`, orderdata, config);

  socket.emit('new_order', 'order');
  localStorage.removeItem('cart');

  dispatch({
    type: 'PLACE_ORDER',
    // payload: res.data,
  });
  toast(
    '👋 Your Order has been placed. You will be hearing soon from our representative',
    {
      position: 'top-center',
      autoClose: 20000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
  toast('👍 Thank you for using k.khaddar', {
    position: 'top-center',
    autoClose: 20000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const deleteOrder = (id) => async (dispatch) => {
  const res = await axios.delete(`/api/orders/${id}`);

  socket.emit('new_order', 'order');

  dispatch({
    type: 'PLACE_ORDER',
    // payload: res.data,
  });
};

//GET ORDER DATA
export const getOrderData = () => async (dispatch) => {
  const orders = await axios.get('/api/orders');

  dispatch({
    type: 'GET_ORDER_DATA',
    payload: orders.data,
  });
};
