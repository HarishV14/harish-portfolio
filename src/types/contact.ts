import { IconType } from "react-icons";

export interface ContactInfo {
  id: string;
  label: string;
  value: string;
  icon: IconType;
  href: string;
}

export interface ContactData {
  title: string;
  description: string;
  availabilityBadge: string;
  info: ContactInfo[];
}
