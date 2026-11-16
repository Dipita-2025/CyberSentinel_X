import { Activity, Check, Cpu, Dot } from "lucide-react";
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
  Lock,
} from "lucide-react";
import {
  Button,
  Logo,
  Footer,
  ProgressBar,
  FeatureCard,
} from "../../../Component";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  // features
  const features = [
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
      value: "1244",
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

  // dom
  return (
    <>
      <div className="w-full min-h-screen h-fit card-padding bg-[url('/login.png')] bg-cover bg-no-repeat bg-center  flex flex-col gap-60">
        <Logo />

        {/* hero section */}
        <div className=" flex flex-col lg:flex-row justify-center items-center  gap-30">
          {/* hero text */}
          <div className="w-full lg:w-[60%]  flex flex-col gap-35  ">
            <div className="w-fit text-caption text-(--text-muted) rounded-full flex gap-4 justify-center items-center bg-(--bg) py-4 px-20 border border-(--border)">
              <p>RBSC</p>
              <Dot />
              <p>XGBoost</p>
              <Dot />
              <p>Trust Engine</p>
            </div>

            {/* hero */}
            <div className="w-full ">
              {/* hero header */}
              <div className="text-2xl md:text-4xl font-bold mb-10">
                <p>Smarter Security</p>
                <p className="lg:text-nowrap">
                  for a <span className="text-(--accent)"> Safer Tomorrow</span>
                </p>
              </div>

              {/* hero text */}
              <p className="hidden md:block  text-body/1 text-(--text-muted)">
                CyberSentinel X continuously analyzes user behaviour, detects
                potential threats and helps you respond intelligently-keeping
                your people, data and systems secure
              </p>
            </div>

            {/* hero buttons */}
            <div className="w-full md:w-[80%]  flex flex-col md:flex-row gap-8 ">
              {/* login button */}
              <Button
                label="Get Started"
                Icon={ArrowRight}
                onClickFunction={() => navigate("/auth")}
                className="w-full"
              />

              {/* watch demo button */}
              <Button
                label="Watch Demo"
                Icon={CirclePlay}
                className=" border! border-(--accent)! bg-(--sidebar)!  w-full!"
                contentClassName="font-normal! text-(--accent)!"
              />
            </div>

            {/* advantages */}
            <div className=" flex flex-wrap flex-col md:flex-row justify-start items-start gap-8 md:gap-12">
              {advantages.map((adv, index) => (
                // advantage
                <div key={index} className=" xl:w-fit  ">
                  <p className="text-caption font-semibold text-(--text-muted) inline-flex items-center gap-5">
                    <CircleCheckBig size={20} className="text-(--accent)" />
                    {adv.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* hero card */}
          <div className="w-full lg:w-[35%] max-w-500 bg-(--card) rounded-md p-20 border border-(--border) flex flex-col gap-20 ">
            <p className="text-body font-semibold">Live security decision</p>
            <p className="inline-flex gap-5 text-(--accent-light) text-caption items-center">
              <Activity size={20} />
              ACCESS EVALUATION
            </p>
            <div className="p-16 rounded-md bg-(--bg) ">
              <p className="text-head-sec font-semibold mb-8">
                Source Code Management
              </p>
              <p className="text-caption text-(--text-muted)">
                Developer / repository:read
              </p>
            </div>

            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-14 items-center">
                <p className=" h-full  text-body text-(--accent-light) font-semibold">
                  01
                </p>
                <Lock size={24} className="text-(--accent-light)" />
                <div>
                  <p className="text-body font font-medium mb-8">
                    RBAC permission
                  </p>
                  <p className="text-caption text-(--text-muted)">
                    Required checks passed
                  </p>
                </div>
              </div>
              <Check size={20} className="text-(--text-muted)" />
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-14 items-center">
                <p className=" h-full  text-body text-(--accent-light) font-semibold">
                  02
                </p>
                <Cpu size={24} className="text-(--accent-light)" />
                <div>
                  <p className="text-body font font-medium mb-8">
                    XGBoost classification
                  </p>
                  <p className="text-caption text-(--text-muted)">
                    BENIGN · 70 traffic features
                  </p>
                </div>
              </div>
              <Check size={20} className="text-(--text-muted)" />
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-14 items-center">
                <p className=" h-full  text-body text-(--accent-light) font-semibold">
                  03
                </p>
                <ShieldCheck size={24} className="text-(--accent-light)" />
                <div>
                  <p className="text-body font font-medium mb-8">
                    Trust Engine
                  </p>
                  <p className="text-caption text-(--text-muted)">
                    User + device + IP + ML
                  </p>
                </div>
              </div>
              <Check size={20} className="text-(--text-muted)" />
            </div>
            <hr className="h-0.2 text-(--border)" />
            <div>
              <p className="text-caption text-(--text-muted)">TRUST SCORE</p>
              <p className="text-head-page font-semibold text-(--accent-light) mb-8">
                78 / 100
              </p>
              <ProgressBar value={78} color="var(--accent)" />
            </div>
            <p className="text-caption text-(--text-muted)">
              Example data · Illustrative evaluation, not a performance claim.
            </p>
          </div>
        </div>

        {/* <div className="w-full h-fit py-20 mt-0 flex flex-col items-center gap-20   "> */}
        {/* cards */}
        <div className="w-full h-fit flex flex-wrap justify-between items-center gap-8">
          {features.map((card, index) => (
            // card
            <div key={index} className="w-full md:w-[48%] xl:w-[23%]  ">
              <FeatureCard
                key={card.heading}
                Icon={card.icon}
                heading={card.heading}
                desc={card.text}
                className="items-start! flex-row! border border-(--border) transition-transform duration-200 ease-out hover:scale-102"
              />
            </div>
          ))}
        </div>
        {/* </div> */}

        {/* stats */}
        <div className="w-full h-fit bg-(--sidebar)  border border-(--accent) rounded-md hidden md:flex justify-between flex-wrap gap-20 lg:gap-0 p-20">
          {stats.map((stat) => (
            // stat
            <div
              key={stat.text}
              className="w-[48%] lg:w-[23%] px-12 lg:px-0 flex gap-12 items-center justify-start lg:justify-center lg:sep-card "
            >
              <div className="p-8 border-2 rounded-full border-(--accent) bg-(--bg-sec) ">
                <stat.icon className="text-(--accent)" size={20} />
              </div>

              {/* stat item text */}
              <div className="w-fit">
                {/* stat item header */}
                <div className="text-head-sec font-bold text(--text) flex items-center gap-4  ">
                  <p>{stat.value}</p>
                  <stat.unit strokeWidth={2} size={15} className="" />
                </div>

                {/* stat item desc */}
                <p className="text-body text-(--text-muted) text-nowrap ">
                  {stat.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
