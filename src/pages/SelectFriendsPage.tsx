import { useEffect, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"

function SelectFriendsPage() {
    const [students] = useState<IStudent[]>(JSON.parse(localStorage.getItem("students") || "{}"))
    const [currentStudent, setCurrentStudent] = useState<number>(
        localStorage.getItem('currentStudent')
            ? JSON.parse(localStorage.getItem('currentStudent') || "{0}")
            : 0 )


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

    return (

        <div className="grid grid-cols-1 justify-items-center">
            <h1 className="text-xl">Call over <strong>{students[currentStudent].name}</strong> to let them choose their grouping preference</h1>

            <div>
                <button
                    className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                    onClick={() => { handleStudentChange(false) }}> ← Previous Student</button>
                <button
                    className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                    onClick={() => { handleStudentChange(true) }}>Next Student →</button>
            </div>
        </div>
    )
}

export default SelectFriendsPage
