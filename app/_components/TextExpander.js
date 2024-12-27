"use client";

import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log(children); //string
  // console.log(children.split(" ")); //Convert string to array
  // console.log(children.split(" ").slice(0, 40)); // extract 0 to 39 elements from array
  // console.log(children.split("").slice(0, 40).join(" ")); //join converts array into string

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
