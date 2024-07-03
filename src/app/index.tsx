import "./ui/index.css";

import { ApolloProvider } from "@apollo/client";
import client from "./providers/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
