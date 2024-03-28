import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./components/Root"
import ErrorPage from "./components/ErrorPage"
import ComponentViewer, {loader as componentLoader} from "./components/ComponentViewer"
import ComponentsPage, {loader as allComponentsLoader} from "./components/ComponentsPage"
import ComponentsEditor, {loader as componentEditor} from "./components/ComponentEditor"
import PostComponents from "./components/PostComponents";
import SearchPage from "./components/SearchPage";
import Landing, {loader as CategoryLoader} from "./components/Landing";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    
    children: [
      {
        path: "/",
        element: <Landing />,
        loader: CategoryLoader,
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
        element: <SearchPage />
      },
      {
        path: "/edit/:comp_Id",
        element: <ComponentsEditor />,
        loader: componentEditor
      }     

    ],
  },

]);

function App() {
  return (
    <>
    {/* svg background */}
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
