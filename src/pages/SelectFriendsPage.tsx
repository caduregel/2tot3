import { useEffect, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import SearchStudentsDropdown from "../components/SearchStudentsDropdown"
import { Link } from "react-router-dom"

function SelectFriendsPage() {
    const [students, setStudents] = useState<IStudent[]>(JSON.parse(localStorage.getItem("students") || "{}"))
    const [currentStudent, setCurrentStudent] = useState<number>(
        localStorage.getItem('currentStudent')
            ? JSON.parse(localStorage.getItem('currentStudent') || "{}")
            : 0)

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students))
    }, [students])

    useEffect(() => {
        localStorage.setItem('currentStudent', JSON.stringify(currentStudent))
    }, [currentStudent])

    const handleStudentChange = (nextStudent: boolean) => {
        if (nextStudent) {
            if (currentStudent < students.length - 1) { setCurrentStudent(currentStudent + 1) }
        } else {
            if (currentStudent > 0) { setCurrentStudent(currentStudent - 1) }
        }
    }

    const handleAddFriend = (newStudent: IStudent) => {
        const newStudents = [...students]
        newStudents[currentStudent] = newStudent
        setStudents(newStudents)
    }
    return (

        <div className="grid grid-cols-1 justify-items-center">
            <h1 className="text-xl">Call over <strong>{students[currentStudent].name}</strong> to let them choose their grouping preference</h1>

            <p className="mt-3">friend one: </p>
            <SearchStudentsDropdown
                currentStudentIndex={currentStudent}
                SelectorIndex={0}
                students={students}
                handleAddFriend={handleAddFriend} />

            <p>friend two: </p>
            <SearchStudentsDropdown
                currentStudentIndex={currentStudent}
                SelectorIndex={1}
                students={students}
                handleAddFriend={handleAddFriend} />

            <p>friend three: </p>
            <SearchStudentsDropdown
                currentStudentIndex={currentStudent}
                SelectorIndex={2}
                students={students}
                handleAddFriend={handleAddFriend} />

            <div>
                <button
                    className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                    onClick={() => { handleStudentChange(false) }}> ← Previous Student</button>
                {currentStudent == students.length - 1
                    ? <Link
                    to="/"
                    className="bg-gray-200 p-2.5 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                    onClick={() => { handleStudentChange(true) }}>Done</Link>
                    : <button
                        className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                        onClick={() => { handleStudentChange(true) }}>Next Student →</button>
                }

            </div>
        </div>
    )
}

export default SelectFriendsPage
