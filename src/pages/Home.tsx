import { useEffect, useRef, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import AddStudentCard from "../components/AddStudentCard"
import { Link } from "react-router-dom"


function Home() {
  const [students, setStudents] = useState<IStudent[]>(
    localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students") || "{}")
      : [{
        index: 0,
        name: "",
        cognitive: 0,
        social: 0,
        gender: "boy",
        friends: [],
      }])

  const addFriendsDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students))
  }, [students])

  // console.log(students)
  const addStudent = () => {
    let newStudents = [...students]

    newStudents.push({
      index: newStudents.length,
      name: "",
      cognitive: 0,
      social: 0,
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

  return (
    <>
      <p className="m-4 text-xl">You currently have {students.length} {students.length == 1 ? "student" : "students"}</p>
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
        Add student</button>

      <button className="bg-lime-200 p-2 rounded-sm hover:bg-lime-300 m-4 hover:cursor-pointer" onClick={addFriendsDialog}>Add student's friends</button>
      <dialog
        ref={addFriendsDialogRef}
        className="p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
          <h1 className="font-bold">Assign Student Friendships</h1>
          <p>Now that you have entered all student information, it’s time to let each student select their preferred groupmates. </p>
          <br />
          <ol className="list-decimal ml-6">
            <li>Call a student over and ask them to choose the classmates they would like to be grouped with.</li>
            <li>Once the student has made their selections, confirm and proceed to the next student.</li>
            <li>Repeat until all students have provided their choices.</li>
          </ol>
          <div className="text-right">
            <button
              className="bg-red-200 p-2 rounded-sm hover:bg-red-300 hover:cursor-pointer mr-2"
              onClick={addFriendsDialog}>
              Cancel</button>
            <Link
              className="bg-emerald-200 p-2.5 rounded-sm hover:bg-emerald-300 hover:cursor-pointer"
              to={"/select-friends"}>
              begin</Link>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Home 
