import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../../layout/PageLayout";
import { useOutletContext } from "react-router";
import {
  Brain,
  BuildingComplex,
  ShieldCheck,
  Bell,
  Plug,
  Database,
  Info,
  ArrowUpRight,
} from "lucide-react";
import {
  Button,
  CardHeader,
  Input,
  LowTag,
  MediumTag,
  ToggleButton,
} from "../../../components";

function Settings() {
  const setActivePage = useOutletContext();
  const [section, setSection] = useState("general");
  const sectionsContainerRef = useRef(null);
  const securitySectionRef = useRef(null);

  const scrollToSecuritySection = () => {
    const container = sectionsContainerRef.current;
    const target = securitySectionRef.current;

    if (!container || !target) return;

    container.scrollTo({
      top:
        container.scrollTop +
        target.getBoundingClientRect().top -
        container.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setActivePage(10);
  }, []);

  return (
    <PageLayout
      heading="Settings"
      desc="Manage your organization, security policies, and SOC workspace."
    >
      {/* page content */}
      {/* summary */}
      <div className="w-full bg-(--accent-bg) p-2 md:p-5 border border-(--accent) rounded-md flex items-center justify-around gap-5">
        <div className="p-2 bg-(--accent-bg) border border-(--accent) rounded-md hidden xl:block ">
          <Brain size={35} className="text-(--accent)" />
        </div>
        <div className="w-full">
          <h2 className="text-base text-(--accent) font-semibold mb-4 xl:mb">
            Cognitive SOC Assistant Summary
          </h2>
          <p className="text-md ">
            Detected credential anomalies on 3 internal assets. Autonomous
            isolation block successfully applied to DNS exfiltration vectors
            (Incident INC-1092). Mean Time to Mitigation (MTTM) is down to 42ms.
            System health remains optimal.
          </p>
        </div>
      </div>

      {/* sections
      <div className="hidden">
        <h4 className="mb-3 text-xxs text-(--text-sec) font-semibold">
          WORKSPACE SETTINGS
        </h4>
        <div className="flex justify-start items-center flex-wrap  gap-4">
          <Button
            label="General"
            className={` text-xs! font-normal! ${section === "general" ? "text-(--accent)! bg-(--accent-bg)! border-(--accent)!" : "text-(--text-sec)!"} `}
            onClickFunction={() => setSection("general")}
          />
          <Button
            label="Security & access"
            className={` text-xs! font-normal! ${section === "security" ? "text-(--accent)! bg-(--accent-bg)! border-(--accent)!" : "text-(--text-sec)!"} `}
            onClickFunction={() => {
              setSection("security");
              scrollToSecuritySection();
            }}
          />
          <Button
            label="Notifications"
            className={` text-xs! font-normal! ${section === "notification" ? "text-(--accent)! bg-(--accent-bg)! border-(--accent)!" : "text-(--text-sec)!"} `}
            onClickFunction={() => setSection("notification")}
          />
          <Button
            label="Integrations"
            className={` text-xs! font-normal! ${section === "integrations" ? "text-(--accent)! bg-(--accent-bg)! border-(--accent)!" : "text-(--text-sec)!"} `}
            onClickFunction={() => setSection("integrations")}
          />
          <Button
            label="Audit & retention"
            className={` text-xs! font-normal! ${section === "audit" ? "text-(--accent)! bg-(--accent-bg)! border-(--accent)!" : "text-(--text-sec)!"} `}
            onClickFunction={() => setSection("audit")}
          />
        </div>
      </div> */}

      {/* main content */}
      {/* sections */}
      <div className="grid xl:grid-cols-2 gap-4">
        {/* general settings  */}
        <div className="xl:col-span-2 bg-(--bg-sec) p-4 border rounded-md border-(--border) flex flex-col gap-6">
          {/* header */}
          <CardHeader
            Icon={BuildingComplex}
            heading="General"
            desc="Organization identity and workspace defaults."
          />

          {/* inputs  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 xl:gap-x-25 gap-y-4">
            <Input name="Organization name" className="bg-(--bg)!" />
            <Input name="Workplace name" className="bg-(--bg)!" />
            <Input name="Primary domain" className="bg-(--bg)!" />
            <Input name="Security contact" className="bg-(--bg)!" />
            <Input name="Workplace timezone" className="bg-(--bg)!" />
            <Input name="Data residency" className="bg-(--bg)!" />
          </div>

          {/* general settings footer */}
          <p className="text-xs text-(--text-sec)">
            Workspace ID: ORG-CSG-001 · All incident and audit timestamps use
            this timezone.
          </p>
        </div>

        {/* security */}
        <div className="bg-(--bg-sec) p-4 border border-(--border) rounded-md flex flex-col gap-6">
          {/* header */}
          <CardHeader
            Icon={ShieldCheck}
            heading="Security & access"
            desc="Protect every analyst session and privileged action."
          />

          {/* session time dropdown */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* idle session */}
            <div className="w-full">
              <label
                htmlFor="idle-session"
                className="inline-block text-xs text-(--text-sec) font-medium mb-1"
              >
                Idle session timeout
              </label>
              <div className="w-full bg-(--bg) border border-(--border) p-2 rounded-md ">
                <select
                  name="idle-session"
                  id="idle-session"
                  className="w-full text-md"
                >
                  <option value="8">8 min</option>
                </select>
              </div>
            </div>

            {/* max session */}
            <div className="w-full">
              <label
                htmlFor="max-session"
                className="inline-block text-xs text-(--text-sec) font-medium mb-1"
              >
                Maximum session length
              </label>
              <div className="w-full bg-(--bg) border border-(--border) p-2 rounded-md ">
                <select
                  name="max-session"
                  id="max-session"
                  className="w-full text-md"
                >
                  <option value="8">8 min</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="h-0.1 text-(--border)" />

          {/* mfa settings */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Require multi-factor authentication
              </h3>
              <p className="text-xs text-(--text-sec)">
                All analysts · FIDO2 key or authenticator app.
              </p>
            </div>
            <ToggleButton />
          </div>

          {/* aproval for critical action */}
          <div className="flex justify-between items-center gap-4 ">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Require approval for critical actions
              </h3>
              <p className="text-xs text-(--text-sec)">
                A second analyst must approve host isolation and emergency
                access.
              </p>
            </div>
            <ToggleButton />
          </div>

          {/* info */}
          <div className="bg-(--accent-bg) flex p-3 items-start gap-2 rounded-md">
            <Info size={15} className="text-(--text-sec)" />
            <p className="text-xs text-(--text-sec)">
              Policy changes require workspace administrator approval and are
              recorded in Audit Logs.
            </p>
          </div>
        </div>

        {/* notifications */}
        <div className="bg-(--bg-sec) p-4 border border-(--border) rounded-md flex flex-col gap-6">
          {/* header */}
          <CardHeader
            Icon={Bell}
            heading="Notifications"
            desc="Workspace defaults for incident and platform alerts."
          />

          {/* security mail input */}
          <Input />

          <hr className="h-0.1 text-(--border)" />

          {/* email for critical incidents */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Critical & high-severity incidents
              </h3>
              <p className="text-xs text-(--text-sec)">
                Immediate email and in-app delivery to the on-call team.
              </p>
            </div>
            <ToggleButton />
          </div>

          {/* integration alerts */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Integration health alerts
              </h3>
              <p className="text-xs text-(--text-sec)">
                Notify workspace admins when a connector stops syncing.
              </p>
            </div>
            <ToggleButton />
          </div>

          {/* daily digest */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text-text) font-medium mb-1">
                Daily posture digest
              </h3>
              <p className="text-xs text-(--text-sec)">
                Daily summary at 08:00 UTC. Critical alerts are never muted.
              </p>
            </div>
            <ToggleButton />
          </div>
        </div>

        {/* integrations */}
        <div className="bg-(--bg-sec) p-4 border border-(--border) rounded-md flex flex-col gap-6 ">
          {/* header */}
          <CardHeader
            Icon={Plug}
            heading="Integrations"
            desc="Connected services for SecOps Command."
          />

          {/* microsoft extra id */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text) font-semibold mb-1">
                Microsoft Entra ID
              </h3>
              <p className="text-xs text-(--text-sec)">
                SSO + directory sync · Synced 2 min ago
              </p>
            </div>
            <LowTag text="Connected" />
          </div>

          <hr className="h-0.2 text-(--border)" />

          {/* crowd strike falcon */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text) font-semibold mb-1">
                CrowdStrike Falcon
              </h3>
              <p className="text-xs text-(--text-sec)">
                3,842 endpoints · Synced 1 min ago
              </p>
            </div>
            <LowTag text="Connected" />
          </div>

          <hr className="h-0.2 text-(--border)" />

          {/* splunk enterprise */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text) font-semibold mb-1">
                Splunk Enterprise
              </h3>
              <p className="text-xs text-(--text-sec)">
                API token expires in 7 days
              </p>
            </div>
            <MediumTag text="Review" />
          </div>

          {/* manage integrations button */}
          <Button
            className="w-fit"
            label="Manage integrations"
            Icon={ArrowUpRight}
            iconSize={15}
          />
        </div>

        {/* audit section */}
        <div className="bg-(--bg-sec) p-4 border border-(--border) rounded-md flex flex-col gap-6">
          {/* header  */}
          <CardHeader
            Icon={Database}
            heading="Audit & retentions"
            desc="Preserve evidence and meet compliance requirements."
          />

          {/* audit time limit dropdowns */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* searchable audit logs */}
            <div className="w-full">
              <label
                htmlFor="idle-session"
                className="inline-block text-xs text-(--text-sec) font-medium mb-1"
              >
                Searchable audit logs
              </label>
              <div className="w-full bg-(--bg) border border-(--border) p-2 rounded-md ">
                <select
                  name="idle-session"
                  id="idle-session"
                  className="w-full text-md"
                >
                  <option value="8">365 days</option>
                </select>
              </div>
            </div>

            {/* evidence archive  */}
            <div className="w-full">
              <label
                htmlFor="max-session"
                className="inline-block text-xs text-(--text-sec) font-medium mb-1"
              >
                Evidence archive
              </label>
              <div className="w-full bg-(--bg) border border-(--border) p-2 rounded-md ">
                <select
                  name="max-session"
                  id="max-session"
                  className="w-full text-md"
                >
                  <option value="8">7 years</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="h-0.2 text-(--border)" />

          {/* immutable audit trail */}
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-md text-(--text) font-semibold mb-1">
                Immutable audit trail
              </h3>
              <p className="text-xs text-(--text-sec)">
                Cryptographically sign analyst and AI actions. Required by
                organization policy.
              </p>
            </div>
            <ToggleButton />
          </div>
          <p className="text-xs text-(--text-sec)">
            Storage region: US East (Virginia). Retention updates apply to new
            records; existing evidence is preserved.
          </p>

          {/* vidw logs button */}
          <Button
            label="View audit logs"
            Icon={ArrowUpRight}
            iconSize={15}
            className="w-fit"
          />
        </div>
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

export default Settings;
