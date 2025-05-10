import axios, { type AxiosInstance } from 'axios'
import * as process from 'process'

interface GithubOptions {
  token: string;
}

interface Repo {
  owner: { login: string };
  name: string;
  description: string | null;
}

export interface RepoData {
  fullName: string;
  name: string;
  description: string | null;
  tags: string[];
  readme: string | null;
}

export class Github {
  private api: AxiosInstance

  constructor(options: GithubOptions) {
    if (!options.token) throw new Error('Token do GitHub é obrigatório.')

    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${options.token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })
  }

  async fetchAllRepos(): Promise<Repo[]> {
    const repos: Repo[] = []
    let page = 1

    while (true) {
      const res = await this.api.get<Repo[]>('/user/repos', {
        params: {
          affiliation: 'owner,collaborator,organization_member',
          per_page: 100,
          page,
        },
      })

      if (res.data.length === 0) break
      repos.push(...res.data)
      page++
    }

    return repos
  }

  async fetchTags(owner: string, repo: string): Promise<string[]> {
    const res = await this.api.get<{ name: string }[]>(
      `/repos/${owner}/${repo}/tags`
    )
    return res.data.map((tag) => tag.name)
  }

  async fetchReadme(owner: string, repo: string): Promise<string | null> {
    try {
      const res = await this.api.get<{
        content: string;
        encoding: string;
      }>(`/repos/${owner}/${repo}/readme`)

      const buff = Buffer.from(res.data.content, res.data.encoding as BufferEncoding)
      return buff.toString('utf-8')
    } catch (err: any) {
      if (err.response?.status === 404) return null
      throw err
    }
  }

  public async getAllReposData(): Promise<RepoData[]> {
    const repos = await this.fetchAllRepos()

    const results = await Promise.all(
      repos.map(async (r) => {
        const owner = r.owner.login
        const name = r.name

        const [tags, readme] = await Promise.all([
          this.fetchTags(owner, name),
          this.fetchReadme(owner, name),
        ])

        return {
          fullName: `${owner}/${name}`,
          name,
          description: r.description,
          tags,
          readme,
        }
      })
    )

    return results
  }
}
