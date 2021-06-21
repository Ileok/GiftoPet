import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
function ProductInfo(props) {
    const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail._id))

    }

    return (
        <div>
            <Descriptions title="상품 정보">
                <Descriptions.Item label="가격">{props.detail.price}원</Descriptions.Item>
                <Descriptions.Item label="설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니에 담기
                </Button>
            </div>


        </div>
    )
}

export default ProductInfo
