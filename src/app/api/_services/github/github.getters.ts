"use server"

import {GITHUB_API} from "@/app/api/_services/github/github.constants";

export const getRepos = async (owner: string) => {
    const res = await fetch(`${GITHUB_API}/users/${owner}/repos`, {
        method: 'GET',
        headers: {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            'Authorization': `Bearer ${process.env.GITHUB_API_KEY}`,
        }})
    return res.json()
}

export const getCommits = async (owner: string, repo: string, since: string) => {
    const sinceTime = new Date(since).getTime()
    const fetchTime = sinceTime - 604800000 //1 week buffer, someone should have committed with 1 week
    //this should be updated
    const sinceParam = new Date(fetchTime).toISOString().replace('.000', '')
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/commits?since=${sinceParam}`, {
        method: 'GET',
        headers: {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            'Authorization': `Bearer ${process.env.GITHUB_API_KEY}`,
        }})

    return res.json()
}