import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from './types';
import { USER_SERVER } from '../components/Config.js';


/* 

 각 액션마다 Get 또는 Post로 필요한 Request를 요청하고 
 Response를 받아 response.data로 보내줍니다. 
 그리고 각자 반환되어 새로운 상태가 저장됩니다.

*/

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(id) {
    let body = {
        productId: id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {

    // HTTP 통신 라이브러리인 axios를 이용하여 겟메서드를 통해 상세페이지를 가져왔을 때 사용한 엔드포인트를 이용한다.
    // 이 때, cart에 담긴 상품을 가져오기 때문에 cartItems를 사용하고, 상세페이지에서 한 개의 상품만 필요로 했기에 싱글 타입이었다면
    // cart는 여러 개의 상품정보를 가지고 있으므로 array 타입을 사용한다.
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            // CartItem들에 해당하는 정보들을  Product Collection에서 가져온 후에 수량(Quantity) 정보를 넣어 준다.
            userCart.forEach(cartItem => { // userCart를 forEach를 이용하여 cartItem들을 하나씩 잡아주고
                response.data.forEach((productDetail, index) => { // 리스펀스 안에 상품 정보들도 여러가지가 될 수 있기에 리스펀스 데이터의 프로덕트디테일도 하나씩 잡아준다
                    if (cartItem.id === productDetail._id) { // 이 때 카트아이템의 아이디와 프로덕트디테일의 아이디가 같으면
                        response.data[index].quantity = cartItem.quantity // 리스펀스 데이터 퀀티티(수량)에 카트아이템의 퀀티티를 넣어준다.
                    }
                })
            })
            return response.data; // 리스펀스 데이터를 리턴해준다. 리스펀스 데이터는 reducer의 cartDetail payload로 저장된다
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}


export function removeCartItem(productId) {

    const request = axios.get(`/api/users/removeFromCart?id=${productId}`) 
        .then(response => {
            //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다. 
            response.data.cart.forEach(item => { //  response.data.cart 내 아이템을 하나씩 돌려
                response.data.productInfo.forEach((product, index) => { // response.data.productInfo 내 아이템도 하나씩 돌려
                    if (item.id === product._id) { // 아이템 아이디와 상품 아이디가 일치한다면 
                        response.data.productInfo[index].quantity = item.quantity // response.data.productInfo의 수량에 item.quantity의 수량을 대입한다.
                    }

                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) { //

    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}














