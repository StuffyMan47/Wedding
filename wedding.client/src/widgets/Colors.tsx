import React from 'react';

interface CircleProps {
    colors: string[];
}

const CircleLine: React.FC<CircleProps> = ({ colors }) => {
    const circleStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        position: 'absolute',
    };

    const containerStyle = {
        width: `${colors.length * 50}px`,
        height: '100px',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div style={containerStyle}>
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                        ...circleStyle,
                        backgroundColor: color,
                        left: `${index * 50}px`,
                        zIndex: index + 1,
                    }}
                />
            ))}
            </div>
    );
};

export default CircleLine;