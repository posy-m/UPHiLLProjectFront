import React, { useState } from 'react'

const ProductListView = ({ product }) => {

    const [buyPopup, setBuyPopup] = useState(false);

    const openPopup = () => {
        setBuyPopup(true)
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {buyPopup ? <UserAvatarBuy productId={product.id} buyPopup={buyPopup} setBuyPopup={setBuyPopup} /> : ""}
            <div style={{ width: "100%", height: "110px", borderRadius: "10px", border: "3px solid black" }} onClick={openPopup}>
                <img src={`http://127.0.0.1:4000${product.image}`} alt="" className='w-full h-full' />
            </div>
            {<p style={{ textAlign: "center", fontWeight: 'bold' }}>{product.orders.length > 0 && product.orders[0].usate ? "착용중" : product.orders.length > 0 ? "보유중" : "판매중"}</p>}
        </div>
    )
}

export default ProductListView
