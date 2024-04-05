import {CommitResponse, ReposResponse, WitnessResponse} from "@/app/types/api";
import {Commit} from "@/app/api/_services/github/github.types";

export const getReposNetworkCall = async (userName: string): Promise<ReposResponse> => {
    const response = await fetch('/api/repos', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userName}),
    })
    return response.json()
}

export const getCommitNetworkCall = async ({userName, name, updated_at}: {userName: string, name: string, updated_at: string}): Promise<CommitResponse> => {
    const response = await fetch('/api/commit', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userName, name, updated_at}),
    })
    return response.json()
}

export const submitHashNetworkCall = async (commit: Commit) => {
    const response = await fetch('/api/witness', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({hash: commit.sha}),
    })
    return response.json()
}