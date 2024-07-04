export interface RepositoryNode {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
}

export interface RepositoryEdge {
  node: RepositoryNode;
}
