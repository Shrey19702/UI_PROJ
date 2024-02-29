import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as rootLoader } from "./components/Root"
import ErrorPage from "./components/ErrorPage"
import ComponentViewer, {loader as componentLoader} from "./components/ComponentViewer"


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
    ],
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
