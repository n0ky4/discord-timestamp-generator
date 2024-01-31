export interface Contributor {
    username: string
    url: string
    avatar: string
}

export function getContributors() {
    const repo = import.meta.env.VITE_GITHUB_REPO_URL.split('/').slice(-2).join('/')
    return fetch(`https://api.github.com/repos/${repo}/contributors`)
        .then((res) => res.json())
        .then((data) => {
            const contributors = data
                .map((contributor: any) => ({
                    username: contributor.login,
                    url: contributor.html_url,
                    avatar: contributor.avatar_url + '&s=128', // 128 cause 40 has jpeg artifacts
                }))
                .filter((c: any) => c.username !== import.meta.env.VITE_GITHUB_AUTHOR_USERNAME)
            return contributors
        })
}
