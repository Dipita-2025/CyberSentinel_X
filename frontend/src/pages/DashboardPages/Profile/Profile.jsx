import React, { useEffect } from "react";
import PageLayout from "../../../layout/PageLayout";
import { useOutletContext } from "react-router";
import {
  Button,
  CardHeader,
  Input,
  LowTag,
  ToggleButton,
} from "../../../components";
import {
  Camera,
  User,
  Bell,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcwClock,
  Check,
  SquareExclamationPoint,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { sessions } from "../../../TestData";

function Profile() {
  const setActivePage = useOutletContext();
  console.log(sessions);

  useEffect(() => {
    setActivePage(11);
  }, []);
  return (
    <PageLayout
      heading="Profile"
      desc="Manage your personal details, sign-in security, and active sessions."
    >
      {/* profile display */}
      <div className="bg-(--accent-bg) p-6 rounded-md border border-(--accent) flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex justify-start items-center gap-2">
          {/* profile picture */}
          <div className="w-15 h-15 rounded-full flex justify-center items-center bg-[url('/avatar.png')] bg-cover bg-centers"></div>

          {/* profile details */}
          <div>
            <h4 className="text-xl text-(--text) font-semibold">Name</h4>
            <p className="text-md">Level 3 Incident Responder</p>
            <p className="text-xs text-(--text-sec)">Organization name</p>
          </div>
        </div>

        {/* change photo button */}
        <Button
          Icon={Camera}
          iconSize={15}
          label="Change photo"
          className="w-full md:w-fit"
        />
      </div>

      {/* personal details section */}
      <div className="bg-(--bg-sec) border border-(--border) p-4 rounded-md flex flex-col gap-6">
        {/* header  */}
        <CardHeader
          Icon={User}
          heading="Personal details"
          desc="Keep your analyst identity and contact information up to date."
        />

        {/* edit inputs  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 xl:gap-x-25 gap-y-4">
          <Input name="Organization name" className="bg-(--bg)!" />
          <Input name="Workplace name" className="bg-(--bg)!" />
          <Input name="Primary domain" className="bg-(--bg)!" />
          <Input name="Security contact" className="bg-(--bg)!" />
          <Input name="Workplace timezone" className="bg-(--bg)!" />
          <Input name="Data residency" className="bg-(--bg)!" />
        </div>

        {/* personal details text */}
        <p className="text-xs text-(--text-sec)">
          Role and organization access are managed by your workspace
          administrator.
        </p>
      </div>

      {/* mfa and notification section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* mfa section  */}
        <div className="w-[50%] bg-(--bg-sec) p-4 border border-(--border) rounded-md flex flex-col gap-6">
          {/* header */}
          <CardHeader
            Icon={ShieldCheck}
            heading="Account security"
            desc="Organization-managed sign-in and verification."
          />

          {/* mfa id status */}
          <div>
            <div className="flex justify-between items-center gap-4 mb-1">
              <h3 className="text-md font-semibold">Microsoft Entra ID</h3>
              <LowTag text="Connected" />
            </div>
            <p className="text-xs text-(--text-sec)">
              Single sign-on · Password managed by your organization.
            </p>
          </div>

          <hr className="h-0.2 text-(--border)" />

          {/* mfa app status */}
          <div>
            <div className="flex justify-between items-center gap-4 mb-1">
              <h3 className="text-md font-semibold">
                Multi-factor authentication
              </h3>
              <LowTag text="enabled" />
            </div>
            <p className="text-xs text-(--text-sec)">
              YubiKey 5 NFC · Primary security key
            </p>
            <p className="text-xs text-(--text-sec)">
              Authenticator app · Backup method
            </p>
          </div>

          {/* manage mfa button */}
          <Button className="w-full md:w-fit" label="Manage MFA methods" />

          {/* mfa fotter text  */}
          <p className="text-xs text-(--text-sec)">
            Recovery codes: 8 remaining. Security changes require you to verify
            your identity.
          </p>
        </div>

        {/* notification sction */}
        <div className="w-[50%] bg-(--bg-sec) p-4 border border-(--border) rounded-md flex flex-col gap-6">
          {/* header */}
          <CardHeader
            Icon={Bell}
            heading="Notification preferences"
            desc="Your delivery preferences for SecOps Command."
          />

          {/* assigned incidents */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Assigned incident updates
              </h3>
              <p className="text-xs text-(--text-sec)">
                Email and in-app alerts for incidents assigned to you.
              </p>
            </div>
            <ToggleButton />
          </div>

          {/* security alerts */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Account security alerts
              </h3>
              <p className="text-xs text-(--text-sec)">
                New sign-ins, MFA changes, and session warnings.
              </p>
            </div>
            <ToggleButton />
          </div>

          {/* daily digest */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Daily SOC digest
              </h3>
              <p className="text-xs text-(--text-sec)">
                A summary of workspace activity at 08:00 UTC.
              </p>
            </div>
            <ToggleButton />
          </div>
          <hr className="h-0.1 text-(--border)" />

          {/* notification fotter text */}
          <p className="text-xs text-(--text-sec)">
            Mandatory critical alerts follow organization policy and cannot be
            muted here.
          </p>
        </div>
      </div>

      {/* active sessions */}
      <div className="bg-(--bg-sec) border border-(--border) rounded-md p-4 flex flex-col gap-4">
        <CardHeader
          Icon={Monitor}
          heading="Active sessions"
          desc={`${sessions.length} signed-in devices · Times shown in UTC.`} // change with acctual session number in times of integration
        />
        {sessions &&
          sessions.map((session, index) => (
            // each sessions
            <div
              key={index}
              className="bg-(--bg) p-4 border border-(--border) rounded-md "
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex  gap-2 ">
                  {/* session devices logo */}
                  <div className="w-fit h-fit rounded-md p-2 bg-(--accent-bg)">
                    {session.deviceType === "laptop" ? (
                      <Monitor size={18} className="text-(--accent)" />
                    ) : session.deviceType === "tablet" ? (
                      <Tablet size={18} className="text-(--accent)" />
                    ) : (
                      <Smartphone size={18} className="text-(--accent)" />
                    )}
                  </div>

                  {/* session text  */}
                  <div className="flex flex-col gap-1.5">
                    <p className="text-md font-semibold">{session.name}</p>
                    <p className="text-xs text-(--text-sec)">
                      {session.location}&nbsp;<span>&bull;</span>&nbsp;
                      {session.ip}
                    </p>
                    <p className="text-xs text-(--text-sec) mb-1">
                      {session.dateTime} &bull; Active now
                    </p>
                    <LowTag text="This device" /> {/* this devide tag */}
                  </div>
                </div>

                {/* sign out button */}
                <Button label="Sign out" className="w-full md:w-fit" />
              </div>
            </div>
          ))}
      </div>

      {/* recent section */}
      <div className="bg-(--bg-sec) border border-(--border) rounded-md p-4 flex flex-col gap-6">
        {/* header */}
        <CardHeader
          Icon={RotateCcwClock}
          heading="Recent account activity"
          desc="Your latest sign-in and security events."
        />

        {/* logs */}
        {/* sso sign in  */}
        <div className="flex gap-2">
          <div className=" w-fit h-fit p-2 rounded-full bg-(--low-bg)">
            <Check className="text-(--low)" size={18} />
          </div>
          <div>
            <p className="text-md font-semibold mb-1">Successful SSO sign-in</p>
            <p className="text-xs text-(--text-sec)">
              Chrome on Windows · Fort Meade, US · FIDO2 verified
            </p>
            <p className="text-xxs text-(--text-sec)">
              20 May 2026 · 09:12 UTC
            </p>
          </div>
        </div>

        <hr className="h-0.2 text-(--border)" />

        {/* session changed */}
        <div className="flex gap-2">
          <div className=" w-fit h-fit p-2 rounded-full bg-(--medium-bg)">
            <SquareExclamationPoint className="text-(--medium)" size={18} />
          </div>
          <div>
            <p className="text-md font-semibold mb-1">
              Session challenge flagged
            </p>
            <p className="text-xs text-(--text-sec)">
              Safari on iPad · Washington, US · Review recommended
            </p>
            <p className="text-xxs text-(--text-sec)">
              20 May 2026 · 03:44 UTC
            </p>
          </div>
        </div>

        <hr className="h-0.2 text-(--border)" />

        {/* authenticator status */}
        <div className="flex gap-2">
          <div className="w-fit h-fit p-2 rounded-full bg-(--low-bg)">
            <Check className="text-(--low)" size={18} />
          </div>
          <div>
            <p className="text-md font-semibold mb-1">
              Backup authenticator verified
            </p>
            <p className="text-xs text-(--text-sec) ">
              Authenticator app confirmed after security key verification
            </p>
            <p className="text-xxs text-(--text-sec)">
              18 May 2026 · 14:06 UTC
            </p>
          </div>
        </div>

        {/* view my audit button */}
        <Button
          className="w-full md:w-fit"
          label="View my audit activity"
          Icon={ArrowUpRight}
          iconSize={15}
        />
      </div>

      {/* cancel and save button */}
      <div className="w-full p-4 bg-(--bg-sec) border border-(--border) rounded-md flex justify-end items-center gap-4">
        <Button label="Cancel" className="px-7!" />
        <Button
          label="Save"
          className="bg-(--accent)! px-7! border-(--accent)! text-(--bg)!"
        />
      </div>
    </PageLayout>
  );
}

export default Profile;
