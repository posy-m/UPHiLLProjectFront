

import React from 'react';

interface ElevationDisplayProps {
    elevation: number;
}

const Altitude: React.FC<ElevationDisplayProps> = ({ elevation }) => {
    return (
        <div style={{ 
            fontSize: '16px', // 글자 크기 조정
            fontWeight: 'bold', // 강조
            // marginLeft: '20px'
            }}>
            {Math.ceil(elevation) + "M"}
        </div>
    );
};

export default Altitude;
