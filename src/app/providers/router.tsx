import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomePage from "../../pages/home";
import RepoInfo from "../../pages/repo-info";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/:repoId" element={<RepoInfo />} />
    </Route>
  )
);
