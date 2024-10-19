import React from 'react';

const CreditScoreGraph = ({ score, theme }) => {
  // Define color segments for the score ranges based on theme
  const getSegmentColor = (score) => {
    if (score < 580) return theme === 'dark' ? '#FF6347' : '#FF7F50'; // Poor
    if (score < 670) return theme === 'dark' ? '#FFA500' : '#FFD700'; // Fair
    if (score < 740) return theme === 'dark' ? '#FFD700' : '#98FB98'; // Good
    if (score < 800) return theme === 'dark' ? '#90EE90' : '#7FFF00'; // Very Good
    return theme === 'dark' ? '#32CD32' : '#006400'; // Excellent
  };

  const getArrowPosition = (score) => {
    // Map score range (300-850) to angle range (0-180 degrees)
    const minScore = 300;
    const maxScore = 850;
    const angle = ((score - minScore) / (maxScore - minScore)) * 180; // Map score to angle
    return {
      x: 100 + 90 * Math.cos((angle * Math.PI) / 180), // Calculate x position
      y: 100 - 90 * Math.sin((angle * Math.PI) / 180), // Calculate y position
    };
  };

  const { x, y } = getArrowPosition(score);

  return (
    <svg width="300" height="150" viewBox="0 0 300 150">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: getSegmentColor(300), stopOpacity: 1 }} />
          <stop offset="20%" style={{ stopColor: getSegmentColor(579), stopOpacity: 1 }} />
          <stop offset="40%" style={{ stopColor: getSegmentColor(670), stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: getSegmentColor(740), stopOpacity: 1 }} />
          <stop offset="80%" style={{ stopColor: getSegmentColor(800), stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: getSegmentColor(850), stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M 10,130 A 90,90 0 1,1 290,130"
        fill="url(#gradient)"
        stroke={theme === 'dark' ? '#FFF' : '#000'} // Adjust stroke color based on theme
        strokeWidth="2"
      />
      <line
        x1="150"
        y1="130"
        x2={x}
        y2={y}
        stroke="red"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
          refX="5" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
      </defs>
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
