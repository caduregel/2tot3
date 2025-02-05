import { useEffect, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import AddStudentCard from "../components/AddStudentCard"


function Home() {
  const [students, setStudents] = useState<IStudent[]>(
    localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')  || '{}') :
      [{
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


  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const addFriends = () => {
    console.log('to be made')
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
        />
      })}

      <button
        className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
        onClick={addStudent}>
        Add student</button>

      <button className="bg-lime-200 p-2 rounded-sm hover:bg-lime-300 m-4 hover:cursor-pointer" onClick={addFriends}>Add student's friends</button>

    </>
  )
}

export default Home
