import {Commit, Repos} from "@/app/api/_services/github/github.types";

export type ResponsePayload<T> = {type: 'success', data: T} | {type: 'fail', reason: string}

export type CommitResponse = ResponsePayload<Commit>

export type ReposResponse = ResponsePayload<Repos>

export type WitnessResponse = ResponsePayload<{leafHash: `0x${string}`}>

