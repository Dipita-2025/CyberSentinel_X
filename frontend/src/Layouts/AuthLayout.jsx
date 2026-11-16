import { Outlet, Link } from "react-router";
import { Footer, Logo, FeatureCard } from "../Component";
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  Waypoints,
  Lightbulb,
  Zap,
  Dot,
  ShieldCheck,
} from "lucide-react";

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

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-(--bg) bg-[url('/login.png')] bg-cover bg-no-repeat bg-center xl:h-screen xl:min-h-0">
      <header className="mx-auto flex w-full border-b border-(--border) p-20 sm:px-32 lg:px-48">
        <Link
          to="/"
          className="inline-flex justify-end items-center gap-8 rounded-md   text-caption font-medium text-(--accent-light)  hover:text-(--text) "
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to home
        </Link>
      </header>

      <main className="flex flex-col xl:flex-row justify-between items-center p-8 py-20 md:p-48 xl:min-h-0 gap-20 md:gap-48">
        <div className="w-full h-fit xl:w-[60%] card-padding flex flex-col justify-center gap-12 md:gap-40  shrink-0 rounded-md ">
          {/* hero text*/}
          <div className="">
            <Logo />
          </div>
          <div className="mb-12">
            {/* name */}

            {/* tagline */}
            <p className="text-head-sec md:text-head-page font-semibold mb-8">
              Smarter Security for a Safer Tomorrow
            </p>

            {/* desc */}
            <p className="hidden md:block w-full md:w-[60%] lg:w-[70%] text-body/1 text-(--text-muted) ">
              Context-aware Al that continuously monitors, analyzes and responds
              to potential threats protecting your people, accounts and critical
              data.
            </p>
          </div>

          {/* features */}
          <div className="w-fit text-caption text-(--text-muted) rounded-full flex gap-4 justify-center items-center bg-(--bg) py-4 px-20 border border-(--border)">
            <p>RBSC</p>
            <Dot />
            <p>XGBoost</p>
            <Dot />
            <p>Trust Engine</p>
          </div>

          {/* hero items */}
          <div className="hidden md:flex justify-start  flex-wrap gap-12">
            {heroItems.map((item, index) => (
              // each icon
              // each icon
              <div className="w-[48%] md:w-[31%]" key={index}>
                <FeatureCard
                  Icon={item.icon}
                  heading={item.heading}
                  desc={item.desc}
                  className="flex-col p-8!"
                  iconSize={20}
                />
              </div>
            ))}
          </div>
        </div>
        <section className="w-full max-w-500 overflow-hidden rounded-md border border-(--border) bg-(--card)">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AuthLayout;
