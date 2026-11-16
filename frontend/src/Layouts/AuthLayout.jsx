import { Outlet, Link } from "react-router";
import { Logo } from "../Component";
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
    <div className="flex min-h-screen flex-col bg-(--bg) xl:h-screen xl:min-h-0">
      <header className="mx-auto flex w-full  items-center justify-between px-20 py-16 sm:px-32 lg:px-48">
        <Logo />
        <Link
          to="/"
          className="inline-flex  items-center gap-8 rounded-md  px-12 text-caption font-medium text-(--accent-light) transition-colors  hover:text-(--text) "
        >
          <ArrowLeft aria-hidden="true" size={16} />
          <span className="hidden md:block">Back to</span>
          {""}home
        </Link>
      </header>

      <main className="flex  flex-col lg:flex-row items-center p-8 sm:px-32 lg:px-48 lg:py-48 xl:min-h-0 xl:py-12 gap-24">
        <div className="w-full h-fit lg:w-[60%]   p-8 py-20 lg:p-20 xl:p-40 flex flex-col justify-center gap-40 bg-(--sidebar) rounded-md border border-(--border)">
          {/* hero text*/}
          <div>
            {/* name */}
            <p className="text-head font-bold text-(--text) mb-12">
              CyberSentinel <span className="text-(--accent)">X</span>
            </p>

            {/* tagline */}
            <p className="text-head-sec font-bold md:mb-16">
              Smarter Security for a Safer Tomorrow
            </p>

            {/* desc */}
            <p className="hidden md:block w-full md:w-[60%] lg:w-[70%] text-body text-(--text-muted) ">
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
          <div className="hidden md:flex justify-center  flex-wrap gap-8">
            {heroItems.map((item, index) => (
              // each icon
              <div className="w-[48%] md:w-[31%]" key={index}>
                <div
                  className={`w-full h-full bg-(--card)  rounded-lg p-12  flex flex-col items-start gap-12 `}
                >
                  {/* card icon */}
                  {item.icon && (
                    <div className="p-8  w-fit shrink-0 rounded-lg bg-(--accent-light-bg)  ">
                      <item.icon size={24} className="text-(--accent-light)" />
                    </div>
                  )}

                  {/* card text */}
                  <div className="min-w-0">
                    <h2 className="font-bold text-body mb-8">{item.heading}</h2>
                    <p className="text-caption text-(--text-muted)">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="w-full lg:w-[40%] overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
          <Outlet />
        </section>
      </main>

      <footer className="mx-auto flex w-full flex-col gap-8 px-20 py-16 text-caption text-(--text-muted) sm:flex-row sm:items-center sm:justify-between sm:px-32 lg:px-48">
        <p>© {new Date().getFullYear()} CyberSentinel X</p>
        <p className="inline-flex items-center gap-6">
          CyberSentinel / Intelligent trust. Explicit access.
        </p>
      </footer>
    </div>
  );
}

export default AuthLayout;
