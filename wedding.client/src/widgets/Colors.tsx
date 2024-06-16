import React from 'react';

interface CircleProps {
    colors: string[];
}

const CircleLine: React.FC<CircleProps> = ({ colors }) => {
    const circleStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        position: 'absolute',
    };

    const containerStyle = {
        width: `${colors.length * 25}px`,
        height: '50px',
        position: 'relative',
    };

    return (
        <div style={containerStyle}>
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                        ...circleStyle,
                        backgroundColor: color,
                        left: `${index * 25}px`,
                        zIndex: index + 1,
                    }}
                />
            ))}
        </div>
    );
};

export default CircleLine;