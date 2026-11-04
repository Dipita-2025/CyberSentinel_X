import React from "react";
import { Footer, Header } from "../components";

function PageLayout({ heading, desc, live, children }) {
  return (
    <div className="w-full">
      <Header heading={heading} desc={desc} live={live} />
      <div className="px-1 py-5 md:p-5 flex flex-col gap-2 md:gap-5">
        {children}
      </div>
      <div className="w-full p-2 md:p-5 ">
        <Footer />
      </div>
    </div>
  );
}

export default PageLayout;
