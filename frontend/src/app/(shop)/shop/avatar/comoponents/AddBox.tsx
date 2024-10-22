import React from 'react'
import styled from './add.module.css';
import styled2 from '././adminAvatar.module.css'
function AddBox({ setIsPopup, modifyPopup }) {
    const openPopup = () => {
        setIsPopup(true);
    }
    return (
        <div className={styled2.avatar_wrap} onClick={openPopup}>
            <div className={styled2.avatar_img}>
                <span className={styled.add_btn}>
                </span>
            </div>
            <div className={styled.avatar_btn}>
                <span>추가하기</span>
            </div>
        </div >
    )
}

export default AddBox
