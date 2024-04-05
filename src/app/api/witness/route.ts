import { WitnessResponse} from "@/app/types/api";
import {witnessHash} from "@/app/api/_services/witness/witness.creators";

export async function POST(request: Request){
    const { hash } = await request.json()
    try {
        const { leafHash } = await witnessHash(hash)
        const responseBody: WitnessResponse = {type: 'success', data: {leafHash}}
        return Response.json(responseBody)
    } catch (e: unknown) {
        let reason = 'Server Error'
        if (e instanceof Error) {
            reason = e.message
        }
        const responseBody: WitnessResponse = {type: 'fail', reason}
        return Response.json(responseBody)
    }

}