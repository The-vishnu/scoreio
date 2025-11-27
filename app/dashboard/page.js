"use client";
import { react  } from 'react';
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const data = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    datasets: [
      {
        label: "Visitors",
        data: [275, 200, 287, 173, 190],
        backgroundColor: [
          "#1f2937", // dark gray
          "#4b5563", // medium gray
          "#9ca3af", // light gray
          "#d1d5db", // lighter gray
          "#e5e7eb",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%", // this creates the DONUT HOLE
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-gray-100 w-full h-full rounded-2xl justify-center items-center">
      <div className="max-w-xs mx-auto p-4">
        <h2 className="text-lg font-semibold text-center mb-4">
          Visitor Breakdown (Donut Chart)
        </h2>
        <Doughnut data={data} options={options} />
      </div>
      <div className=" flex flex-row gap-1">
        <div className="max-w-xs mx-auto p-4 ">
          <h2 className="text-lg font-semibold text-center mb-4">
            Visitor Breakdown (Donut Chart)
          </h2>
          <Doughnut data={data} options={options} />
        </div>
        <div className="max-w-xs mx-auto p-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            Visitor Breakdown (Donut Chart)
          </h2>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
