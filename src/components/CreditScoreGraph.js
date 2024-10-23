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

// export default CreditScoreGraph;import React from 'react';
const CreditScoreGraph = ({ score }) => {
  const getColorForScore = (score) => {
    if (score < 560) return '#FF6F61'; // Very Bad
    if (score < 650) return '#FFA500'; // Bad
    if (score < 700) return '#FFD700'; // Fair
    if (score < 750) return '#7CFC00'; // Good
    return '#008000'; // Excellent
  };

  const calculateAngle = (score) => {
    const minScore = 300;
    const maxScore = 850;
    const angle = ((score - minScore) / (maxScore - minScore)) * 180;
    return angle;
  };

  const drawArc = (score) => {
    const angle = calculateAngle(score);
    const radius = 130;
    const centerX = 200;
    const centerY = 175;

    const x = centerX + radius * Math.cos((180 - angle) * (Math.PI / 180));
    const y = centerY - radius * Math.sin((180 - angle) * (Math.PI / 180));

    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M ${centerX - radius},${centerY} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x},${y}`;
  };

  return (
    <svg width="400" height="300" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6F61" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#008000" />
        </linearGradient>
      </defs>

      <path
        d={drawArc(score)}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      <text
        x="200"
        y="210"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill={getColorForScore(score)}
      >
        {score}
      </text>

      <text x="200" y="240" textAnchor="middle" fontSize="20" fill="#555">
        {score < 560
          ? 'Very Bad'
          : score < 650
          ? 'Bad'
          : score < 700
          ? 'Fair'
          : score < 750
          ? 'Good'
          : 'Excellent'}
      </text>

      {/* Score Range Labels */}
      <text x="30" y="260" fontSize="16" fill="#333">
        300
      </text>
      <text x="110" y="50" fontSize="16" fill="#333">
        560
      </text>
      <text x="290" y="50" fontSize="16" fill="#333">
        650
      </text>
      <text x="370" y="260" fontSize="16" fill="#333">
        850
      </text>
    </svg>
  );
};

export default CreditScoreGraph;
