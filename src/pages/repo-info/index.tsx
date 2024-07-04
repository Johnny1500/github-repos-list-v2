import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { GET_REPOSITORY_BY_ID } from "./api/queries";
import { RepositoryEdge } from "../../shared/model/interfaces";
import "./ui/index.css";

export default function RepoInfo(): JSX.Element {
  const { pathname } = useLocation();

  const repoId = pathname.split("/")[1];

  const { loading, error, data } = useQuery<RepositoryEdge>(
    GET_REPOSITORY_BY_ID,
    {
      variables: {
        id: repoId,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const {
    node: {
      id,
      name,
      stargazerCount,
      updatedAt,
      owner,
      languages,
      description,
    },
  } = data!;

  const { avatarUrl, login, url } = owner!;
  const { nodes } = languages!;

  return (
    <section key={id} className="repo__container">
      <h1 className="repo__header">Подробные сведения о репозитории</h1>
      <div>
        {name} - {stargazerCount} - {updatedAt}
      </div>
      <div>
        <h2 style={{ fontSize: "medium" }}>Владелец</h2>
        <div className="repo__owner">
          <img src={avatarUrl} alt="photo" width={50} height={50} />
          <span>-</span>
          <a href={url}>{login}</a>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: "medium" }}>Языки</h2>
        <ul>
          {nodes.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 style={{ fontSize: "medium" }}>Описание</h2>
        <p>{description ?? "Нет описания"}</p>
      </div>
    </section>
  );
}
