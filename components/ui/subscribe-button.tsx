import React from "react";
import { Button } from "./button";

const SubscribeButton = () => {
  return (
    <Button
      variant="outline"
      className="text-orange-500 hover:text-white flex gap-2"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="inline-block h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.93942 8.64645L3.69217 7.89737L3.69217 7.89737L3.69216 7.89737C1.33896 7.11296 0.162354 6.72076 0.162354 6C0.162354 5.27924 1.33896 4.88704 3.69218 4.10264L12.2053 1.26491C13.8611 0.712985 14.689 0.437021 15.126 0.874037C15.5631 1.31105 15.2871 2.13895 14.7352 3.79474L11.8974 12.3079L11.8974 12.3079L11.8974 12.3079C11.113 14.6611 10.7208 15.8377 10.0001 15.8377C9.27932 15.8377 8.88711 14.6611 8.10271 12.3079L7.35363 10.0607L11.7072 5.70711C12.0977 5.31659 12.0977 4.68342 11.7072 4.2929C11.3167 3.90237 10.6835 3.90237 10.293 4.2929L5.93942 8.64645Z"
          fill="currentColor"
        />
      </svg>
      Subscribe
    </Button>
  );
};

export default SubscribeButton;
