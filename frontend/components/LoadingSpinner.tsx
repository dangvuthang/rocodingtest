import { FC } from "react";

interface LoadingSpinnerProps {}

const LoadingSpinner: FC<LoadingSpinnerProps> = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
