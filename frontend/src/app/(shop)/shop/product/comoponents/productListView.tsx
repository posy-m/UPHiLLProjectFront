import React, { useState } from 'react'
import UserProductList from './UserProductBuy';

const ProductListView = ({ product }) => {

    const [buyPopup, setBuyPopup] = useState(false);

    const openPopup = () => {
        setBuyPopup(true)
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {buyPopup ? <UserProductList productId={product.id} buyPopup={buyPopup} setBuyPopup={setBuyPopup} /> : ""}
            <div style={{ width: "100%", height: "110px", borderRadius: "10px", border: "3px solid black" }} onClick={openPopup}>
                <img src={`http://127.0.0.1:4000${product.image}`} alt="" className='w-full h-full' />
                <div className='w-full flex'>{product.name}</div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default ProductListView
