import { ReactNode } from 'react';

// SubMenuItem interface
export interface SubMenuItem {
  title: string;
  path: string;
  icon?: ReactNode; 
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
}

// SideNavItem interface with optional submenu and subMenuItems
export interface SideNavItem {
  title: string;
  path: string;
  icon?: ReactNode; // Use ReactNode for JSX elements like icons
  submenu?: boolean; // Optional submenu flag
  subMenuItems?: SubMenuItem[]; // Optional submenu items array
  badge?: number; // Optional badge for notifications or counts
}
