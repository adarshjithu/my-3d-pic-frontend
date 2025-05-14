import React from "react";

function PageLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#161A1D]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-[3px] border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"></div>
      </div>
    </div>
  );
}

export default PageLoading;
