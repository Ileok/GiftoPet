import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div style={{ width: "100%"}}>
            <h3>Search Products</h3>
            <Search
                placeholder="Search"
                onChange={searchHandler}
                style={{ width: "100%" }}
                value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature
