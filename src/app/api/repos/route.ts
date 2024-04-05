import {getRepos} from "@/app/api/_services/github/github.getters";
import {ReposSchema} from "@/app/api/_services/github/github.types";
import {ReposResponse} from "@/app/types/api";

export async function POST(request: Request): Promise<Response> {
    const { userName } = await request.json()
    try {
        const maybeRepos = await getRepos(userName)
        const repos = ReposSchema.parse(maybeRepos)
        const responseBody: ReposResponse = {type: 'success', data: repos}
        return Response.json(responseBody)
    } catch (e: unknown) {
        let reason = 'Server Error'
        if (e instanceof Error) {
            reason = e.message
        }
        const responseBody: ReposResponse = {type: 'fail', reason}
        return Response.json(responseBody)
    }

}