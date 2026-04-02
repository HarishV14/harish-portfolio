import { IconType } from "react-icons";

export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  description: string;
}

export interface SkillPoint {
  skill: Skill;
  x: number;
  y: number;
  z: number;
}
