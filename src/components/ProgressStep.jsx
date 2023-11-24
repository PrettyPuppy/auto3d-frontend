import React from 'react';

const ProgressStep = ({ isCompleted, isCurrent, label }) => {
  let statusSymbol = '⚪'; // default symbol for not started
  if (isCompleted) {
    statusSymbol = '✅'; // symbol for completed
  } else if (isCurrent) {
    statusSymbol = '🔵'; // symbol for in progress
  }

  return (
    <div className="step">
      <div className="status-symbol">{statusSymbol}</div>
      <div className="step-label">{label}</div>
    </div>
  );
};

export default ProgressStep;
