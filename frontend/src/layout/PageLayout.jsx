import React from "react";
import { Footer, Header } from "../components";

function PageLayout({ heading, desc, live, children }) {
  return (
    <div className="w-full">
      <Header heading={heading} desc={desc} live={live} />
      <div className="p-4 md:p-6 xl:p-8 flex  flex-col gap-6">{children}</div>
      <div className="w-full px-4 md:px-5 bg-(--bg-sec)">
        <Footer />
      </div>
    </div>
  );
}

export default PageLayout;
