import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p>GiftoPet  <Icon type="smile" /></p>
           <p>Copyright @ 2021 GiftoPet All Right Reserved.</p>
        </div>
    )
}

export default Footer
