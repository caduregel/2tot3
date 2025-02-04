import { useState } from "react"
import NavBar from "./components/NavBar"
import { IStudent } from "./interfaces/studentInterface"
import AddStudentCard from "./components/AddStudentCard"
import { Outlet } from "react-router-dom"


function App() {
  return (
    <>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </>
  )
}

export default App
