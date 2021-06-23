import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '150px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <h5>GiftoPet  <Icon type="smile" /></h5>
           <h5>Copyright @ 2021 GiftoPet All Right Reserved.</h5>
           <h5>Uhm Seo Hyeon, Sim Ji Hoon, Kim So Dam</h5>
        </div>
    )
}

export default Footer
