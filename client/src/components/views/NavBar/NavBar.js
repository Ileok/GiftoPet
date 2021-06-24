import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
  {/*[상태 값, Setter 함수] = useState(초기값)*/}
  const [visible, setVisible] = useState(false)

  {/*Drawer Menu show*/}
  const showDrawer = () => {
    setVisible(true)
  };

  {/*Drawer Menu hide*/}
  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      {/*Logo*/}
      <div className="menu__logo">
        <a href="/"><img src='../pawprint2.ico' style={{marginRight :10}}></img>GiftoPet</a>
      </div>

      {/*Navbar*/}
      <div className="menu__container">
        <div className="menu_left">
          {/*좌측 메뉴*/}
          <LeftMenu mode="horizontal"  /> 
        </div>
        <div className="menu_rigth">
          {/*우측 메뉴*/}
          <RightMenu mode="horizontal" />
        </div>
        {/*Drawer Menu Button*/}
        <Button
          className="menu__mobile-button" 
          type="primary"
          onClick={showDrawer} 
        >
          <Icon type="menu"/>
        </Button>
        {/*Drawer Menu*/}
        <Drawer
          title="Menu"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar