import { IStats } from "../algoritme/helpers/test";
import { IStudent } from "./studentInterface";

export interface IGroups {
  groups: number[][];
  iterations: number;
  stats: IStats[];
}

export interface ISavedGroups {
  name: string;
  groupOne: IStudent[];
  groupTwo: IStudent[];
  stats: IStats[];
}
