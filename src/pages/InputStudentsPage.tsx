import { useEffect, useRef, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import AddStudentCard from "../components/AddStudentCard"
import { Link } from "react-router-dom"
import { generateRandomStudents } from "../helpers/generateRandomStudents"


function Home() {
  const [students, setStudents] = useState<IStudent[]>(
    localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students") || "{}")
      : [{
        index: 0,
        name: "",
        cognitive: 1,
        social: 1,
        gender: "boy",
        friends: [],
      }])

  const addFriendsDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students))
  }, [students])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // console.log(students)
  const addStudent = () => {
    let newStudents = [...students]

    newStudents.push({
      index: newStudents.length,
      name: "",
      cognitive: 1,
      social: 1,
      gender: "boy",
      friends: [],
    })

    setStudents(newStudents)
  }

  const editStudent = (student: IStudent) => {
    let newStudents = [...students]
    newStudents[student.index] = student

    setStudents(newStudents)
  }

  const deleteStudent = () => {
    let newStudents = [...students]
    newStudents.pop()
    setStudents(newStudents)
  }

  const addFriendsDialog = () => {
    if (!addFriendsDialogRef.current) {
      return
    }
    addFriendsDialogRef.current.hasAttribute("open")
      ? addFriendsDialogRef.current.close()
      : addFriendsDialogRef.current.showModal()

  }

  const fillRandom = () => {
    const randStudents = generateRandomStudents(50)
    setStudents(randStudents)
  }

  const resetStudents = () => {
    setStudents([{
      index: 0,
      name: "",
      cognitive: 1,
      social: 1,
      gender: "boy",
      friends: [],
    }])
  }

  return (
    <div className="mt-5 min-h-screen">
      <div className="flex items-center ml-5">
        <p className="m-4 text-xl">Je hebt nu {students.length} {students.length == 1 ? "leerling" : "leerlingen"}</p>
        <button className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer" onClick={fillRandom}>Willekeurig invullen</button>
        <button className="bg-red-500 p-2 rounded-sm hover:cursor-pointer text-white hover:bg-red-600"
          onClick={resetStudents}>Clear</button>
        {students.length >= 20
          ? <Link className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-sm m-4 hover:cursor-pointer"
            to='/sorting' >Sorteer</Link>
          : <button disabled className="bg-blue-400 text-white p-2 rounded-sm m-4 "
          >Please enter atleast 20 students before sorting</button>}

      </div>
      {students.map((student, index) => {
        return <AddStudentCard
          key={index}
          student={student}
          editStudent={editStudent}
          finalStudent={index == students.length - 1 && index != 0}
          deleteStudent={deleteStudent}
          students={students}
        />
      })}

      <button
        className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
        onClick={addStudent}>
        Voeg leerling toe</button>

      <button className="bg-blue-500 p-2 rounded-sm hover:bg-blue-600 text-white m-4 hover:cursor-pointer" onClick={addFriendsDialog}>Voeg vriendjes toe</button>
      <dialog
        ref={addFriendsDialogRef}
        className="p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
          <h1 className="font-bold">Voeg vriendjes toe</h1>
          <p>Nu je alle leerlinggegevens hebt ingevoerd, is het tijd om elke leerling zijn of haar voorkeursklasgenoten te laten kiezen.</p>
          <br />
          <ol className="list-decimal ml-6">
            <li>Roep een leerling bij je en vraag hem of haar om de klasgenoten te kiezen met wie ze graag ingedeeld willen worden.</li>
            <li>Bevestig de keuzes van de leerling en ga verder naar de volgende leerling.</li>
            <li>Herhaal dit proces totdat alle leerlingen hun voorkeuren hebben doorgegeven.</li>
          </ol>

          <div className="text-right">
            <button
              className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-600 hover:cursor-pointer mr-2"
              onClick={addFriendsDialog}>
              Cancel</button>
            <Link
              className="bg-blue-500 text-white p-2.5 rounded-sm hover:bg-blue-600 hover:cursor-pointer"
              to={"/select-friends"}>
              begin</Link>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Home 
