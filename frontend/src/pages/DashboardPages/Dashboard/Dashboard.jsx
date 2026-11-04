import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import {
  PieChartComponent,
  Header,
  LineGraph,
  Cards,
  Footer,
} from "../../../components";
import { useSelector } from "react-redux";
import { Brain } from "lucide-react";
import PageLayout from "../../../layout/PageLayout";

function Dashboard() {
  const setActivePage = useOutletContext();
  const userData = useSelector((state) => state.auth.userData);
  const cardData = {
    value: "100",
    text: "this",
    color: "text-green-500",
  };

  const data = [
    {
      intencity: "low",
      value: 20,
    },
    {
      intencity: "midium",
      value: 40,
    },
    {
      intencity: "high",
      value: 10,
    },
    {
      intencity: "critical",
      value: 10,
    },
    {
      intencity: "extra",
      value: 50,
    },
  ];

  const dataLine = [
    { month: "Jan", threats: 20 },
    { month: "Feb", threats: 35 },
    { month: "Mar", threats: 28 },
    { month: "Apr", threats: 50 },
    { month: "May", threats: 42 },
    { month: "Jun", threats: 65 },
  ];

  useEffect(() => {
    setActivePage(0);
  }, []);

  return (
    <PageLayout
      heading="Cyber Command Center"
      desc="Comprehensive cognitive threat posture, active cyber metrics, and cognitive mitigation summaries."
      live={true}
    >
      {/* page content */}

      {/* summary */}
      <div className="w-full bg-(--accent-bg) p-2 md:p-5 border border-(--border) rounded-md flex items-center justify-around gap-5">
        <div className="p-2 bg-[#00f0ff33] border border-(--accent) rounded-md hidden xl:block ">
          <Brain size={35} className="text-(--accent)" />
        </div>
        <div className="w-full">
          <h2 className="text-md lg:text-xl text-(--accent) font-semibold mb-3">
            Cognitive SOC Assistant Summary
          </h2>
          <p className="text-xs/4 lg:text-sm/5 text-justify">
            Detected credential anomalies on 3 internal assets. Autonomous
            isolation block successfully applied to DNS exfiltration vectors
            (Incident INC-1092). Mean Time to Mitigation (MTTM) is down to 42ms.
            System health remains optimal.
          </p>
        </div>
      </div>

      {/* cards */}
      <div className="w-full flex justify-center lg:justify-start flex-wrap gap-2 md:gap-5 ">
        <Cards data={cardData} />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </PageLayout>
  );
}

export default Dashboard;
