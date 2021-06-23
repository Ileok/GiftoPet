import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import { useSelector } from "react-redux";
function ProductInfo(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const clickHandler = () => {
        if(user.userData && !user.userData.isAuth){
            alert('로그인 후 이용해주세요.');
        }else{
            //필요한 정보를 Cart 필드에다가 넣어 준다.
            alert('장바구니에 추가되었습니다.');
            dispatch(addToCart(props.detail._id));
        }
    }

    return (
        <div>
            <h1>
                About Product
            </h1>
            <br/>
            <table border = "1">
                <thead>
                    <tr>
                        <th>
                            PRICE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        ￦ {props.detail.price}
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>
                            DESCRIPTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {props.detail.description}
                        </td>
                    </tr>
                </tbody>
            </table>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>


        </div>
    )
}

export default ProductInfo
