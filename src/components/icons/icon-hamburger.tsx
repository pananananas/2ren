// Ham7.tsx
import React, { useState } from "react";

const HamIcon: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <svg
      className={`h-20 w-20 cursor-pointer ${isActive ? "rotate-45" : ""}`}
      style={{
        transition: "transform 400ms",
      }}
      viewBox="0 0 100 100"
      onClick={toggleClass}
    >
      <path
        className={`stroke-current text-black ${isActive ? "ham7 active top" : "ham7"}`}
        d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
        strokeWidth={5.5}
        fill="none"
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
          strokeDasharray: isActive ? "17 82" : "40 82",
          strokeDashoffset: isActive ? "-62px" : "0",
        }}
      />
      <path
        className={`stroke-current text-black ${isActive ? "ham7 active middle" : "ham7"}`}
        d="m 70,50 h -40"
        strokeWidth={5.5}
        fill="none"
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
          strokeDasharray: isActive ? "40 111" : "40 111",
          strokeDashoffset: isActive ? "23px" : "0",
        }}
      />
      <path
        className={`stroke-current text-black ${isActive ? "ham7 active bottom" : "ham7"}`}
        d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
        strokeWidth={5.5}
        fill="none"
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
          strokeDasharray: isActive ? "40 161" : "40 161",
          strokeDashoffset: isActive ? "-83px" : "0",
        }}
      />
    </svg>
  );
};

export default HamIcon;
