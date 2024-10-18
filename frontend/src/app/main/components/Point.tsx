
import React from 'react';

interface PointDisplayProps {
    points: number;
}

const Point: React.FC<PointDisplayProps> = ({ points }) => {
    return (
        <div style={{
            fontSize: '18px', // 글자 크기 조정
            fontWeight: 'bold',
            textAlign: 'center', // 가운데 정렬
            marginLeft:'20px'
        }}>
            포인트 : {points} P
        </div>
    );
};

export default Point;
