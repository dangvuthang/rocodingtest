import * as React from "react";
export default function Loadder()  {
    return(
    
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full">    
        <div className="flex flex-col justify-center items-center space-x-1 text-sm text-gray-700">
        <div>
        <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 70"
              enable-background="new 0 0 100 70"
              xmlSpace="preserve"
              width="60px"
              fill='navy'
            >
              <circle stroke="none" cx="20" cy="25" r="8">
                <animate attributeName="cy" dur="1s" values="10;35;10" repeatCount="indefinite" begin="0.1"/>
              </circle>
              <circle stroke="none" cx="50" cy="25" r="8">
                <animate attributeName="cy" dur="1s" values="10;35;10" repeatCount="indefinite" begin="0.2"/>
              </circle>
              <circle stroke="none" cx="80" cy="25" r="8">
                <animate attributeName="cy" dur="1s" values="10;35;10" repeatCount="indefinite" begin="0.3"/>
              </circle>
        </svg>
        </div>
            <div>The browser is currently serving your data. Please wait a minute !</div>
        </div>
    </div>
    );
}
