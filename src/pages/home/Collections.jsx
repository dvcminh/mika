import React from "react";

const Collections = () => {
  return (
    <div className="bg-[url(/images/collection-bg.png)] bg-contain bg-center bg-no-repeat px-28 mt-12">
      <div className="h-[700px] flex max-md:flex-col justify-between items-center">
        <div className="md:w-1/2"></div>
        <div className="md:w-1/2">
          <img src="/images/zara-logo.png" alt="" />
          <p className="text-white mt-12 text-xl w-[70%]">
            Lustrous yet understated. The new evening wear collection
            exclusively offered at the reopened Giorgio Armani boutique in Los
            Angeles.
          </p>
          <button className="bg-white px-4 py-2 text-Black font-semibold mt-12 rounded-md hover:bg-slate-500 hover:text-white">See Collection</button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
