import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';

function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [])



    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>[판매중] {Product.title}</h1>
            </div>

            <br />
            {/*Grid Layout(antd)*/}
            <Row gutter={[16, 16]} >
                {/*반응형 웹 구현; 화면 크기에 따른 상품 목록 배치 변경*/}
                {/*lg:1200px 이하 세로 배치, md:992px 이하 세로 배치,
                sm:768 이하 세로 배치, xs:항상 가로 배치 */}
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>





        </div>
    )
}

export default DetailProductPage
