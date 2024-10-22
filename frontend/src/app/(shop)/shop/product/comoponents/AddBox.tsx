import React from 'react'
import styled from './add.module.css';
import styled2 from './product.module.css'
function AddBox({ setIsPopup }: { setIsPopup: any }) {
    const openPopup = () => {
        setIsPopup(true);
    }
    return (
        <div className={styled2.product_wrap} onClick={openPopup}>
            <div className={styled2.product_img}>
                <span className={styled.add_btn}></span>
            </div>
            {/* <div className={styled.product_desc}>
            </div> */}
            <span className={styled.add_text}>추가하기</span>
        </div >
    )
}

export default AddBox
