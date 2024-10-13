

import React from 'react';

interface NicnameProps {
    nickname: string;
}

const Nicname: React.FC<NicnameProps> = ({ nickname }) => {
    return (
        <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'right', // 오른쪽 정렬
            // padding: '5px 15px',
            // fontSize: '15px',
            // fontWeight: 'bold',
        }}>
            {nickname ? `${nickname}님 환영합니다!` : '로그인 중...'}
        </div>
    );
};

export default Nicname;
