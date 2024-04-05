import { WitnessClient } from "@witnessco/client";

const witness = new WitnessClient();

export const witnessHash = async (hash: string) => {
    const sha256 = witness.hash(hash)
    return await witness.postLeaf(sha256)
}