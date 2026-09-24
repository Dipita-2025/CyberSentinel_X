import React from "react";
import { Shield, Mail, IvBag, Dot } from "lucide-react";
import {
  ArrowRight,
  CirclePlay,
  CircleCheckBig,
  ShieldCog,
  Network,
  LockKeyhole,
  Users,
  TrendingUp,
  LaptopMinimal,
  ShieldCheck,
  Globe,
  Plus,
  Percent,
} from "lucide-react";
import { Button, HeroCards, Logo } from "../../components";
import { useNavigate } from "react-router";

function Homepage() {
  const navigate = useNavigate();

  // hero cards data
  const cards = [
    {
      icon: ShieldCog,
      heading: "Detect Threats Early",
      text: "Identify suspicious activities using Al and behavioural analysis.",
    },
    {
      icon: Network,
      heading: "Understand the Full Story",
      text: "Correlate events into clear attack stories with explanations.",
    },
    {
      icon: LockKeyhole,
      heading: "Respond Intelligently",
      text: "Adaptive actions monitor, verify, restrict or contain",
    },
    {
      icon: Users,
      heading: "Keep People Productive",
      text: "Handle genuine unusual situations with secure emergency access",
    },
  ];

  // advantages data
  const advantages = [
    {
      text: "Al-Powered Detection",
    },
    {
      text: "Adaptive Response",
    },
    {
      text: "Human Oversight",
    },
    {
      text: "Explainable Insights",
    },
  ];

  // stats details
  const stats = [
    {
      icon: TrendingUp,
      value: "99.9",
      unit: Percent,
      text: "Stystem Uptime",
    },
    {
      icon: LaptopMinimal,
      value: "1284",
      unit: Plus,
      text: "Sessions Monitored",
    },
    {
      icon: ShieldCheck,
      value: "94",
      unit: Percent,
      text: "Threats Detected",
    },
    {
      icon: Globe,
      value: "50",
      unit: Plus,
      text: "Simulated Attacks Scenarios",
    },
  ];

  // footer details
  const footerData = [
    {
      text: "AI",
    },
    {
      text: "CYBERSECURITY",
    },
    {
      text: "TRUST",
    },
    {
      text: "PRIVACY",
    },
    {
      text: "RESILIENCE",
    },
  ];

  // dom
  return (
    <div className="w-full min-h-screen h-full p-5 xl:p-10 bg-[url('/hero-bg.png')] bg-cover bg-left lg:bg-center-right  flex flex-col gap-15 ">
      {/* logo */}
      <Logo />

      {/* hero */}
      <div className="w-full flex flex-col gap-10 lg:gap-7">
        {/* features */}
        <div className="w-fit py-1 px-2 bg-(--accent-bg) border-2 border-(--border) rounded-md text-xxs text-(--text-sec) flex items-center gap-2">
          <p className="text-nowrap">REAL TIME</p>
          <Dot />
          <p className="text-nowrap">AI-DRIVEN</p>
          <Dot />
          <p className="text-nowrap">CONTEXT-AWARE</p>
        </div>

        {/* hero */}
        <div className="w-full md:w-[60%] lg:w-[35%] ">
          {/* hero header */}
          <div className="text-2xl md:text-4xl font-bold mb-5">
            <p>Smarter Security</p>
            <p className="lg:text-nowrap">
              for a <span className="text-(--accent)"> Safer Tomorrow</span>
            </p>
          </div>

          {/* hero text */}
          <p className="text-sm text-(--text-sec)">
            CyberSentinel X continuously analyzes user behaviour, detects
            potential threats and helps you respond intelligently-keeping your
            people, data and systems secure
          </p>
        </div>

        {/* hero buttons */}
        <div className="w-full md:w-[60%] lg:w-[30%] flex flex-col xl:flex-row gap-2">
          {/* login button */}
          <Button
            label="Get Started"
            Icon={ArrowRight}
            onClickFunction={() => navigate("/login")}
          />

          {/* watch demo button */}
          <Button
            label="Watch Demo"
            Icon={CirclePlay}
            className="bg-(--accent-bg)! border-2! border-(--accent-border)!"
          />
        </div>

        {/* advantages */}
        <div className="lg:w-[40%] xl:w-full flex flex-wrap flex-col md:flex-row justify-start items-start gap-2 md:gap-5 ">
          {advantages.map((adv, index) => (
            // advantage
            <div
              key={index}
              className="lg:w-[40%] xl:w-fit flex justify-start items-center gap-1"
            >
              <CircleCheckBig size={20} className="text-(--accent)" />
              <p className="text-xs font-semibold text-(--text-sec)">
                {adv.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* feature cards and stats*/}
      <div className="w-full h-fit py-5 mt-0 flex flex-col items-center gap-5">
        {/* cards */}
        <div className="w-full h-fit flex flex-wrap justify-between items-center gap-2">
          {cards.map((card, index) => (
            // card
            <div
              key={index}
              className="w-full md:w-[48%] xl:w-[23%] h-30 md:h-20 "
            >
              <HeroCards
                key={card.heading}
                Icon={card.icon}
                heading={card.heading}
                text={card.text}
                className="items-center transition-transform duration-200 ease-out hover:scale-102"
              />
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="w-full h-fit bg-(--bg) p-3 border border-(--border) rounded-md hidden md:flex justify-between flex-wrap gap-5 lg:gap-0">
          {stats.map((stat) => (
            // stat
            <div
              key={stat.text}
              className="w-[48%] lg:w-[23%] px-3 lg:px-0 flex gap-3 items-center justify-start lg:justify-center lg:sep-card "
            >
              <div className="p-2 border-2 rounded-full border-(--accent-border) bg-(--accent-bg) ">
                <stat.icon className="text-(--accent)" size={20} />
              </div>

              {/* stat item text */}
              <div className="w-fit">
                {/* stat item header */}
                <div className="text-lg xl:text-xl font-bold text(--text) flex items-center gap-0  ">
                  <p>{stat.value}</p>
                  <stat.unit strokeWidth={3} size={20} className="" />
                </div>

                {/* stat item desc */}
                <p className="text-xs text-(--text-sec) text-nowrap ">
                  {stat.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* homepage footer */}
      <div className="w-full hidden md:flex justify-between">
        <div>
          <p className="text-xs text-(--text-sec)">
            Built for a safer digital world
          </p>
        </div>
        <div className="flex justify-between">
          {footerData.map((data, index) => (
            <div key={index} className=" sep-card after:h-5!">
              <p className="px-5 text-xs text-(--text-sec) font-semibold">
                {data.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
