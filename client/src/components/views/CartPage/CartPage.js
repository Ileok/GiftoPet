import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

    const clickHandler = () => {
        dispatch(onSuccessBuy({
            cartDetail: props.user.cartDetail // cartDetail(장바구니 정보)를  
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                }
            })
        alert('주문이 완료 되었습니다.');
        props.history.push("/");
    }

    useEffect(() => {

        let cartItems = []
        //리덕스의 User state안 cart안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) { // user.userData가 있고, 그 안에 cart도 있다면
            if (props.user.userData.cart.length > 0) { // 그리고 카트 안에 상품이 하나 이상 들어있다면 
                props.user.userData.cart.forEach(item => { // 상품의 정보를 하나 하나 돌려서
                    cartItems.push(item.id) // cartitems의 item.id에 넣어준다.
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart)) // 리덕스를 이용하므로 값이 넣어진 cartItem은 디스패치를 이용하여
                    .then(response => { calculateTotal(response.payload) }) // getCartItems 액션으로 item.id가 들어간 카트아이템, 카트 정보를 가져온다.
            }
        }
    }, [props.user.userData]) // userData 안에 cart가 있을 때만 작동하기 때문에 cart가 없는 경우엔 에러가 난다. 에러를 막기 위해 props.user.userData를 넣어준다.


    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price) * item.quantity
        })

        setTotal(total)
        setShowTotal(true)

    }


    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {

                if (response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })

    }



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Cart</h1>
            </div>
            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} />
            </div>

            {ShowTotal ?

                <div style={{ marginTop: '3rem' }}>
                <h2>&nbsp;&nbsp;&nbsp;Total Price : </h2>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￦&nbsp;&nbsp;{Total}</h1>
                </div>        

                :

                <div style={{ marginTop: '3rem' }}>
                <h2>&nbsp;&nbsp;&nbsp;Total Price : </h2>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￦&nbsp;&nbsp;0</h1>
                </div>

        }



            <div style={{ textAlign: 'center' }}>
                <button type="primary" className="ant-btn-primary" onClick={clickHandler} style={{width:"50%"}}>
                    Order
                </button>
            </div>
                

                    

        </div>
    )
}

export default CartPage
