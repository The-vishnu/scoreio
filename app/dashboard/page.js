"use client";

import React, { useMemo, useEffect, useState } from "react";
import axios from 'axios'
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
  const [resuemData, setResumeData] = useState(null);
  const [missingSection, setMissingData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("ats-data");

    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("parsed: ", parsed.ats_score);
      setResumeData(parsed);

      setMissingData(parsed.missing_keywords_and_missing_sections || []);
    }
  }, []);

  console.log("Resuemdata: ", resuemData);
  console.log("Missing sectino: ", missingSection);

  useEffect(() => {
    if (!resuemData) return;

    console.log("🎯 FINAL RESUME DATA:", resuemData);
    console.log("ATS RAW:", resuemData.ats_score);
    console.log("TYPE:", typeof resuemData.ats_score);

    setMissingData(resuemData.missing_keywords_and_missing_sections || []);
  }, [resuemData]);

  if (!resuemData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading dashboard…
      </div>
    );
  }




  console.log("ATS RAW:", resuemData.ats_score);
  console.log("TYPE:", typeof resuemData.ats_score);
  // const ATSscore = 90
  // const GramerScore = 80
  // const HiringChances = 70
  const ATSscore = resuemData?.ats_score ?? 0;
  const GramerScore = resuemData?.grammar_score ?? 0;
  const HiringChances = resuemData?.hiring_chances ?? 0;




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

  const ATSdonutData = useMemo(() => ({
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [ATSscore, 100 - ATSscore],
        backgroundColor: ["#fca5a5", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  }), [ATSscore]);

  const ATSdonutOptions = {
    cutout: "70%",
    plugins: { tooltip: { enabled: true }, legend: { display: false } },
  };

  const GamerdonutData = useMemo(() => ({
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [GramerScore, 100 - GramerScore],
        backgroundColor: ["#86efac", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  }), [GramerScore]);

  const GramerdonutOptions = {
    cutout: "70%",
    plugins: { tooltip: { enabled: true }, legend: { display: false } },
  };

  const HiringdonutData = useMemo(() => ({
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [HiringChances, 100 - HiringChances],
        backgroundColor: ["#fde68a", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  }), [HiringChances]);

  const HiringdonutOptions = {
    cutout: "70%",
    plugins: { tooltip: { enabled: true }, legend: { display: false } },
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full h-screen rounded-2xl flex justify-center items-start py-3">

      <div className="flex flex-col gap-2 w-[95%] max-w-6xl">

        {/* ⭐ DONUT ROW (3 donuts, perfect spacing) */}
        <div className="flex flex-wrap justify-center gap-8 bg-slate-50 p-6 rounded-2xl">

          {/* {[1, 2, 3].map((item) => (
            <div key={item} className={`relative w-40 h-40`}>
              <Doughnut data={donutData} options={donutOptions} />

              <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-xl text-gray-800">
                {ATSscore}%
                <span className="text-xs text-gray-500 font-normal mt-1">
                  ATS Score
                </span>
              </div>
            </div>
          ))} */}

          <div className={`relative w-40 h-40 bg-red-100 rounded-2xl p-4`}>
            <Doughnut data={ATSdonutData} options={ATSdonutOptions} />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-[22px] text-xs opacity-70 font-bold tracking-wide text-gray-800">
              {ATSscore}%
              <span className="text-xs text-gray-500 font-normal mt-1">
                ATS Score
              </span>
            </div>
          </div>

          <div className={`relative w-40 h-40 bg-yellow-100 rounded-2xl p-4`}>
            <Doughnut data={HiringdonutData} options={HiringdonutOptions} />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-[22px] text-xs opacity-70 font-bold tracking-wide text-gray-800">
              {HiringChances}%
              <span className="text-xs text-gray-500 font-normal mt-1">
                Hiring Chances
              </span>
            </div>
          </div>

          <div className={`relative w-40 h-40 bg-green-100 rounded-2xl p-4`}>
            <Doughnut data={GamerdonutData} options={GramerdonutOptions} />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-[22px] text-xs opacity-70 font-bold tracking-wide text-gray-800">
              {GramerScore}%
              <span className="text-xs text-gray-500 font-normal mt-1">
                Grmaer Score
              </span>
            </div>
          </div>
        </div>

        {/* ⭐ Horizontal Bar Section */}
        <div className=" flex flex-row gap-3.5">
          <div className="bg-slate-50 w-[50%] rounded-2xl p-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Profile Strength Breakdown</h2>

              <div className="w-full h-72">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 w-[50%] rounded-2xl p-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Missing KeyWord & Sections</h2>

              <div className="w-full h-72 grid grid-cols-3 gap-4">
                {missingSection.map((itme, index) => (
                  <p key={index} className="bg-sky-200 w-fit h-fit text-sm font-bold text[15px] opacity-70 rounded-2xl p-2.5">{itme}</p>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
