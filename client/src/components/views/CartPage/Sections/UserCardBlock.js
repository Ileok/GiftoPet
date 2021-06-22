import React from 'react'
import "./UserCardBlock.css"
function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }




    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="product"
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
                    <button id = "btn1" onClick={() => props.removeItem(product._id)}>
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
