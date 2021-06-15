import React from "react";

function ThemedSuspense() {
  return (
    <div className="w-full h-screen p-6 flex justify-center items-center text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <div className="animate-spin w-16 h-16 rounded-full border-4 border-purple-600"></div>
    </div>
  );
}

export default ThemedSuspense;
