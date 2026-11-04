import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router";

function Footer() {
  return (
    <div className="grid gap-4 border-t border-(--border) py-3 md:grid-cols-2 xl:grid-flow-row xl:grid-cols-3 xl:items-center">
      {/* logo */}
      <div className="h-fit">
        <Logo />
        <p className="text-sm text-(--text-sec)  ">
          &copy; 2026 · All rights reserved.
        </p>
      </div>

      {/* link items */}
      <div className="h-fit xl:col-start-3 xl:row-start-1">
        <ul className="flex md:justify-center items-center gap-5 text-sm ">
          <li>
            <Link
              to="/"
              className="text-(--text-sec) hover:text-(--text) hover:underline"
            >
              Privecy
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-(--text-sec) hover:text-(--text) hover:underline"
            >
              Terms
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-(--text-sec) hover:text-(--text) hover:underline"
            >
              Support
            </Link>
          </li>
        </ul>
      </div>

      {/* footer text */}
      <div className="h-fit md:col-span-2 xl:col-start-2 xl:col-span-1">
        <p className="text-sm text-(--text-sec) w-full xl:text-center">
          AI assists. Analysts stay in control.
        </p>
        <p className="text-sm text-(--text-sec) w-full xl:text-center">
          Built for a safer digital world
        </p>
      </div>
    </div>
  );
}

export default Footer;
