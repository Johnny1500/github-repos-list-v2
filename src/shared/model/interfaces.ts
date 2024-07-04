export interface RepositoryOwner {
  avatarUrl: string;
  login: string;
  url: string;
}

export interface RepositoryNode {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  description: string;
  url?: string;
  owner?: RepositoryOwner;
  languages?: LanguageConnection;
}

export interface RepositoryEdge {
  node: RepositoryNode;
}

export interface LanguageNode {
  name: string;
}

export interface LanguageConnection {
  nodes: LanguageNode[];
}
