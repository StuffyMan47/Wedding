import React from 'react';

interface CircleProps {
    colors: string[];
}

const CircleLine: React.FC<CircleProps> = ({ colors }) => {
    const circleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
    };

    return (
        <div style={{
            width: `${(colors.length + 1) * 40}px`,
            height: '80px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }} className="self-center">
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                        ...circleStyle,
                        position: "absolute",
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