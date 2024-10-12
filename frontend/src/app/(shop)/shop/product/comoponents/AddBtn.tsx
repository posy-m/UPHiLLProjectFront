import { ReactNode } from 'react';
import styled from './add.module.css';

const AddBtn = ({setIsPopup, isPopup, modifyPopup}: {setIsPopup : Function, isPopup: boolean, modifyPopup: boolean}) => {
  return (
    <span 
      className={styled.add_btn} 
      onClick={() => setIsPopup(!isPopup)} 
      style={{display: modifyPopup || isPopup ? 'none' : 'block'}}
    >
    </span>
  )
}

export default AddBtn;