import { Icon } from "@iconify/react";
import { SideNavItem } from "./types.jsx";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "services",
    path: "/services",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
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
            title: "Plan approval",
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
            title: "Safety Audit report",
            path: "/services/factory-act/safety-audit-report",
          },
          {
            title: "Testing & calibration",
            path: "/services/factory-act/testing-calibration",
          },
          {
            title: "SEP plant Fitness",
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
            title: "Consent To Operate",
            path: "/services/mpcb/consent-to-operate",
          },
          {
            title: "Conent condition Compliance Report",
            path: "/services/mpcb/compliance-report",
          },
          {
            title: "JVS sampling & analysis report",
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
            title: "Carbon Foot Print Study report",
            path: "/services/mpcb/carbon-footprint-study",
          },
        ],
      },
    ],
  },
  
  {
    title: "inspection-view",
    path: "home/inspection-view",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  
];
