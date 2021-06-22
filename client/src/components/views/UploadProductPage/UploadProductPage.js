import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { TextArea } = Input;

const Categories = [
    { key: 1, value: "사료" },
    { key: 2, value: "간식" },
    { key: 3, value: "배변용품" },
    { key: 4, value: "목욕용품" },
    { key: 5, value: "실내용품" },
    { key: 6, value: "산책용품" },
    { key: 7, value: "장난감" }
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Category, setCategory] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const categoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Category || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }


        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            categories: Category
        }

        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패했습니다.')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> NEW PRODUCT</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Name</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>Price</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <label>Categories</label>
                <select onChange={categoryChangeHandler} value={Category} style={{ minWidth: '100%' }}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <br />
                <br />
                <button id = "btn1" type="submit" style={{ minWidth: '100%' }}>
                    OK
                </button>
            </Form>


        </div>
    )
}

export default UploadProductPage
