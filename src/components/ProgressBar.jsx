import React from 'react';
import ProgressStep from './ProgressStep';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={`connector ${index <= currentStep ? 'completed' : ''}`}></div>}
          <ProgressStep
            isCompleted={index < currentStep}
            isCurrent={index === currentStep}
            label={step}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
