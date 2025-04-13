import { IStats } from "../algoritme/helpers/test";

export interface IGroups {
  groups: number[][];
  iterations: number;
  stats: IStats[];
}

export interface ISavedGroups {
  name: string;
  groups: number[][];
  stats: IStats[];
}
