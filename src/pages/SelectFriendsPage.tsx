import { useEffect, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import SearchStudentsDropdown from "../components/SearchStudentsDropdown"
import { Link } from "react-router-dom"
import BreadCrumbs, { IPath } from "../components/BreadCrumbs"

function SelectFriendsPage() {
    const [students, setStudents] = useState<IStudent[]>(JSON.parse(localStorage.getItem("students") || "{}"))
    const [currentStudent, setCurrentStudent] = useState<number>(
        localStorage.getItem('currentStudent')
            ? JSON.parse(localStorage.getItem('currentStudent') || "{}") > students.length - 1
                ? 0
                : JSON.parse(localStorage.getItem('currentStudent') || "{}")
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

    const path: IPath = {
        links: [
            {
                href: "/input-students",
                label: "Proberen"
            },
        ],
        current: "vriendjes kiezen"
    }
    return (
        <div>
            <BreadCrumbs path={path} />
            <div className="flex items-center mb-10 flex-col justify-items-center">
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

                <div className="mt-5">
                    {currentStudent == 0
                        ? <Link
                            to="/input-students"
                            className="bg-gray-200 p-2.5 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                        >Go Back</Link>
                        : <button
                            className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                            onClick={() => { handleStudentChange(false) }}> ←Previous Student</button>
                    }
                    {currentStudent == students.length - 1
                        ? <Link
                            to="/input-students"
                            className="bg-gray-200 p-2.5 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                        >Done</Link>
                        : <button
                            className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                            onClick={() => { handleStudentChange(true) }}>Next Student →</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default SelectFriendsPage
