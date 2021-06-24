import React from 'react'
import "./UserCardBlock.css"
function UserCardBlock(props) {

    const renderCartImage = (images) => { //image load
        if (images.length > 0) {
            let image = images[0] //이미지 슬라이더 중 첫번째 사진 index
            return `http://localhost:5000/${image}`
        }
    }




    const renderItems = () => ( //데이터 불러오기
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: "10%" }} alt="product"
                        src={renderCartImage(product.images)} />
                        {product.title}
                </td>
                <td>
                    x {product.quantity} 
                </td>
                <td>
                    ￦ {product.price}
                </td>
                <td>
                    {/*장바구니 항목 삭제*/}
                    <button className="ant-btn-primary" style={{width:"100%"}} onClick={() => props.removeItem(product._id)}>
                        Delete From Cart
                    </button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
