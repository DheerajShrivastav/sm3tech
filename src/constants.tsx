import { Icon } from "@iconify/react";
import { SideNavItem } from "./types.jsx";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" color="black" />,
  },
  {
    title: "Services",
    path: "/services",
    icon: <Icon icon="lucide:folder" width="24" height="24" color="black" />,
    submenu: true,
    subMenuItems: [
      {
        title: "All",
        path: "/services",
      },
      {
        title: "Factory Act",
        path: "/services/factory-act",
        submenu: true,
        subMenuItems: [
          {
            title: "Plan Approval",
            path: "/services/factory-act/plan-approval",
          },
          {
            title: "Stability Certificate",
            path: "/services/factory-act/stability-certificate",
          },
          {
            title: "Factory License",
            path: "/services/factory-act/factory-license",
          },
          {
            title: "Safety Audit Report",
            path: "/services/factory-act/safety-audit-report",
          },
          {
            title: "Testing & Calibration",
            path: "/services/factory-act/testing-calibration",
          },
          {
            title: "SEP Plant Fitness",
            path: "/services/factory-act/sep-plant-fitness",
          },
        ],
      },
      {
        title: "MPCB",
        path: "/services/mpcb",
        submenu: true,
        subMenuItems: [
          {
            title: "Consent to Establish",
            path: "/services/mpcb/consent-to-establish",
          },
          {
            title: "Consent to Operate",
            path: "/services/mpcb/consent-to-operate",
          },
          {
            title: "Consent Condition Compliance Report",
            path: "/services/mpcb/compliance-report",
          },
          {
            title: "JVS Sampling & Analysis Report",
            path: "/services/mpcb/jvs-sampling-report",
          },
          {
            title: "Form V (Environment Statement / Audit)",
            path: "/services/mpcb/form-v",
          },
          {
            title: "Form IV (Hazardous Waste Returns)",
            path: "/services/mpcb/form-iv",
          },
          {
            title: "Carbon Footprint Study Report",
            path: "/services/mpcb/carbon-footprint-study",
          },
        ],
      },
    ],
  },
  {
    title: "Inspection View",
    path: "/inspection-view", //
    icon: <Icon icon="lucide:mail" width="24" height="24" color="black" />,
  },
];
