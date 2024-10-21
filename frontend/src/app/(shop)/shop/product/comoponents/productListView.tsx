import React, { useEffect, useState } from 'react'
import UserProductList from './UserProductBuy';

const ProductListView = ({ product, setBuyPopup, buyPopup, refetch }: { product: any, setBuyPopup: Function, buyPopup: boolean, refetch: Function }) => {
    const openPopup = () => {
        setBuyPopup(true)
    }

    return (
        <div>
            {buyPopup ? (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}>
                    <UserProductList product={product} buyPopup={buyPopup} setBuyPopup={setBuyPopup} />
                </div>
            ) : null}
            <div style={{ justifyContent: "center", display: "flex", flexDirection: "column" }} onClick={openPopup}>
                <img src={`http://127.0.0.1:4000/${product.image}`} alt="" style={{ borderRadius: "10px", border: "1px solid gray", width: "130px", height: "130px" }} />
                <div className='w-full flex justify-center font-bold'>{product.name}</div>
            </div>
            <div>
            </div>
        </div >
    )
}

export default ProductListView
