import {getCommits} from "@/app/api/_services/github/github.getters";
import {CommitsSchema} from "@/app/api/_services/github/github.types";
import {CommitResponse} from "@/app/types/api";

export async function POST(request: Request): Promise<Response> {
    const { userName, name, updated_at } = await request.json()
    try {
        const maybeCommits = await getCommits(userName, name, updated_at)
        const commits = CommitsSchema.parse(maybeCommits)
        const responseBody: CommitResponse = {type: 'success', data: commits[0]}
        return Response.json(responseBody)
    } catch (e: unknown) {
        let reason = 'Server Error'
        if (e instanceof Error) {
            reason = e.message
        }
        const responseBody: CommitResponse = {type: 'fail', reason}
        return Response.json(responseBody)
    }

}