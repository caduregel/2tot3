import { IStats } from "../algoritme/helpers/test"

interface IGroupStats {
    groep1: IStats
    groep2: IStats
}

export interface IGroups {
    groups: number[][]
    iterations: number
    stats: IGroupStats
}