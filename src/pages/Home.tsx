import { useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import AddStudentCard from "../components/AddStudentCard"


function Home() {
  const [students, setStudents] = useState<IStudent[]>([{
    index: 0,
    name: '',
    cognitive: 0,
    social: 0,
    gender: "boy",
  }])

  const addStudent = () => {
    let newStudents = [...students]

    newStudents.push({
      index: newStudents.length,
      name: '',
      cognitive: 0,
      social: 0,
      gender: "boy",
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

  console.log(students)
  return (
    <>
      <div>
        <p className="m-4 text-xl">You currently have {students.length} {students.length==1 ? "student" : "students" }</p>
        {students.map((student, index) => {
          console.log(index, students.length)
          return <AddStudentCard
            key={index}
            student={student}
            editStudent={editStudent}
            finalStudent={index == students.length - 1 && index != 0}
            deleteStudent={deleteStudent}
          />
        })}

        <button
          className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4"
          onClick={addStudent}>
          Add student</button>
      </div>
    </>
  )
}

export default Home
