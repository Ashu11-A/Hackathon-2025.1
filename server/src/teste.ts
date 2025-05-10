import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    // Sem Authorization, só aceitamos JSON da v3
    Accept: 'application/vnd.github.v3+json'
  }
})

interface Repo {
  owner: { login: string };
  name: string;
  description: string | null;
}

interface RepoData {
  fullName: string;        // owner/name
  name: string;            // somente name
  description: string | null;
  tags: string[];          // lista de tags Git
  readme: string | null;   // conteúdo do README.md ou null se não existir
}

/**
 * Busca todos os repositórios públicos de um usuário.
 * @param username — login do usuário no GitHub
 */
async function fetchAllPublicRepos(username: string): Promise<Repo[]> {
  const repos: Repo[] = []
  let page = 1

  while (true) {
    const res = await api.get<Repo[]>(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        page
      }
    })

    if (res.data.length === 0) break
    repos.push(...res.data)
    page++
  }

  return repos
}

/** Busca todas as tags (git tags) de um repositório público */
async function fetchTags(owner: string, repo: string): Promise<string[]> {
  const res = await api.get<{ name: string }[]>(`/repos/${owner}/${repo}/tags`)
  return res.data.map(t => t.name)
}

/** Busca o README.md de um repositório público, decodificando Base64 */
async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await api.get<{ content: string; encoding: string }>(
      `/repos/${owner}/${repo}/readme`
    )
    const buff = Buffer.from(res.data.content, res.data.encoding as BufferEncoding)
    return buff.toString('utf-8')
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null // não existe README.md
    }
    throw err
  }
}

/**
 * Retorna dados agregados de cada repositório público de um usuário:
 * nome, descrição, tags e README.md.
 */
export async function getAllReposData(username: string): Promise<RepoData[]> {
  const repos = await fetchAllPublicRepos(username)

  // Para não estourar o rate‑limit, evite paralelizar tudo de uma vez em
  // grandes quantidades. Aqui usamos um batch simples de 5 em 5.
  const results: RepoData[] = []
  const BATCH_SIZE = 5

  for (let i = 0; i < repos.length; i += BATCH_SIZE) {
    const batch = repos.slice(i, i + BATCH_SIZE)
    const batchData = await Promise.all(
      batch.map(async r => {
        const owner = r.owner.login
        const name = r.name
        const [tags, readme] = await Promise.all([
          fetchTags(owner, name),
          fetchReadme(owner, name)
        ])
        return {
          fullName: `${owner}/${name}`,
          name,
          description: r.description,
          tags,
          readme
        } as RepoData
      })
    )
    results.push(...batchData)
  }

  return results
}

// Exemplo de uso
(async () => {
  const username = 'Ashu11-A'  // substitua pelo usuário desejado
  try {
    const data = await getAllReposData(username)
    console.log(`Repositórios públicos de ${username}:`, data.length)
    data.forEach(repo => {
      console.log(`— ${repo.fullName}`)
      console.log(`   Descrição: ${repo.description ?? '(sem descrição)'}`)
      console.log(`   Tags: ${repo.tags.join(', ') || '(nenhuma)'}`)
      console.log('   README.md:', repo.readme ? `${repo.readme.slice(0,200)}…` : '(não existe)')
    })
  } catch (e) {
    console.error('Erro:', e)
  }
})()
