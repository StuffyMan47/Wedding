import React from 'react';

interface CircleProps {
    colors: string[];
}

const CircleLine: React.FC<CircleProps> = ({ colors }) => {
    const circleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        position: 'absolute',
    };

    const containerStyle = {
        width: `${ (colors.length+1) * 40}px`,
        height: '80px',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={containerStyle}>
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                        ...circleStyle,
                        backgroundColor: color,
                        left: `${index * 40}px`,
                        zIndex: index + 1,
                    }}
                />
            ))}
            </div>
    );
};

export default CircleLine;