import React from 'react'
import styled from './add.module.css';
import styled2 from '././adminAvatar.module.css'
function AddBox({ setIsPopup }: { setIsPopup: any }) {
    const openPopup = () => {
        setIsPopup(true);
    }
    return (
        <div className={styled2.avatar_wrap} onClick={openPopup}>
            <div className={styled2.avatar_img}>
                <span className={styled.add_btn}></span>
            </div>
            <span className={styled.avatar_btn}>추가하기</span>
        </div >
    )
}

export default AddBox
