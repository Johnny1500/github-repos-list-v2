import { useState, useEffect, useDeferredValue } from "react";
import { useLazyQuery } from "@apollo/client";
import useStore from "../../shared/model/store";
import {
  GET_SCHEMA,
  GET_REPOSITORY_SCHEMA_FIELD,
  GET_OWN_REPOSITORIES,
  GET_REPOSITORIES_BY_NAME,
} from "./api/queries";

import { RepositoryEdge } from "../../shared/model/interfaces";
import Paginator from "../../app/widgets/paginator";

export default function HomePage() {
  let repoListContent: JSX.Element = <p>Loading...</p>;

  const [repos, setRepos] = useState<RepositoryEdge[]>([]);

  const [currentPage, setCurrentPage, query, setQuery, setBtnCount] = useStore(
    (state) => [
      state.currentPage,
      state.setCurrentPage,
      state.query,
      state.setQuery,

      state.setBtnCount,
    ]
  );

  const deferredQuery = useDeferredValue(query);

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
      setCurrentPage(0);
      getOwnRepos();
    }
  }, [deferredQuery, getReposByName, getOwnRepos, setCurrentPage]);

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
          defaultValue={query}
          style={{ maxWidth: "900px" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {repoListContent}
      <Paginator />
    </main>
  );
}
