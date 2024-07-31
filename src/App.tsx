import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainRoutes } from "./routes/MainRoutes";


function App() {

  return (
    <>
      <MainRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}

export default App
