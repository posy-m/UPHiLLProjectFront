

import React from 'react';

interface ElevationDisplayProps {
    elevation: number;
}

const Altitude: React.FC<ElevationDisplayProps> = ({ elevation }) => {
    return (
        <div style={{ position: 'absolute', zIndex: 2, background: 'white', padding: '15px' }}>
            {Math.ceil(elevation) + "M"}
        </div>
    );
};

export default Altitude;
