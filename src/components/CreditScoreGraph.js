// import React from 'react';

// const CreditScoreGraph = ({ score, theme }) => {
//   // Define color segments for the score ranges based on theme
//   const getSegmentColor = (score) => {
//     if (score < 580) return '#7A297B'; // Dark Purple for Poor
//     if (score < 670) return '#9C27B0'; // Medium Purple for Fair
//     if (score < 740) return '#BA68C8'; // Light Purple for Good
//     if (score < 800) return '#D1A1E3'; // Very Light Purple for Very Good
//     return '#E1BEE7'; // Pale Purple for Excellent
//   };

//   const getArrowPosition = (score) => {
//     const minScore = 300; // Minimum score
//     const maxScore = 850; // Maximum score
  
//     // Calculate the angle (0 to 180 degrees for scores between minScore and maxScore)
//     const angle = ((score - minScore) / (maxScore - minScore)) * Math.PI; // Convert to radians (0 to π)
  
//     // Calculate x and y positions for the arrow's endpoint
//     const radius = 90; // Radius of the arc
//     const centerX = 150; // Center of the circle (x)
//     const centerY = 130; // Center of the circle (y)
  
//     const x = centerX + radius * Math.cos(angle - Math.PI); // Adjust angle for correct direction
//     const y = centerY + radius * Math.sin(angle - Math.PI); // Adjust angle for correct direction
  
//     return { x, y };
//   };
  

//   const { x, y } = getArrowPosition(score);

//   return (
//     <svg width="300" height="150" viewBox="0 0 300 150">
//       <defs>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" style={{ stopColor: getSegmentColor(0), stopOpacity: 1 }} />
//           <stop offset="20%" style={{ stopColor: getSegmentColor(200), stopOpacity: 1 }} />
//           <stop offset="40%" style={{ stopColor: getSegmentColor(400), stopOpacity: 1 }} />
//           <stop offset="60%" style={{ stopColor: getSegmentColor(600), stopOpacity: 1 }} />
//           <stop offset="80%" style={{ stopColor: getSegmentColor(800), stopOpacity: 1 }} />
//           <stop offset="100%" style={{ stopColor: getSegmentColor(1000), stopOpacity: 1 }} />
//         </linearGradient>
//       </defs>

//       <path
//         d="M 10,130 A 90,90 0 1,1 290,130"
//         fill="url(#gradient)"
//         stroke={theme === 'dark' ? '#FFF' : '#000'}
//         strokeWidth="2"
//       />

//       <line
//         x1="150"
//         y1="130"
//         x2={x}
//         y2={y}
//         stroke="#8E24AA"
//         strokeWidth="2"
//         markerEnd="url(#arrowhead)"
//       />
      

//       <defs>
//         <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
//           <polygon points="0 0, 10 3.5, 0 7" fill="#673AB7" />
//         </marker>
//       </defs>

//       <text x="150" y="140" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
//         {score}
//       </text>

//       {/* Labels for score ranges */}
//       <text x="50" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
//         Poor
//       </text>
//       <text x="125" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
//         Fair
//       </text>
//       <text x="200" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
//         Good
//       </text>
//       <text x="275" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
//         Excellent
//       </text>
//     </svg>
//   );
// };

// export default CreditScoreGraph;


import React from 'react';

const CreditScoreGraph = ({ score, theme }) => {
  // Define color segments for the score ranges based on theme
  const getSegmentColor = (score) => {
    if (score < 580) return '#7A297B'; // Dark Purple for Poor
    if (score < 670) return '#9C27B0'; // Medium Purple for Fair
    if (score < 740) return '#BA68C8'; // Light Purple for Good
    if (score < 800) return '#D1A1E3'; // Very Light Purple for Very Good
    return '#E1BEE7'; // Pale Purple for Excellent
  };

  const calculateArcPath = (score) => {
    const minScore = 300; // Minimum score
    const maxScore = 850; // Maximum score

    // Calculate the proportion of the score within the range
    const scoreRatio = (score - minScore) / (maxScore - minScore);

    // Convert score to angle in radians (0 to π)
    const angle = scoreRatio * Math.PI;

    // Arc parameters
    const startX = 150 + 90 * Math.cos(Math.PI); // Start at the far left
    const startY = 130 + 90 * Math.sin(Math.PI);

    const endX = 150 + 90 * Math.cos(Math.PI - angle); // End point based on score
    const endY = 130 + 90 * Math.sin(Math.PI - angle);

    const largeArcFlag = scoreRatio > 0.5 ? 1 : 0; // Determine if the arc is > 180 degrees

    // Construct the SVG path for the arc
    return `M ${startX},${startY} A 90,90 0 ${largeArcFlag},1 ${endX},${endY} L 150,130 Z`;
  };

  const arcPath = calculateArcPath(score);
  const segmentColor = getSegmentColor(score);

  return (
    <svg width="300" height="150" viewBox="0 0 300 150">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#7A297B', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#9C27B0', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#E1BEE7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Background arc */}
      <path
        d="M 10,130 A 90,90 0 1,1 290,130"
        fill="none"
        stroke="#E0E0E0"
        strokeWidth="2"
      />

      {/* Dynamic filled arc based on score */}
      <path
        d={arcPath}
        fill="url(#gradient)"
        stroke={theme === 'dark' ? '#FFF' : '#000'}
        strokeWidth="2"
      />

      <text x="150" y="140" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
        {score}
      </text>

      {/* Labels for score ranges */}
      <text x="50" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
        Poor
      </text>
      <text x="125" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
        Fair
      </text>
      <text x="200" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
        Good
      </text>
      <text x="275" y="110" fontSize="14" textAnchor="middle" fill={theme === 'dark' ? '#FFF' : '#000'}>
        Excellent
      </text>
    </svg>
  );
};

export default CreditScoreGraph;
