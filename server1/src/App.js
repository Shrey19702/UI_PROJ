import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as rootLoader } from "./components/Root"
import ErrorPage from "./components/ErrorPage"
import ComponentViewer, {loader as componentLoader} from "./components/ComponentViewer"
import PostComponents from "./components/PostComponents";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    
    children: [
      {
        path: "component/:comp_Id",
        element: <ComponentViewer />,
        loader: componentLoader,
      },
      {
        path: "post-component",
        element: <PostComponents />
      }
    ],
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
