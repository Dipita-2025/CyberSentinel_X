import React from "react";
import Button from "../Button/Button";
import { ArrowRight } from "lucide-react";
import Tags from "../Tags/Tags";

function EventCard({ data = {}, index }) {
  return (
    <div className="w-full h-fit bg-(--bg-sec) border border-(--border) flex flex-col gap-4 rounded-md p-4 ">
      {/* date and threat level */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-(--text-sec) ">{data.date}</p>
        <Tags threatLevel={data.threatLevel} />
      </div>

      {/* description */}
      <div>
        <p className="text-md text-(--text) font-semibold md:h-10">
          {data.desc}
        </p>
      </div>

      {/* asset accessed and risk value */}
      <div className="flex justify-between">
        <div>
          <h4 className="text-xxs text-(--text-sec) mb-1">Host asset</h4>
          <p className="text-md text-(--text) font-medium">{data.asset}</p>
        </div>
        <div className="flex flex-col items-end">
          <h4 className="text-xxs text-(--text-sec) mb-1">Risk score</h4>
          <Tags threatLevel={data.threatLevel} text={data.riskValue + "/100"} />
        </div>
      </div>

      {/* ip address */}
      <div className="hidden md:block">
        <h4 className="text-xxs text-(--text-sec) mb-1">IP address</h4>
        <p className="text-md text-(--text) font-medium">{data.ip}</p>
      </div>

      {/* user and role */}
      <div className="justify-between hidden md:flex">
        <div>
          <h4 className="text-xxs text-(--text-sec) mb-1">User</h4>
          <p className="text-md text-(--text) font-medium">{data.user}</p>
        </div>
        <div className="flex flex-col items-end">
          <h4 className="text-xxs text-(--text-sec) mb-1">Role</h4>
          <p className="text-md text-(--text) font-medium">{data.role}</p>
        </div>
      </div>

      {/* location */}
      <div className="hidden md:block">
        <h4 className="text-xxs text-(--text-sec) mb-1">Location</h4>
        <p className="text-md text-(--text) font-medium"> {data.location}</p>
      </div>

      {/* button */}
      <Button
        label="Inspect event"
        Icon={ArrowRight}
        iconSize={15}
        className="text-md text-(--text) font-medium"
      />
    </div>
  );
}

export default EventCard;
