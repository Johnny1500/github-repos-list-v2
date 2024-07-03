import { useQuery } from "@apollo/client";
import useStore from "../../shared/model/store";
import { GET_SCHEMA, GET_REPOSITORY_SCHEMA_FIED, GET_REPOSITORIES } from "./api/queries";

export default function HomePage() {
  const currentPage = useStore((state) => state.currentPage);

  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data) console.log("data === ", data);

  console.log("currentPage === ", currentPage);

  return <div>Test3</div>;
}
