const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const { auth } = require("../middleware/auth");
const async = require('async');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post("/addToCart", auth, (req, res) => {

    //User Collection에 해당 유저의 정보를 가져오기 
    User.findOne({ _id: req.user._id }, // auth 미들웨어를 이용하여 req.user._id 사용.
        (err, userInfo) => { // userInfo는 DB 내 유저컬렉션에서 해당하는 유저의 정보

            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인 
            let duplicate = false; // true는 상품이 이미 있음, false는 상품이 있지 않음
            userInfo.cart.forEach((item) => { // 유저정보 내 cart 내 item들을 forEach를 이용하여 하나하나 돌림
                if (item.id === req.body.productId) { // 만약 아이템 id와 req.body.productId(넣으려는 상품)이 같다면
                    duplicate = true; // duplicate는 true(장바구니에 이미 상품이 있음)
                }
            })

            //상품이 이미 있을때
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, "cart.id": req.body.productId }, // 현재 유저의 정보와 그 안에 있는 카트에서 상품을 잡음 
                    { $inc: { "cart.$.quantity": 1 } }, // increment(증가) 메서드를 이용하여 cart 속 quantity(수량)의 값을 1 증가시킨다
                    { new: true }, // 쿼리를 돌린 다음에 결과값을 받을 때 업데이트가 된 정보를 받기 위해 new : true 사용
                    (err, userInfo) => { // 업데이트된 userInfo를 받음
                        if (err) return res.status(200).json({ success: false, err })
                        res.status(200).send(userInfo.cart) // 정상적으로 받을 시 userInfo의 cart 정보를 프론트로 보내줌
                    }
                )
            }
            
            //상품이 있지 않을때 
            else {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: { // push : 값을 넣어준다
                            cart: { 
                                id: req.body.productId, // 상품id와
                                quantity: 1, // 수량 한 개와
                                date: Date.now() // date를 넣어준다
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
        })
});


router.get('/removeFromCart', auth, (req, res) => {

    //cart안에 지우려는 상품을 지워주기 
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            //product collection에서  현재 남아있는 상품들의 정보를 가져오기 

            //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
            Product.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
})



router.post('/successBuy', auth, (req, res) => {


    //User Collection 안에  History 필드 안에  간단한 결제 정보 넣어주기
    let history = [];
    let transactionData = {};
    let today = new Date()

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: today,
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            //paymentId: req.body.paymentData.paymentID
        })
    })

    //Payment Collection 안에  자세한 결제 정보들 넣어주기 
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    //transactionData.data = req.body.paymentData
    transactionData.product = history

    //history 정보 저장 
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err })


            //payment에다가  transactionData정보 저장 
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })

            })
        }
    )
})



module.exports = router;
