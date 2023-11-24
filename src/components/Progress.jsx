import React from "react";
import ProgressBar from "./ProgressBar";

const Progress = ({ steps, currentStep, prevStep, nextStep, totalSteps }) => {
  return (
    <div className="progress-section">
      <ProgressBar steps={steps} currentStep={currentStep} />
    </div>
  );
};

export default Progress;
