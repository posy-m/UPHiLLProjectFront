import React, { useEffect, useState } from 'react'
import Ttext from '../components/Ttext'
import Modal from './Modal'
import styld from './style.module.css'
import customAxios from '@/lib/customAxios'



const FooterMomWith = ({onClick}:{onClick:any}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);




      // 로그아웃할때
  const handleLogout = async () => {
    const response = await customAxios.post('/user/logout');
    console.log(response)

    if (response) {
      console.log('로그아웃 되었습니다.');
      // 로그아웃 후 페이지 리다이렉션 (예: 로그인 페이지로)
      window.location.href = '/';
    } else {
      console.log('로그아웃 실패.');
    }
  };

      // 회원탈퇴할때
  const DeleteAccount = async () => {
    try {
    await customAxios.delete('/user/delete');
        console.log('회원탈퇴가 완료되었습니다.');
        // 회원탈퇴 후 리다이렉션 (예: 로그인 페이지로)
        window.location.href = '/';
      }
       catch (e) {
        console.log('회원탈퇴 실패.');
      }
  };

  return (
    <div className={styld.footer}>
      <div className={styld.footerContent}> {/* 가로 정렬을 위한 div 추가 */}
        <Ttext className='mr-1' onClick={() => setShowLogoutModal(true)} >로그아웃</Ttext> 
        | 
        <Ttext className='ml-1' onClick={() => setShowDeleteModal(true)} >회원탈퇴</Ttext>

        {showLogoutModal && (
          <Modal
          onClick=''
          className=''
            title="로그아웃 확인"
            message="정말 로그아웃하시겠습니까?"
            onConfirm={() => {
              handleLogout();
              setShowLogoutModal(false);
            }}
            onCancel={() => setShowLogoutModal(false)}
          />
        )}

        {showDeleteModal && (
          <Modal
          onClick=''
          className=''
            title="회원탈퇴 확인"
            message="정말로 회원탈퇴를 하시겠습니까?"
            onConfirm={() => {
              DeleteAccount();
              setShowDeleteModal(false);
            }}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default FooterMomWith
