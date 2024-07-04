import { useState, useEffect, useDeferredValue } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import useStore from "../../shared/model/store";
import {
  GET_SCHEMA,
  GET_REPOSITORY_SCHEMA_FIED,
  GET_OWN_REPOSITORIES,
  GET_REPOSITORIES_BY_NAME,
} from "./api/queries";

import { RepositoryEdge } from "./model/interfaces";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const currentPage = useStore((state) => state.currentPage);

  const { loading, error, data } = useQuery(GET_OWN_REPOSITORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // if (data) console.log("data === ", data?.viewer?.repositories?.edges);

  // console.log("currentPage === ", currentPage);

  return (
    <main>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label htmlFor="search">Поиск по названию</label>
        <input
          type="text"
          id="searh"
          name="search"
          style={{ maxWidth: "700px" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {deferredQuery}
      <ul>
        {data?.viewer?.repositories?.edges.map((edge: RepositoryEdge) => {
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
    </main>
  );
}
