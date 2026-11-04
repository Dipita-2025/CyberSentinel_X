import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="grid gap-5 border-t border-(--border) p-2 md:p-5 md:grid-cols-2 lg:grid-cols-3 items-center">
      {/* logo */}
      <div className="h-fit">
        <Logo />
        <p className="text-xs lg:text-sm text-(--text-sec)">
          &copy; 2026 · All rights reserved.
        </p>
      </div>

      {/* link items */}
      <div className="h-fit lg:col-start-3 lg:row-start-1">
        <ul className="flex items-center gap-2 text-xs lg:text-sm md:justify-end md:gap-5">
          <li>
            <Link
              to="/"
              className="text-(--text-sec) hover:text-(--text) hover:underline"
            >
              Privacy
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
      <div className="h-fit md:col-span-2 lg:col-start-2 lg:col-span-1">
        <p className="w-full text-xs md:text-sm text-(--text-sec) xl:text-center">
          AI assists. Analysts stay in control.
        </p>
        <p className="w-full text-xs lg:text-sm text-(--text-sec) xl:text-center">
          Built for a safer digital world
        </p>
      </div>
    </footer>
  );
}

export default Footer;
