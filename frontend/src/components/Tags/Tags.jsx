import React from "react";
import CriticalTag from "./CriticalTag";
import HighTag from "./HighTag";
import MediumTag from "./MediumTag";
import LowTag from "./LowTag";
import DefaultTag from "./DefaultTag";

function Tags({ threatLevel = "low", text = "" }) {
  return (
    <div>
      {threatLevel === "critical" ? (
        <CriticalTag text={text ? text : "Critical"} />
      ) : threatLevel === "high" ? (
        <HighTag text={text ? text : "High"} />
      ) : threatLevel === "medium" ? (
        <MediumTag text={text ? text : "Medium"} />
      ) : (
        <LowTag text={text ? text : "Low"} />
      )}
    </div>
  );
}

function StatusTags({ status = "" }) {
  return (
    <div>
      {status === "active" ? (
        <CriticalTag text={status[0].toUpperCase() + status.slice(1)} />
      ) : status === "investigating" ? (
        <DefaultTag text={status[0].toUpperCase() + status.slice(1)} />
      ) : status === "mitigated" || status === "closed" ? (
        <LowTag text={status[0].toUpperCase() + status.slice(1)} />
      ) : (
        <></>
      )}
    </div>
  );
}

export { Tags, StatusTags };
