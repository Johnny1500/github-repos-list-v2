import { useState, useEffect, useDeferredValue, MouseEvent } from "react";
import { useLazyQuery } from "@apollo/client";
import useStore from "../../shared/model/store";
import {
  GET_SCHEMA,
  GET_REPOSITORY_SCHEMA_FIELD,
  GET_OWN_REPOSITORIES,
  GET_REPOSITORIES_BY_NAME,
} from "./api/queries";

import { RepositoryEdge } from "./model/interfaces";

export default function HomePage() {
  let repoListContent: JSX.Element = <p>Loading...</p>;

  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<RepositoryEdge[]>([]);
  const [btnCount, setBtnCount] = useState<number>(0);

  const deferredQuery = useDeferredValue(query);

  const [currentPage, setCurrentPage] = useStore((state) => [
    state.currentPage,
    state.setCurrentPage,
  ]);

  function handlePaginationClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const btn = target.closest("button");

    if (!btn) return;

    setCurrentPage(+btn.value);
  }

  const [
    getReposByName,
    {
      loading: getReposByNameLoading,
      error: getReposByNameError,
      data: getReposByNameData,
    },
  ] = useLazyQuery(GET_REPOSITORIES_BY_NAME, {
    onCompleted(data) {
      const {
        search: { edges },
      } = data;

      setBtnCount(Math.ceil(edges.length / 10));
      setRepos(edges);
    },
  });

  const [
    getOwnRepos,
    {
      loading: getOwnReposLoading,
      error: getOwnReposError,
      data: getOwnReposData,
    },
  ] = useLazyQuery(GET_OWN_REPOSITORIES, {
    onCompleted(data) {
      const {
        viewer: {
          repositories: { edges },
        },
      } = data;

      setBtnCount(Math.ceil(edges.length / 10));

      setRepos(edges);
    },
  });

  useEffect(() => {
    if (deferredQuery.length > 1) {
      getReposByName({
        variables: {
          queryString: `name:${deferredQuery}`,
        },
      });
    } else {
      getOwnRepos();
    }
  }, [deferredQuery, getReposByName, getOwnRepos]);

  if (getReposByNameLoading || getOwnReposLoading) {
    repoListContent = <p>Loading...</p>;
  }

  if (getReposByNameError)
    repoListContent = <p>Error : {getReposByNameError.message}</p>;
  if (getOwnReposError)
    repoListContent = <p>Error : {getOwnReposError.message}</p>;

  if (getReposByNameData || getOwnReposData) {
    repoListContent = (
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

  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginLeft: "20px",
        }}
      >
        <label htmlFor="search">Поиск по названию</label>
        <input
          type="text"
          id="searh"
          name="search"
          style={{ maxWidth: "900px" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {repoListContent}
      <div
        style={{
          display: "flex",
          gap: "5px",
          width: "100%",
          justifyContent: "center",
          marginTop: "50px",
        }}
        onClick={(e) => handlePaginationClick(e)}
      >
        {Array.from({ length: btnCount }).map((_, index) => {
          return (
            <button
              key={index}
              value={index}
              style={{
                backgroundColor: index === currentPage ? "white" : "black",
                color: index === currentPage ? "black" : "white",
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </main>
  );
}
