import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import { Header } from "../../../components";
import PageLayout from "../../../layout/PageLayout";

function LiveEvents() {
  const setActivePage = useOutletContext();

  useEffect(() => {
    setActivePage(1);
  }, []);
  return (
    <div>
      <PageLayout
        heading="Live Events Stream"
        desc="Millisecond events indexing ingestion tracking endpoints, networks, DNS payloads, and cloud operations."
      >
        <p>live events</p>
      </PageLayout>
    </div>
  );
}

export default LiveEvents;
