import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom"


function App() {
  return (
    <>
      <div className="w-screen">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
