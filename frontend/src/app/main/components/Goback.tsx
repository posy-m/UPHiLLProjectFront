
import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';

interface GobackProps {
    onClick: () => void;
}

const Goback: React.FC<GobackProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                right: '20px',
                top: '70%',
                transform: 'translateY(-50%)',
                padding: '10px',
                zIndex: 10,
                background: 'white',
                borderRadius: '50%',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}>
            <FaLocationArrow size={15} color='#000' />
        </button>
    );
};

export default Goback;
