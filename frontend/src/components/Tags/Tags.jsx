import React from "react";
import CriticalTag from "./CriticalTag";
import HighTag from "./HighTag";
import MediumTag from "./MediumTag";
import LowTag from "./LowTag";

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

export default Tags;
