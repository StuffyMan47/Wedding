import React from 'react';

const CircleLine: React.FC = () => {
    const circleStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        position: 'absolute',
    };

    const firstCircleStyle = {
        ...circleStyle,
        backgroundColor: '#DDCEB1',
        left: '0',
        zIndex: 1,
    };

    const secondCircleStyle = {
        ...circleStyle,
        backgroundColor: '#D2B990',
        left: '25px',
        zIndex: 2,
    };

    const thirdCircleStyle = {
        ...circleStyle,
        backgroundColor: '#949B8B',
        left: '50px',
        zIndex: 3,
    };

    const fourthCircleStyle = {
        ...circleStyle,
        backgroundColor: '#455646',
        left: '75px',
        zIndex: 4,
    };

    const fifthCircleStyle = {
        ...circleStyle,
        backgroundColor: '#1D1D1B',
        left: '100px',
        zIndex: 5,
    };

    const containerStyle = {
        width: '100px',
        height: '50px',
        position: 'relative',
    };

    return (
        <div style={containerStyle}>
            <div style={firstCircleStyle} />
            <div style={secondCircleStyle} />
            <div style={thirdCircleStyle} />
            <div style={fourthCircleStyle} />
            <div style={fifthCircleStyle} />
        </div>
    );
};

export default CircleLine;