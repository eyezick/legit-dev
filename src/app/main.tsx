import {useCallback, useRef, useState, Fragment} from "react";
import {Commit, Repos} from "@/app/api/_services/github/github.types";
import {getCommitNetworkCall, getReposNetworkCall, submitHashNetworkCall} from "@/app/_services/legitDev";

type Props = {
    reset: (message: string) => void
}
export const Main = ({reset}: Props) => {
    const [userName, setUserName] = useState('')
    const [repos, setRepos] = useState<Repos>([])
    const [commit, setCommit] = useState<Commit | null>(null)
    const [leaf, setLeaf] = useState('')

    const getRepos = useCallback(async ()=> {
        const res = await getReposNetworkCall(userName)
        if (res.type === 'success') {
            setRepos(res.data)
        } else {
            reset(res.reason)
        }
    }, [userName])

    const getCommit = useCallback(async (repo: Repos[number]) => {
       const res = await getCommitNetworkCall({userName, ...repo})
        if (res.type === 'success') {
            setCommit(res.data)
        } else {
            reset(res.reason)
        }
    }, [userName])

    const submitHash = useCallback(async () => {
        if (!commit) return
        const res = await submitHashNetworkCall(commit)
        if (res.type === 'success') {
            setLeaf(res.data.leafHash)
        } else {
            reset(res.reason)
        }
    }, [commit])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-3.5 text-white">Legit Dev</h1>
                <div className="text-white text-center">
                    {!repos.length && (
                        <Fragment>
                            <input className={'text-black'} value={userName} onChange={(e) => setUserName(e.target.value)}
                                   placeholder={'Enter the repo owner'}/>
                            <button className={'ml-2 hover:bg-sky-700'} onClick={getRepos}>Search Repos</button>
                        </Fragment>
                    )}
                    {!!repos.length && !commit && (
                        <div className={'flex flex-col'}>
                            {repos.map(r => (
                                <button key={r.name} className="mb-2 hover:bg-sky-700" onClick={() => getCommit(r)}>{r.name}</button>))}
                        </div>
                    )}
                    {commit && (
                        <div className={'flex-col'}>
                            <a className="mb-px20 underline" href={commit.url} target="_blank">Commit: {commit.sha}</a>
                            {!leaf && (
                                <button className="block mt-2 hover:bg-sky-700 text-6xl border-2" onClick={submitHash}>Witness the latest
                                    commit</button>)}
                        </div>
                    )}
                    {leaf && (
                        <Fragment>
                            <img src={'/mad-max-fury-road.gif'}/>
                            <a className={'underline'} href={`https://scan.witness.co/leaf/${leaf}`} target={'_blank'}>Track your leaf!</a>
                        </Fragment>
                    )}
                </div>
            </div>
        </main>
    );
}