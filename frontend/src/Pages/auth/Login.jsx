import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Workflow,
  Lightbulb,
  Zap,
  LockKeyhole,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../Store/Slice/notificationSlice";

import { LoginForm } from "../../features/auth/components";
import { Logo, Button } from "../../components/ui";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Threat Detection",
    description: "Detects known and unknown threats.",
  },
  {
    icon: TrendingUp,
    title: "Behavioural Analysis",
    description: "Identifies unusual activity patterns.",
  },
  {
    icon: ShieldCheck,
    title: "Adaptive Response",
    description: "Monitors, verifies and responds to threats.",
  },
  {
    icon: Workflow,
    title: "Attack Story",
    description: "Connects events into complete attack flows.",
  },
  {
    icon: Lightbulb,
    title: "Explainable AI",
    description: "Explains why a security risk was detected.",
  },
  {
    icon: Zap,
    title: "Emergency Access",
    description: "Supports controlled emergency access.",
  },
];

const Login = () => {
  const dispatch = useDispatch();
  return (
    <main className="relative min-h-screen overflow-hidden bg-[url('/login.png')] bg-background bg-cover bg-center bg-no-repeat">
      {/* Background overlay */}
      <div className="absolute inset-0 " />

      {/* Main layout */}
      <div
        className="
          relative z-10 mx-auto grid min-h-screen w-full
          max-w-[1600px] grid-cols-1 items-center
          gap-8 px-4 py-6
          sm:gap-10 sm:px-6 sm:py-8
          lg:grid-cols-[1.5fr_1fr]
          lg:gap-10 lg:px-10 lg:py-10
          xl:grid-cols-[1.6fr_1fr]
          xl:gap-16 xl:px-12
        "
      >
        {/* Left section */}
        <section className="flex min-w-0 flex-col justify-center">
          {/* Brand */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <Logo />
          </div>

          {/* Introduction */}
          <div className="max-w-2xl">
            <span className="mb-3 inline-block text-caption font-semibold uppercase  text-accent-light">
              Intelligent Application Security
            </span>

            <h1 className="text-head-page sm:text-head lg:text-[2.75rem]">
              Smarter Security for a<br />
              <span className="text-accent">Safer Tomorrow</span>
            </h1>

            <p className="mt-3 max-w-xl text-body leading-relaxed text-muted sm:text-base">
              Context-aware AI that continuously monitors, analyzes and responds
              to potential threats, protecting your people, accounts and
              critical data.
            </p>
          </div>

          {/* Technology badges */}
          <div
            className="
              mt-6 flex w-fit max-w-full flex-wrap items-center
              gap-3 rounded-full border border-border
              bg-card/90 px-4 py-2.5
              text-caption text-primary-text
              sm:mt-8 sm:gap-4 sm:px-5
            "
          >
            <span>RBAC</span>
            <span className="text-muted">•</span>
            <span>XGBoost</span>
            <span className="text-muted">•</span>
            <span>Trust Engine</span>
          </div>

          {/* Feature cards */}
          <div
            className="
              mt-6 grid grid-cols-1 gap-3
              sm:mt-8 sm:grid-cols-2 sm:gap-4
              xl:grid-cols-3
            "
          >
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="
                  min-w-0 rounded-xl border border-border
                  bg-card/95 p-3 transition-all duration-200
                  hover:border-accent hover:shadow-lg
                  sm:p-4
                "
              >
                <div
                  className="
                    mb-3 flex size-9 items-center justify-center
                    rounded-lg bg-accent-light/10
                    text-accent-light
                  "
                >
                  <Icon size={19} strokeWidth={2} />
                </div>

                <h2 className="text-sm font-semibold text-primary-text">
                  {title}
                </h2>

                <p className="mt-1 text-caption leading-relaxed text-muted">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Right section: Login */}
        <section className="flex min-w-0 w-full items-center justify-center lg:justify-end">
          <div
            className="
              w-full max-w-115 rounded-2xl
              border border-border bg-card/95
              p-3 shadow-2xl backdrop-blur-md
              md:p-8
              flex flex-col gap-5 md:gap-8
            "
          >
            {/* Login heading */}
            <div className=" ">
              <Logo />
              <p className="text-caption font-semibold uppercase tracking-widest text-accent-light mt-1">
                Secure Workspace Access
              </p>
            </div>

            <div className="">
              <h2 className="text-head-page">Welcome back.</h2>

              <p className="text-body text-muted">
                Sign in to continue to your CyberSentinel workspace.
              </p>
            </div>

            {/* Authentication form */}
            <LoginForm />

            {/* Security information */}
            <div className="border-t border-border pt-5">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  size={17}
                  className="mt-0.5 shrink-0 text-accent-light"
                />

                <p className="text-caption leading-relaxed text-muted">
                  Your session is protected by secure authentication, role-based
                  permissions and server-side trust evaluation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="
            col-span-1 flex flex-col items-center
            justify-between gap-2 border-t border-border/60
            pt-4 text-center text-caption text-muted
            sm:flex-row sm:text-left
            lg:col-span-2
          "
        >
          <span>© {new Date().getFullYear()} CyberSentinelX</span>
          <span>Intelligent Security. Trusted Access.</span>
        </footer>
      </div>
    </main>
  );
};

export default Login;
