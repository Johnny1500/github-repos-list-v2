import useStore from "../../../shared/model/store";
import { RepositoryEdge } from "../../../shared/model/interfaces";

// Отображенные репозитории
export default function RepoList(): JSX.Element {
  const [repos, currentPage] = useStore((state) => [
    state.repos,
    state.currentPage,
  ]);

  return (
    <ul>
      {repos
        .slice(currentPage * 10, (currentPage + 1) * 10)
        .map((edge: RepositoryEdge) => {
          const {
            node: { id, name, stargazerCount, updatedAt, url },
          } = edge;

          return (
            <li key={id}>
              {name} - {stargazerCount} - {updatedAt} - {url}
            </li>
          );
        })}
    </ul>
  );
}
