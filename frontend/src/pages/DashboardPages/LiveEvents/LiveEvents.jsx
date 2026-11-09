import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { Button, EventCard, LiveTag } from "../../../components";
import PageLayout from "../../../layout/PageLayout";
import { Search } from "lucide-react";

const PAGE_WINDOW_SIZE = 5;

function LiveEvents() {
  const setActivePage = useOutletContext();

  // Pagination and filtering state are kept separate so the full filtered
  // collection remains available while only the active page is rendered.
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const [eventsPerPage, setEventsPerPage] = useState(6);
  const [filter, setFilter] = useState("all");

  // Replace this local fixture with the event-stream data source when the API
  // integration is available.
  const eventData = [
    {
      id: 0,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 1,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 2,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "medium",
    },
    {
      id: 3,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "low",
    },
    {
      id: 4,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 5,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 6,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 7,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 8,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 9,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 10,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 11,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 12,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 13,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 14,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 15,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 16,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 17,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 18,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 19,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 20,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 21,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 22,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 23,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 24,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 25,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 26,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 27,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 28,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 29,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 30,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 31,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 32,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 33,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 34,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 35,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 36,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 37,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 38,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 39,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 40,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 41,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 42,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 43,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 44,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 45,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 46,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 47,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 48,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 49,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 50,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 51,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 52,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 53,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 54,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 55,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 56,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 57,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 58,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 59,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 60,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 61,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 62,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 63,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 64,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 65,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 66,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 67,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 68,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 69,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 70,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 71,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 72,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 73,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 74,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 75,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 76,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 77,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 78,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 79,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 80,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 81,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 82,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 83,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 84,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 85,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 86,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 87,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 88,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 89,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 90,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 91,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 92,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 93,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 94,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 95,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 96,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 97,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 98,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
    {
      id: 99,
      date: "09:41:22.049",
      user: "avijit",
      role: "ceo",
      desc: "DNS query payload matching Base64 exfiltration rule",
      ip: "10.0.4.12",
      asset: "DB-SRV-04",
      location: "US-EAST-VA",
      riskValue: "92",
      threatLevel: "critical",
    },
    {
      id: 100,
      date: "09:41:18.734",
      user: "nina",
      role: "analyst",
      desc: "Repeated failed login attempts from unfamiliar source",
      ip: "172.16.8.24",
      asset: "AUTH-SRV-01",
      location: "EU-WEST-DE",
      riskValue: "84",
      threatLevel: "high",
    },
    {
      id: 101,
      date: "09:40:57.211",
      user: "rahul",
      role: "developer",
      desc: "Execution of unsigned PowerShell script on endpoint",
      ip: "10.0.7.33",
      asset: "DEV-WS-12",
      location: "AP-SOUTH-IN",
      riskValue: "78",
      threatLevel: "high",
    },
    {
      id: 102,
      date: "09:40:41.906",
      user: "maya",
      role: "admin",
      desc: "Outbound connection to newly registered suspicious domain",
      ip: "10.0.2.18",
      asset: "WEB-SRV-02",
      location: "US-EAST-NY",
      riskValue: "74",
      threatLevel: "high",
    },
    {
      id: 103,
      date: "09:40:26.483",
      user: "liam",
      role: "operator",
      desc: "Large archive transfer detected outside normal schedule",
      ip: "192.168.10.45",
      asset: "FILE-SRV-03",
      location: "US-WEST-OR",
      riskValue: "67",
      threatLevel: "medium",
    },
    {
      id: 104,
      date: "09:40:09.128",
      user: "sophia",
      role: "manager",
      desc: "Access to restricted customer records without ticket",
      ip: "10.0.5.61",
      asset: "CRM-DB-01",
      location: "EU-CENTRAL-DE",
      riskValue: "61",
      threatLevel: "medium",
    },
    {
      id: 105,
      date: "09:39:52.670",
      user: "noah",
      role: "support",
      desc: "Endpoint antivirus protection disabled",
      ip: "172.20.4.17",
      asset: "SUPPORT-WS-08",
      location: "AP-SOUTHEAST-SG",
      riskValue: "59",
      threatLevel: "medium",
    },
    {
      id: 106,
      date: "09:39:34.052",
      user: "olivia",
      role: "analyst",
      desc: "Suspicious DNS TXT record request observed",
      ip: "10.0.9.14",
      asset: "ANALYTICS-01",
      location: "US-EAST-VA",
      riskValue: "53",
      threatLevel: "medium",
    },
    {
      id: 107,
      date: "09:39:16.819",
      user: "ethan",
      role: "engineer",
      desc: "Port scan activity detected across internal subnet",
      ip: "192.168.20.11",
      asset: "NET-OPS-04",
      location: "EU-WEST-IE",
      riskValue: "46",
      threatLevel: "low",
    },
  ];

  // Derive the visible page from the complete filtered collection.
  const totalPages = Math.ceil(filterData.length / eventsPerPage);
  const firstEventIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filterData.slice(
    firstEventIndex,
    firstEventIndex + eventsPerPage,
  );
  const firstVisiblePage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(PAGE_WINDOW_SIZE / 2),
      totalPages - PAGE_WINDOW_SIZE + 1,
    ),
  );
  const visiblePages = Array.from(
    {
      length: Math.min(PAGE_WINDOW_SIZE, totalPages),
    },
    (_, index) => firstVisiblePage + index,
  );

  // Rebuild the filtered collection and return to the first page whenever the
  // selected threat level changes.
  useEffect(() => {
    setActivePage(1);
    setFilterData(
      eventData.filter(
        (event) => event.threatLevel === filter || filter === "all",
      ),
    );
    setCurrentPage(1);
  }, [filter]);

  // Adjust the page size for the responsive card layout and reset pagination
  // because a viewport change can invalidate the current page.
  useEffect(() => {
    const updateEventsPerPage = () => {
      setEventsPerPage(
        window.innerWidth <= 767
          ? eventData.length
          : window.innerWidth <= 1278
            ? 6
            : 16,
      );
      setCurrentPage(1);
    };

    updateEventsPerPage();
    window.addEventListener("resize", updateEventsPerPage);

    return () => {
      window.removeEventListener("resize", updateEventsPerPage);
    };
  }, []);
  return (
    <PageLayout
      heading="Live Events Stream"
      desc="Millisecond events indexing ingestion tracking endpoints, networks, DNS payloads, and cloud operations."
      live={true}
    >
      {/* Mobile-only live status indicator. */}
      <div className="block xl:hidden">
        <LiveTag />
      </div>

      {/* Search and stream controls. */}
      <div className="w-full p-3 bg-(--bg-sec) rounded-md border border-(--border) flex flex-col xl:flex-row xl:items-center gap-3">
        {/* search */}
        <div className="w-full p-2 bg-(--bg) border border-(--border) flex items-center justify-start gap-2 rounded-md ">
          <Search size={20} className="text-(--text-sec)" />
          <input
            type="text"
            id="live-search"
            name="live-search"
            placeholder="Filter event type, IP, host..."
            className="outline-0 focus:outline-0 leading-0 text-md text-(--text) placeholder:text-(--text-sec) "
          />
        </div>

        {/* filter and buttons */}
        <div className="w-full flex justify-start xl:justify-between gap-2 text-center flex-wrap ">
          {/* filter */}
          <div className="p-2 bg-(--bg) border border-(--border) rounded-md">
            <label htmlFor="filter" className="text-md font-semibold mr-2">
              Security :
            </label>

            <select
              name="filter"
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
              className="text-md font-semibold focus:outline-0 leading-none"
            >
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="all"
              >
                All
              </option>
              <option
                className=" bg-(--bg) text-center text-(--text-sec) p-2 border text-md border-(--border) "
                value="critical"
              >
                Critical
              </option>
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="high"
              >
                High
              </option>
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="medium"
              >
                Medium
              </option>
              <option
                className="bg-(--bg) text-center text-(--text-sec) p-2 border border-(--border) "
                value="low"
              >
                Low
              </option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="w-30 min-w-0! xl:self-end">
              <Button
                className="border! text-md!  min-w-0!"
                label="Pause Stream"
              />
            </div>

            <div className="w-30 xl:self-end">
              <Button
                className=" border! text-md!  min-w-0!"
                label="CSV Export"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Compact pagination controls for the filtered event collection. */}
      <div className="hidden  md:flex w-full flex-wrap items-center justify-end gap-2">
        {/* previous button */}
        <button
          type="button"
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-(--border) bg-(--bg-sec) px-3 py-2 text-sm font-semibold text-(--text) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {/* pages button */}
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-md border text-sm font-semibold ${
              currentPage === page
                ? "border-(--accent) bg-(--accent) text-(--bg-sec)"
                : "border-(--border) bg-(--bg-sec) text-(--text)"
            }`}
          >
            {page}
          </button>
        ))}

        {/* next button */}
        <button
          type="button"
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="rounded-md border border-(--border) bg-(--bg-sec) px-3 py-2 text-sm font-semibold text-(--text) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Render only the events belonging to the active page. */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4">
        {currentEvents.map((event) => (
          <EventCard key={event.id} index={event.id} data={event} />
        ))}
      </div>
    </PageLayout>
  );
}

export default LiveEvents;
