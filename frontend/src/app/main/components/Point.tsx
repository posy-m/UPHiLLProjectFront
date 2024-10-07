
import React from 'react';

interface PointDisplayProps {
    points: number;
}

const Point: React.FC<PointDisplayProps> = ({ points }) => {
    return (
        <div style={{
            padding: '10px 0',
            fontSize: '20px',
            fontWeight: 'bold',
        }}>
            포인트: {points}P
        </div>
    );
};

export default Point;
