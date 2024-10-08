

import React from 'react';

interface NicnameProps {
    nickname: string;
}

const Nicname: React.FC<NicnameProps> = ({ nickname }) => {
    return (
        <div style={{
            padding: '5px 15px',
            fontSize: '15px',
            fontWeight: 'bold',
        }}>
            {nickname ? `${nickname}님 환영합니다!` : '로그인 중...'}
        </div>
    );
};

export default Nicname;
