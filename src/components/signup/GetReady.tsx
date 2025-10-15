import React from "react";

const GetReady = () => {
  return (
    <div className="flex-1 flex flex-col px-2 py-10 justify-center items-center text-black bg-white w-full">
      <h1 className="text-xl md:text-2xl  mb-3 font-bold">
        Ready to Innovate?
      </h1>
      <p className="my-2 text-sm text-center text-black">
        Join thousands of educators and innovators who are already making a
        difference. Your ideas have the power to shape the future of learning.
      </p>
      <button className="bg-brand-red mt-4 text-white rounded font-semibold text-xs py-3 px-7 tracking-wide cursor-pointer transition-all duration-300 hover:bg-btn-primary-hover">
        Get Started Today
      </button>
    </div>
  );
};

export default GetReady;
