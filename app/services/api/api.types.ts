import { GeneralApiProblem } from "./api-problem"

export type GetAstroidListResult = { kind: "ok"; astrioidList: any } | GeneralApiProblem
export type GetAstroidResult = { kind: "ok"; astrioid: any } | GeneralApiProblem