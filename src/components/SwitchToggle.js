import React from "react";

function SwitchToggle({ switchOn, onToggle }) {
  return (
    <div
      className={`transition duration-500 delay-50 ease-in-out mx-2 h-8 w-16 rounded-full ${
        switchOn ? "bg-green-600" : "bg-red-600"
      } shadow-md relative`}
      onClick={onToggle}
    >
      <div
        className={`transition duration-500 ease-in-out h-8 w-8 bg-gray-200 rounded-full absolute top-0 ${
          switchOn ? "right-0" : "left-0"
        }`}
      ></div>
    </div>
  );
}

export default SwitchToggle;
