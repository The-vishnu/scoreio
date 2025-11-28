"use client";

import React, { useMemo } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function DonutChart() {
  const ATSscore = 80;

  // ⭐ FIXED: 5 colors for 5 labels
  const barData = {
    labels: ["Skills", "Projects", "Strength", "Leetcode", "GitHub Activity"],
    datasets: [
      {
        data: [30, 40, 20, 70, 90],
        backgroundColor: [
          "#1f2937",
          "#374151",
          "#4b5563",
          "#6b7280",
          "#9ca3af"
        ],
        borderRadius: 6,
        barThickness: 28,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, color: "#6b7280" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#374151", font: { weight: "600" } },
        grid: { display: false },
      },
    },
  };

  const donutData = useMemo(() => ({
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [ATSscore, 100 - ATSscore],
        backgroundColor: ["#60a5fa", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  }), [ATSscore]);

  const donutOptions = {
    cutout: "70%",
    plugins: { tooltip: { enabled: true }, legend: { display: false } },
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full h-screen rounded-2xl flex justify-center items-start py-10">

      <div className="flex flex-col gap-8 w-[95%] max-w-6xl">

        {/* ⭐ DONUT ROW (3 donuts, perfect spacing) */}
        <div className="flex flex-wrap justify-center gap-8 bg-slate-50 p-6 rounded-2xl">

          {[1, 2, 3].map((item) => (
            <div key={item} className="relative w-40 h-40">
              <Doughnut data={donutData} options={donutOptions} />

              <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-xl text-gray-800">
                {ATSscore}%
                <span className="text-xs text-gray-500 font-normal mt-1">
                  ATS Score
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* ⭐ Horizontal Bar Section */}
        <div className="bg-slate-50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Profile Strength Breakdown</h2>

          <div className="w-full h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

      </div>
    </div>
  );
}
