import { IStats } from "../algoritme/helpers/test"
import { IStudent } from "./studentInterface"

interface IGroupStats {
    groep1: IStats
    groep2: IStats
}

export interface IGroups {
    groups: number[][]
    iterations: number
    stats: IGroupStats
}

export interface ISavedGroups {
    name: string
    groupOne: IStudent[]
    groupTwo: IStudent[]
    stats: IGroupStats
}