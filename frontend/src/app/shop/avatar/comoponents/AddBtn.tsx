import { ReactNode } from 'react';
import styled from './add.module.css';

const AddBtn = ({setIsPopup, isPopup}: {setIsPopup : Function, isPopup: boolean}) => {
  return (
    <span className={styled.add_btn} onClick={() => setIsPopup(!isPopup)} style={{display: isPopup ? 'none' : 'block'}}>
    </span>
  )
}

export default AddBtn;