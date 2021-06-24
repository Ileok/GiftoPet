import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) //이미 렌더링된 상품 갯수
    const [Limit, setLimit] = useState(8) //한 번에 렌더링되는 갯수 제한
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => { 
        axios.post('/api/product/products', body) //상품 데이터 받아오기
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }

    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        }

        getProducts(body)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {
        {/*반응형 웹 구현; 화면 크기에 따른 상품 목록 배치 변경*/}
        {/*lg:1200px 이하 세로 배치, md:992px 이하 세로 배치,
         sm:768 이하 세로 배치, xs:항상 가로 배치 */}
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`} >
                    <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={`[판매중] ${product.title}`}
                    description={`￦${product.price}`}
                />
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h1>Products</h1>
            </div>
            <br/>
            <br/>

            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>

            <br />
            <br />
            <br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="ant-btn-primary" style={{width:"75%"}}
                    onClick={loadMoreHanlder}>More Products</button>
                </div>
            }

        </div>
    )
}

export default LandingPage