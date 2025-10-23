import React from "react";


const CardItem = ({ icon: Icon, title, value, change, bgColor }) => (
  <div className=" rounded-lg flex-1/4 shadow-lg p-6 border border-slate-700 hover:shadow-xl transition hover:border-slate-600">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 font-medium text-sm mb-3">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-white">
            {value.toLocaleString()}
          </h3>
        </div>
        <p className="text-slate-400 text-xs mt-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium gap-
                bg-emerald-900 text-emerald-300
              `}
          >
            {change} Created Today
          </span>
        </p>
      </div>
      <div className={`${bgColor} rounded-full p-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default CardItem;
