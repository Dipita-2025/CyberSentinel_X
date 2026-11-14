import Button from "../Button/Button";
import { ArrowRight } from "lucide-react";
import { Tags, StatusTags } from "../Tags/Tags";

function EventCard({ data = {}, buttons = [], varient = "" }) {
  return (
    <div className="w-full h-fit bg-(--bg-sec) border border-(--border) flex flex-col gap-4 rounded-md p-4 ">
      {/* date and threat level */}
      <div className="flex justify-between items-center">
        <p className="text-base font-bold text-(--accent) ">{data.id}</p>
        <Tags threatLevel={data.threatLevel} />
      </div>
      {varient === "live" && (
        <div>
          <p className="text-xs text-(--text-sec) ">{data.date}</p>
        </div>
      )}

      {/* description */}
      <div>
        <p className="text-md text-(--text) font-medium md:h-10">
          {data.description}
        </p>
      </div>

      {varient === "live" && (
        <div className="flex flex-col gap-4">
          {/* asset accessed and risk value */}
          <div className="flex justify-between">
            <div>
              <h4 className="text-xxs text-(--text-sec) ">Host asset</h4>
              <p className="text-md text-(--text) ">{data.asset}</p>
            </div>
            <div className="flex flex-col items-end">
              <h4 className="text-xxs text-(--text-sec) ">Risk score</h4>
              <Tags
                threatLevel={data.threatLevel}
                text={data.riskValue + "/100"}
              />
            </div>
          </div>

          {/* ip address */}
          <div className="hidden md:block">
            <h4 className="text-xxs text-(--text-sec) mb-0">IP address</h4>
            <p className="text-md text-(--text) ">{data.ip}</p>
          </div>

          {/* user and role */}
          <div className="justify-between hidden md:flex">
            <div>
              <h4 className="text-xxs text-(--text-sec) ">User</h4>
              <p className="text-md text-(--text) ">{data.user}</p>
            </div>
            <div className="flex flex-col items-end">
              <h4 className="text-xxs text-(--text-sec) ">Role</h4>
              <p className="text-md text-(--text) ">{data.role}</p>
            </div>
          </div>

          {/* location */}
          <div className="hidden md:block">
            <h4 className="text-xxs text-(--text-sec) ">Location</h4>
            <p className="text-md text-(--text) "> {data.location}</p>
          </div>

          <Button
            className="text-md! text-(--text)! font-medium! w-full"
            label="Inspect event"
            Icon={ArrowRight}
            iconSize={15}
          />
        </div>
      )}

      {varient === "incident" && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <StatusTags status={data.status} />
            <Tags
              threatLevel={data.threatLevel}
              text={data.riskValue + "/100"}
            />
          </div>
          <div className="justify-between flex">
            <div>
              <h4 className="text-xxs text-(--text-sec) ">Security officer</h4>
              <p className="text-md text-(--text) ">
                {data.securityOfficer}&nbsp;(<span>{data.officerRole}</span>)
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              label="Investigate"
              className="text-md! text-(--text)! font-medium! w-full "
            />
            <Button
              label="Review logs"
              className="text-md! text-(--text)! font-medium! w-full "
            />
            <Button
              label="Review block"
              className="text-md! text-(--text)! font-medium! w-full "
            />
            <Button
              label="Assigned analyst"
              className="text-md! text-(--text)! font-medium! w-full "
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCard;
