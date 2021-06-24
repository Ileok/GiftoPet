import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) { //좌측 메뉴
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Products</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu