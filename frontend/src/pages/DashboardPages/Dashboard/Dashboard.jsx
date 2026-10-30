import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import { PieChartComponent, Header, LineGraph } from "../../../components";
import { useSelector } from "react-redux";

function Dashboard() {
  const setActivePage = useOutletContext();
  const userData = useSelector((state) => state.auth.userData);
  const data = [
    {
      intencity: "low",
      value: 20,
    },
    {
      intencity: "extra",
      value: 80,
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

  const COLORS = ["#1f64ff", "#00c2ff", "#ffaa00", "#ff4545"];
  return (
    <div>
      {/* dashboard header  */}
      <Header
        headeing="Cyber Command Center"
        desc="Comprehensive cognitive threat posture, active cyber metrics, and cognitive mitigation summaries."
      />

      {/* pie chart */}
      <div>
        <PieChartComponent data={data} />
      </div>

      {/* line chart */}
      <LineGraph data={dataLine} />
    </div>
  );
}

export default Dashboard;
