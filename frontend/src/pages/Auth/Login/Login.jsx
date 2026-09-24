import React from "react";
import { HeroCards, Input, Logo } from "../../../components";
import LoginForm from "../LoginForm/LoginForm";
import {
  Brain,
  Dot,
  ShieldCheck,
  TrendingUp,
  Waypoints,
  Lightbulb,
  Zap,
} from "lucide-react";

function Login() {
  // hero items details
  const heroItems = [
    {
      icon: Brain,
      heading: "Al Threat Detection",
      desc: "Deftects known and unknown threats",
    },

    {
      icon: TrendingUp,
      heading: "Behavioural Analysis",
      desc: "Identifies unusua pattems",
    },
    {
      icon: ShieldCheck,
      heading: "Adaptive Response",
      desc: "Moorton, verthes, restricts or contains",
    },
    {
      icon: Waypoints,
      heading: "Attack Story",
      desc: "Connects events inte complete attack flows",
    },
    {
      icon: Lightbulb,
      heading: "Explainable Al",
      desc: "Shows why a tisk was detected ",
    },
    {
      icon: Zap,
      heading: "Emergency Access",
      desc: "Secure break-glass for real emergencies ",
    },
  ];

  // dom
  return (
    <div className="w-full min-h-screen bg-[url('/login.png')] bg-cover bg-top flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0">
      {/* hero */}
      <div className="w-full lg:w-[60%] h-full lg:h-screen p-5 lg:p-10 flex flex-col justify-center gap-10">
        {/* logo */}
        <Logo />

        {/* features */}
        <div className="text-xs text-(--text-sec) flex gap-3 items-center">
          <p>DETECT</p>
          <Dot />
          <p>ANALYZE</p>
          <Dot />
          <p>RESPOND</p>
          <Dot />
          <p>PROTECT</p>
        </div>

        {/* hero text*/}
        <div>
          {/* name */}
          <p className="text-4xl font-bold text-(--text) mb-1">
            CyberSentinel <span className="text-(--accent)">X</span>
          </p>

          {/* tagline */}
          <p className="text-2xl font-bold mb-2">
            Smarter Security for a Safer Tomorrow
          </p>

          {/* desc */}
          <p className="w-full md:w-[60%] lg:w-[70%] text-sm text-(--text-sec) ">
            Context-aware Al that continuously monitors, analyzes and responds
            to potential threats protecting your people, accounts and critical
            data.
          </p>
        </div>

        {/* hero items */}
        <div className="flex justify-center flex-wrap gap-2">
          {heroItems.map((item, index) => (
            // each icon
            <div className="w-[48%] md:w-[31%]" key={index}>
              <HeroCards
                Icon={item.icon}
                heading={item.heading}
                text={item.desc}
                className="flex-col"
              />
            </div>
          ))}
        </div>
      </div>

      {/* login form section */}
      <div className=" flex justify-center items-center pb-10 w-full h-fit lg:h-screen lg:w-[40%] p-5">
        {/* login form */}
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
