import React, { useState } from "react";
import { Button, Input } from "../../../components";
import { Mail, Lock, EyeOff, Eye, Key, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({ email: "", password: "", mfa: "" });
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const onLogin = async () => {
    console.log(user);
    navigate("/dashboard");
    dispatcher(login(user));
  };

  // dom
  return (
    <div className="w-full sm:w-90 h-fit p-5  border-3 border-(--accent-border) rounded-md bg-(--bg) flex flex-col gap-5 ">
      {/* header */}
      <div className="">
        <h2 className="text-lg text-(--text) font-bold">Wellcome Back</h2>
        <p className="text-xs text-(--text-sec) ">
          Sign in to your CyberSentinal X account
        </p>
      </div>

      {/* input form  */}
      <div className=" flex flex-col gap-2">
        {/* email */}
        <Input
          name="Email"
          Icon={Mail}
          type="email"
          onInputChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        {/* password  */}
        <div className="w-full">
          <Input
            name="Password"
            type={showPass ? "text" : "password"}
            Icon={Lock}
            onInputChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            Element={
              // show and hide button
              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass((visible) => !visible)}
                className="h-full aspect-square bg-(--accent-bg) flex justify-center items-center"
              >
                {showPass ? (
                  <EyeOff
                    strokeWidth={2}
                    size={20}
                    className="text-(--text-sec)"
                  />
                ) : (
                  <Eye
                    strokeWidth={2}
                    size={20}
                    className="text-(--text-sec)"
                  />
                )}
              </button>
            }
          />

          {/* forget password link */}
          <Link className="block w-full text-end text-xs text-(--text-sec)">
            forget password
          </Link>
        </div>

        {/* multi-factor auth input */}
        <Input
          name="MFA"
          Icon={Key}
          type="text"
          onInputChange={(e) => setUser({ ...user, mfa: e.target.value })}
        />
      </div>

      {/* login button */}
      <Button label="Login" Icon={ArrowRight} onClickFunction={onLogin} />
    </div>
  );
}

export default LoginForm;
