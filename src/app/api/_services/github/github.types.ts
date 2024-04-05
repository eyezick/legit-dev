import z from 'zod'

export const CommitSchema = z.object({
    url: z.string().url(),
    sha: z.string(),
    node_id: z.string(),
});

export const CommitsSchema = z.array(
    CommitSchema
);
export type Commit = z.infer<typeof CommitSchema>

const RepoSchema = z.object({
    name: z.string(),
    updated_at: z.string()
})

export const ReposSchema = z.array(RepoSchema)

export type Repos = z.infer<typeof ReposSchema>


