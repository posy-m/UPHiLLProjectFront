import React from 'react'
import Altitude from './Altitude';
import Point from './Point';
import Nicname from './Nicname';

// props 타입 정의
interface FootPoinNickAltProps {
    elevation: number;
    points: number;
    nickname: string;
}

const FootPoinNickAlt: React.FC<FootPoinNickAltProps> = ({ elevation, points, nickname }) => {
    return (
        <div style={{
            position: 'fixed', // 하단에 고정
            bottom: "80px", // Footerbar 위에 위치
            width: '100%',
            backgroundColor: '#14532d', // 배경 흰색
            color: 'rgb(248, 255, 251)',
            display: 'flex',
            justifyContent: 'space-around', // 요소들을 좌우 균등하게 배치
            alignItems: 'center', // 세로 가운데 정렬
            padding: '20px ', // 패딩
            boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
            zIndex: 10, // 지도 위로 나오도록 zIndex 설정
            fontSize: '1.2rem', // 텍스트 크기 조정
            boxSizing: 'border-box',
        }}>
            {/* 왼쪽에 고도값 */}
            <Altitude elevation={elevation} /> 

            {/* 가운데 포인트 */}
            <Point points={points} />

            {/* 오른쪽에 닉네임 */}
            <Nicname nickname={nickname} />

            <style jsx>{`
                @media (max-width: 768px) {
                    div {
                        padding: 15px 20px; // 작은 화면에서는 패딩을 줄임
                        font-size: 1rem; // 텍스트 크기를 줄임
                    }
                }
                @media (max-width: 260px) {
                    div {
                        flex-direction: column; // 아주 작은 화면에서는 세로로 정렬
                        padding: 10px 15px; // 패딩을 더 줄임
                    }
                }
            `}</style>
            
        </div>
    );
}

export default FootPoinNickAlt
