/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) { //우측 메뉴
  const user = useSelector(state => state.user) //user 상태값 조회

  const logoutHandler = () => {//logout function
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        alert('로그아웃되었습니다. 로그인 페이지로 이동합니다.');
        props.history.push("/login");
      } else {
        alert('로그아웃에 실패하였습니다.')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) { // 로그인이 되지 않은 상태일 때
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Login</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    if (user.userData && !user.userData.isAdmin) { // 일반 계정으로 로그인하였을 때
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="history">
            <a href="/history">Order History</a>
          </Menu.Item>
          <Menu.Item key="cart" style={{ paddingBottom: 9 }}>
            <Badge count={user.userData && user.userData.cart.length}>{/*장바구니에 담긴 상품 갯수*/}
              <a href="/user/cart" className="head-example">
                Cart
                <Icon type="shopping-cart"/>
              </a>
            </Badge>
          </Menu.Item>
  
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      )
    } else { // 관리자 계정으로 로그인 하였을 때
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="history">
            <a href="/history">Order History</a>
          </Menu.Item>

          {/*관리자 전용 메뉴*/}
          <Menu.Item key="upload">
            <a href="/product/upload">New Product</a>
          </Menu.Item>

          <Menu.Item key="cart" style={{ paddingBottom: 9 }}>
            <Badge count={user.userData && user.userData.cart.length}>
              <a href="/user/cart" className="head-example">
                Cart
                <Icon type="shopping-cart"/>
              </a>
            </Badge>
          </Menu.Item>

          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
     )
    }
  }
}

export default withRouter(RightMenu);

