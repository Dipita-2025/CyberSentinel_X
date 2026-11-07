import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import {
  PieChartComponent,
  LineGraph,
  Cards,
  CriticalTag,
  LiveTag,
  LowTag,
  Tags,
  DefaultTag,
  Button,
} from "../../../components";
import { useSelector } from "react-redux";
import { Brain, Dot, ArrowRight } from "lucide-react";
import PageLayout from "../../../layout/PageLayout";

function Dashboard() {
  const setActivePage = useOutletContext();
  const userData = useSelector((state) => state.auth.userData);
  const cardData = {
    value: "100",
    text: "this",
    color: "text-green-500",
  };

  const dataPie = [
    {
      intencity: "low",
      value: 30,
    },
    {
      intencity: "medium",
      value: 40,
    },
    {
      intencity: "high",
      value: 20,
    },
    {
      intencity: "critical",
      value: 10,
    },
  ];

  const dataLine = [
    { month: "Jan", threats: 100000 },
    { month: "Feb", threats: 3500 },
    { month: "Mar", threats: 2800 },
    { month: "Apr", threats: 5000 },
    { month: "May", threats: 4200 },
    { month: "Jun", threats: 6500 },
    { month: "Jul", threats: 600 },
  ];

  const activeData = [
    {
      id: "INC-1092",
      desc: "DNS tunneling exfiltration signature detected on DB-SRV-04",
      level: "critical",
    },
    {
      id: "INC-1093",
      desc: "Multiple SSH brute-force attempts from unrecognized IP block",
      level: "high",
    },
    {
      id: "INC-1085",
      desc: "Unauthorized AD domain policy change by user svance",
      level: "medium",
    },
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
      {/* live tag */}
      <div className="block xl:hidden">
        <LiveTag />
      </div>

      {/* page content */}
      {/* summary */}
      <div className="w-full bg-(--bg-sec) p-2 md:p-5 border border-(--border) rounded-md flex items-center justify-around gap-5">
        <div className="p-2 bg-[#00f0ff33] border border-(--accent) rounded-md hidden xl:block ">
          <Brain size={35} className="text-(--accent)" />
        </div>
        <div className="w-full">
          <h2 className="text-base text-(--accent) font-semibold mb-4 xl:mb">
            Cognitive SOC Assistant Summary
          </h2>
          <p className="text-md ">
            Detected credential anomalies on 3 internal assets. Autonomous
            isolation block successfully applied to DNS exfiltration vectors
            (Incident INC-1092). Mean Time to Mitigation (MTTM) is down to 42ms.
            System health remains optimal.
          </p>
        </div>
      </div>

      {/* cards */}
      <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
        <div className="w-full">
          <Cards
            header="Active Threat Incidents"
            text="+2 New Critical"
            color="text-(--critical)"
            value="14"
          />
        </div>
        <div className="w-full">
          <Cards
            header="Alert Vol (24h)"
            text="-4.2% Lower"
            color="text-(--green)"
            value="18941"
          />
        </div>
        <div className="w-full">
          <Cards
            header="Mean Time to Defuse"
            text="AI reduction -81%"
            color="text-(--accent)"
            value="12 mins"
          />
        </div>
        <div className="w-full">
          <Cards
            header="Endpoints Enrolled"
            text="All microagents active"
            color="text-(--text)"
            value="3824"
          />
        </div>
      </div>

      {/* charts */}
      <div className="grid xl:grid-cols-[minmax(0,65fr)_minmax(0,35fr)]  gap-6 ">
        {/* line chart and active section */}
        <div className="contents xl:flex xl:min-w-0 xl:flex-col lg:gap-6">
          {/* line chart section */}
          <div className="order-1 w-full self-start rounded-md border border-(--border) bg-(--bg-sec) p-4 flex flex-col gap-4 xl:order-0">
            <h4 className="text-base font-semibold text-(--text)">
              Incident Vol & Risk Trend
            </h4>

            <div className="flex flex-wrap gap-3">
              <CriticalTag text="Incident volume" />
              <DefaultTag text="Risk index" />
              <DefaultTag text="Last 7 Days" />
            </div>

            <LineGraph data={dataLine} />

            <p className="text-xxs text-(--text-sec)">
              May 18 · Mitigated peak · Risk index: 38 (Low)
            </p>
          </div>

          {/* active section */}
          <div className="order-3 w-full self-start rounded-md border border-(--border) bg-(--bg-sec) p-4 xl:order-0 xl:p-6 flex flex-col gap-4">
            <h4 className="text-base text-(--text) font-semibold">
              Active Severity Threats
            </h4>
            {activeData.map((item) => (
              <div className=" p-3 bg-(--bg) border border-(--border) rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md text-(--text-sec) font-bold ">
                    {item.id}
                  </h4>
                  <Tags threatLevel={item.level} />
                </div>
                <p className="text-md text-(--text)">{item.desc}</p>
              </div>
            ))}
            <Button
              className="bg-(--accent-bg)! w-full md:w-40 text-(--text) border! border-(--border) text-md"
              label="Get Started"
              Icon={ArrowRight}
              iconSize={15}
            />
          </div>
        </div>

        {/* pie chart and logs section */}
        <div className="contents xl:flex xl:min-w-0 xl:flex-col xl:gap-5">
          {/* pie chart section */}
          <div className="order-2 w-full self-start rounded-md border border-(--border) bg-(--bg-sec) p-4 xl:order-0">
            <div className="mb-4">
              <h4 className="mb-1 text-base font-semibold text-(--text)">
                Threat Density Share
              </h4>
              <p className="text-xs text-(--text-sec)">
                14 active incidents &bull; Severity distribution
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-[50%] md:w-50">
                <PieChartComponent data={dataPie} />
              </div>

              <div className="flex h-fit w-[50%] flex-col gap-3">
                {dataPie.map((item, index) => (
                  <div key={index}>
                    <Tags
                      threatLevel={item.intencity}
                      text={item.intencity + " \u2022 " + item.value + "%"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* logs section */}
          <div className="order-4 w-full self-start rounded-md border border-(--border) bg-(--bg-sec) p-4 xl:order-0 xl:p-6 flex flex-col gap-4">
            <h4 className="text-base text-(--text) font-semibold">
              System Health Logs
            </h4>
            <div>
              <p className="text-xxs text-(--text-sec)">
                Vulnerability Scanning Hub
              </p>
              <div className="flex h-5 items-center gap-1">
                <Dot size={16} strokeWidth={15} className="shrink-0" />
                <p className="text-md leading-none text-(--text)">Optimized</p>
              </div>
            </div>
            <hr className="text-(--border) h-0.2" />
            <div>
              <p className="text-xxs text-(--text-sec)">
                Microagent Coverage Rate
              </p>
              <div className="flex h-5 items-center gap-1">
                <Dot size={16} strokeWidth={15} className="shrink-0" />
                <p className="text-md leading-none text-(--text)">
                  99.8% Protected
                </p>
              </div>
            </div>
            <hr className="text-(--border) h-0.2" />
            <div>
              <p className="text-xxs text-(--text-sec)">
                Firewall Gateway Isolation
              </p>
              <div className="flex h-5 items-center gap-1">
                <Dot size={16} strokeWidth={15} className="shrink-0" />
                <p className="text-md leading-none text-(--text)">
                  Operational
                </p>
              </div>
            </div>

            <LowTag text="All systems healthy" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Dashboard;
