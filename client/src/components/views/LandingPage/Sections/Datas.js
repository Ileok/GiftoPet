const categories = [
    {
        "_id": 1,
        "name": "사료"
    },
    {
        "_id": 2,
        "name": "간식"
    },
    {
        "_id": 3,
        "name": "배변용품"
    },
    {
        "_id": 4,
        "name": "위생용품"
    },
    {
        "_id": 5,
        "name": "실내용품"
    },
    {
        "_id": 6,
        "name": "산책용품"
    },
    {
        "_id": 7,
        "name": "장난감"
    }

]

const price = [
    {
        "_id": 0,
        "name": "전체",
        "array": []
    },
    {
        "_id": 1,
        "name": "~ 9,900원",
        "array": [0, 9900]
    },
    {
        "_id": 2,
        "name": "10,000원 ~ 29,900원",
        "array": [10000, 29900]
    },
    {
        "_id": 3,
        "name": "30,000원 ~ 49,900원",
        "array": [30000, 49900]
    },
    {
        "_id": 4,
        "name": "50,000원 ~ 99,900원",
        "array": [50000, 99900]
    },
    {
        "_id": 5,
        "name": "100,000만원 이상",
        "array": [100000, 300000]
    }
]




export {
    categories,
    price
}
