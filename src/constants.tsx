import { Icon } from "@iconify/react";
import { SideNavItem } from "./types.jsx";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" className="text-blue-600" />,
  },
  {
    title: "Services",
    path: "/services",
    icon: <Icon icon="lucide:folder" width="24" height="24" className="text-blue-600" />,
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
            title: "Agency Information",
            path: "/services/factory-act/agency-information",
          },
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


        ],
      },
    ],
  },
  {
    title: "Inspection View",
    path: "/inspection-view",
    icon: <Icon icon="lucide:mail" width="24" height="24" className="text-blue-600" />,
  },
];
