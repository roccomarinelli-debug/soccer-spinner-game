'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface SpinnerProps {
  tricks: string[];
  spinning: boolean;
  result: string;
  spinDuration: number;
  finalRotation: number;
}

const Spinner: React.FC<SpinnerProps> = ({ tricks, spinning, result, spinDuration, finalRotation }) => {
  const numSegments = tricks.length;
  const segmentAngle = 360 / numSegments;
  const spinnerSize = 600;
  const radius = spinnerSize / 2;

  const getSegmentPath = (index: number) => {
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;

    const startX = (radius + radius * Math.cos(startAngle * Math.PI / 180)).toFixed(2);
    const startY = (radius + radius * Math.sin(startAngle * Math.PI / 180)).toFixed(2);
    const endX = (radius + radius * Math.cos(endAngle * Math.PI / 180)).toFixed(2);
    const endY = (radius + radius * Math.sin(endAngle * Math.PI / 180)).toFixed(2);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
  };

  // Soccer club inspired colors (12 distinct colors)
  const segmentColors = [
    '#DA291C', // Manchester United (Red)
    '#005C99', // Real Madrid (White/Blue)
    '#A50044', // FC Barcelona (Red/Blue)
    '#000000', // Bayern Munich (Black/Red)
    '#003399', // Chelsea (Blue)
    '#00529F', // Manchester City (Sky Blue)
    '#008753', // Liverpool (Red/Green)
    '#FFC72C', // Borussia Dortmund (Yellow/Black)
    '#004D40', // Juventus (Black/White)
    '#007ACD', // Paris Saint-Germain (Blue/Red)
    '#F4B400', // Arsenal (Red/White)
    '#003366', // Inter Milan (Blue/Black)
  ];

  return (
    <Box
      sx={{
        width: spinnerSize,
        height: spinnerSize,
        borderRadius: '50%',
        border: '5px solid #3f51b5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 'auto',
        my: 4,
        position: 'relative',
        overflow: 'hidden',
        transform: spinning ? `rotate(${finalRotation}deg)` : 'rotate(0deg)',
        transition: spinning ? `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1.0)` : 'none',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.3)', // Added shadow for 3D effect
      }}
    >
      <svg width={spinnerSize} height={spinnerSize} viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}>
        {tricks.map((trick, index) => (
          <g key={index}>
            <path
              d={getSegmentPath(index)}
              fill={segmentColors[index % segmentColors.length]}
              stroke="#fff"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>

      {/* HTML Text Overlays */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Allow clicks to pass through to the spinner
        }}
      >
        {tricks.map((trick, index) => {
          const textRotation = index * segmentAngle + segmentAngle / 2; // Center of the segment

          return (
            <Typography
              key={index}
              variant="body1"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: '50% 50%', // Rotate around the center of the element
                transform: `translate(-50%, -50%) rotate(${textRotation}deg) translateX(${radius * 0.85}px) rotate(90deg)`, // Rotate and move outwards, then rotate text vertically
                width: radius * 0.8, // Limit text width
                textAlign: 'center',
                color: ['#000000', '#004D40', '#003366', '#DA291C', '#00529F', '#007ACD'].includes(segmentColors[index % segmentColors.length]) ? '#FFFFFF' : '#333',
                fontSize: '18px', // Increased font size
                fontWeight: 'bold',
                whiteSpace: 'normal', // Allow text to wrap
                wordBreak: 'break-word', // Break long words
                lineHeight: 1.2,
                pointerEvents: 'none', // Ensure text doesn't interfere with spinner interaction
              }}
            >
              {trick}
            </Typography>
          );
        })}
      </Box>

      {/* Overlay for result display */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          width: 180,
          height: 180,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '4px solid #3f51b5',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
          zIndex: 5,
        }}
      >
        {spinning ? (
          <Typography variant="h4" color="primary">Spinning...</Typography>
        ) : (
          <Typography variant="h4" sx={{ textAlign: 'center', p: 1 }}>{result || "Spin to play!"}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Spinner;