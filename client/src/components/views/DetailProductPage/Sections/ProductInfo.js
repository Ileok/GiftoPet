import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
function ProductInfo(props) {
    const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        alert('장바구니에 추가되었습니다.');
        dispatch(addToCart(props.detail._id));
    }

    return (
        <div>
            <h3>
                About Product
            </h3>
            <br/>
            <table border = "1">
                <th>
                    PRICE
                </th>
                <tr>
                    <td>
                    ￦ {props.detail.price}
                    </td>
                </tr>
                <th>
                    DESCRIPTION
                </th>
                <tr>
                    <td>
                        {props.detail.description}
                    </td>
                </tr>
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
