import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import { Header } from "../../../components";

function LiveEvents() {
  const setActivePage = useOutletContext();

  useEffect(() => {
    setActivePage(1);
  }, []);
  return (
    <div>
      <Header
        headeing="Live Events Stream"
        desc="Millisecond events indexing ingestion tracking endpoints, networks, DNS payloads, and cloud operations."
      />
      <p>live events</p>
    </div>
  );
}

export default LiveEvents;
