

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
        }}>
            {nickname ? `${nickname} 님` : '로그인 중...'}
        </div>
    );
};

export default Nicname;
