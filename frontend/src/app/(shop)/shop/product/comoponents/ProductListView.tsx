import React, { useEffect, useState } from 'react'
import UserProductList from './UserProductBuy';

const ProductListView = ({ product, refetch }: { product: any, refetch: Function }) => {
    const [clickImg, setClickImg] = useState<string>("null")
    const [buyPopup, setBuyPopup] = useState(false);


    const openPopup = () => {
        console.log(product.id, "fsdjfkdsjfksdjfkd")
        setBuyPopup(true)
        setClickImg(product.image)
    }

    useEffect(() => {
        console.log(clickImg);
    }, [clickImg])

    return (
        <div>
            {buyPopup ? (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}>
                    <UserProductList product={product.id} buyPopup={buyPopup} setBuyPopup={setBuyPopup} image={clickImg} />
                </div>
            ) : null}
            <div style={{ justifyContent: "center", display: "flex", flexDirection: "column" }} onClick={openPopup}>
                <img src={`https://uphillmountain.store/back${product.image}`} alt="" style={{ borderRadius: "10px", border: "1px solid gray", width: "130px", height: "130px" }} />
                <div className='w-full flex justify-center font-bold text-center leading-5'>{product.name}
                    <br />
                    {product.price} P
                </div>
                {/* <div className='w-full flex justify-center font-bold'>{product.price} P</div> */}
            </div>
            <div>
            </div>
        </div >
    )
}

export default ProductListView
