import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "./pages/sign-in/SignIn"
import { SignUp } from "./pages/sign-up/SignUp"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
