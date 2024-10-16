import React, { useState } from 'react'
import Ttext from '../components/Ttext'
import styld from './style.module.css'

const FooterMomWith = ({onClick}:{onClick:any}) => {
    

      // 로그아웃할때
  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (response.ok) {
      alert('로그아웃 되었습니다.');
      // 로그아웃 후 페이지 리다이렉션 (예: 로그인 페이지로)
      window.location.href = '/login';
    } else {
      alert('로그아웃 실패.');
    }
  };

      // 회원탈퇴할때
  const DeleteAccount = async () => {
    const confirmed = confirm('정말로 회원탈퇴를 하시겠습니까?');
    if (confirmed) {
      const response = await fetch('/api/delete-account', {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('회원탈퇴가 완료되었습니다.');
        // 회원탈퇴 후 리다이렉션 (예: 메인 페이지로)
        window.location.href = '/';
      } else {
        alert('회원탈퇴 실패.');
      }
    }
  };

  
  return (
    <div className={styld.footer}>
      <div className={styld.footerContent}> {/* 가로 정렬을 위한 div 추가 */}
        <Ttext className='mr-1' onClick={handleLogout} >로그아웃</Ttext> 
        | 
        <Ttext className='ml-1' onClick={DeleteAccount} >회원탈퇴</Ttext>
      </div>
    </div>
  )
}

export default FooterMomWith
