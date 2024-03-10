import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as rootLoader } from "./components/Root"
import ErrorPage from "./components/ErrorPage"
import ComponentViewer, {loader as componentLoader} from "./components/ComponentViewer"
import ComponentsPage, {loader as allComponentsLoader} from "./components/ComponentsPage"
import PostComponents from "./components/PostComponents";
import Landing from "./components/Landing";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    
    children: [
      {
        path: "/",
        element: <Landing />
      },
      {
        path: "component/:comp_Id",
        element: <ComponentViewer />,
        loader: componentLoader,
      },
      {
        path: "/components",
        element: <ComponentsPage />,
        loader: allComponentsLoader,
      },
      {
        path: "/create",
        element: <PostComponents />
      },
      {
        path: "/search",
        element: <PostComponents />
      },
      {
        path: "/categories",
        element: <PostComponents />
      }     

    ],
  },

]);

function App() {
  return (
    <>
    <div className="h-screen fixed w-screen bg-black -z-10">
      <svg className=" h-screen w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pattern-1" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d=" M 10 0 V 20 M 0 10 H 20" stroke=" rgb(50, 50, 50) " />
          </pattern>
        </defs>
        <rect fill="url(#pattern-1)" stroke="black" className=" h-screen w-screen" />
      </svg>
    </div>

    <div className="  w-full min-h-screen">
      <RouterProvider router={router} />
    </div>
    </>
  );
}

export default App;
