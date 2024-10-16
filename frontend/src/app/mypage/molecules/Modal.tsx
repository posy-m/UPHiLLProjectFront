import React from 'react';
import styld from './style.module.css';
import Button from '../components/Button';

const Modal = ({ title, message,className, onClick,onConfirm,onCancel }: { 
    title: string; 
    message: string; 
    className: string;
    onClick:any;
    onConfirm: () => void; 
    onCancel: () => void; 
}) => {
    return (
    <div className={styld.modalOverlay}>
        <div className={styld.modalContent}>
            <h2>※ {title} ※</h2>
            <p className={styld.messages}>{message}</p>
        <div className={styld.modalActions}>
            <Button className={className} onClick={onConfirm} title='확인'/>
            <Button className={className} onClick={onCancel} title='취소'/>
            </div>
        </div>
    </div>
    );
};

export default Modal;