import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button, Input } from "../../Component";

function Login() {
  const [username, setUsername] = useState("alex.morgan");
  const [password, setPassword] = useState("sentinel2026");
  const [showPassword, setShowPassword] = useState(false);

  const previewInvalidCredentials = () => {
    setUsername("invalid.user");
    setPassword("wrongpassword");
  };

  return (
    <div className="w-full card-padding">
      <div className="flex flex-col gap-12">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-(--accent-light)">
          SECURE WORKSPACE ACCESS
        </p>
        <div className="flex flex-col gap-12">
          <h1 className="text-[34px] font-semibold leading-tight tracking-tight">
            Welcome back.
          </h1>
          <p className="text-body text-(--text-muted)">
            Sign in to continue to your CyberSentinel workspace.
          </p>
        </div>
      </div>

      <form
        className="mt-28 flex flex-col gap-20 xl:mt-20 xl:gap-16"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <Input
            name="Username"
            id="login-username"
            value={username}
            autoComplete="username"
            onInputChange={(event) => setUsername(event.target.value)}
            labelClassName="text-caption font-normal text-(--text-muted)"
            className="rounded-lg"
          />
        </div>
        <div>
          <div>
            <Input
              name="Password"
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onInputChange={(event) => setPassword(event.target.value)}
              labelClassName="text-caption font-normal text-(--text-muted)"
              className="rounded-lg"
            />
            {showPassword ? <button>show</button> : <>hide</>}
          </div>
          <div className="flex justify-end">
            <Link
              className="text-caption text-(--accent) hover:underline"
              to="/auth/forget-password"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          label="Sign in"
          type="submit"
          className="w-full rounded-lg hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-light)"
          contentClassName="w-full justify-start"
        />
      </form>

      {/* <div className="mt-24 flex flex-col gap-10 xl:mt-16">
        <p className="text-[11px] leading-relaxed text-(--text-muted)">
          Prototype preview · Example credentials are prefilled. Native inputs
          do not accept arbitrary text.
        </p>
        <button
          className="w-fit text-caption text-(--accent) hover:underline"
          onClick={previewInvalidCredentials}
          type="button"
        >
          Preview invalid credentials
        </button>
      </div> */}

      <div className="mt-28 flex items-center gap-10 text-(--text-muted) xl:mt-16">
        <Lock aria-hidden="true" className="shrink-0" size={18} />
        <p className="text-caption">
          Authorization and trust are evaluated on the server.
        </p>
      </div>
    </div>
  );
}

export default Login;
