import { FC } from "react"
import { IStudent } from "../interfaces/studentInterface"
import SearchStudentsDropdown from "./SearchStudentsDropdown"

interface Props {
    student: IStudent,
    editStudent: Function,
    finalStudent: boolean,
    deleteStudent: Function,
    students: IStudent[]
}

const AddStudentCard: FC<Props> = ({ student, editStudent, finalStudent, deleteStudent, students }) => {

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStudent = { ...student }
        newStudent.name = event.target.value
        editStudent(newStudent)
    }
    const handleCognitiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) <= 5 && Number(event.target.value) >= 1) {
            const newStudent = { ...student }
            newStudent.cognitive = Number(event.target.value)
            editStudent(newStudent)
        }
    }
    const handleSocialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) <= 5 && Number(event.target.value) >= 1) {
            const newStudent = { ...student }
            newStudent.social = Number(event.target.value)
            editStudent(newStudent)
        }
    }
    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStudent = { ...student }
        newStudent.gender = event.target.value
        editStudent(newStudent)
    }

    const handleAddFriend = (newStudent: IStudent) => {
        const newStudents = [...students]
        newStudents[student.index] = newStudent
        editStudent(newStudents)
    }
    console.log(String(student.friends[0]))
    return (
        <div className="flex p-3 items-center bg-gray-50 mb-3">
            <input className="bg-gray-200 mr-5 p-1 rounded-sm" type="text" value={student.name} onChange={handleNameChange} />

            <p >Cognitive level: </p>
            <input className="bg-gray-200 mr-5 p-1 rounded-sm" type="number" max="5" min="1" value={student.cognitive} onChange={handleCognitiveChange} />

            <p className="mr-1">Social level: </p>
            <input className="bg-gray-200 mr-5 p-1 rounded-sm" type="number" max="5" min="1" value={student.social} onChange={handleSocialChange} />

            <select className="bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer" value={student.gender} onChange={handleGenderChange}>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
            </select>

            {String(student.friends[0]) != "null" && String(student.friends[0]) !== "undefined"
                ? <SearchStudentsDropdown
                    currentStudentIndex={student.index}
                    SelectorIndex={0}
                    students={students}
                    handleAddFriend={handleAddFriend} />
                : null}

            {String(student.friends[1]) != "null" && String(student.friends[1]) !== "undefined"
                ? <SearchStudentsDropdown
                    currentStudentIndex={student.index}
                    SelectorIndex={1}
                    students={students}
                    handleAddFriend={handleAddFriend} />
                : null}

            {String(student.friends[2]) != "null" && String(student.friends[2]) !== "undefined"
                ? <SearchStudentsDropdown
                    currentStudentIndex={student.index}
                    SelectorIndex={2}
                    students={students}
                    handleAddFriend={handleAddFriend} />
                : null}

            {finalStudent ?
                <button className="bg-red-200 p-1 rounded-sm hover:cursor-pointer hover:bg-red-300" onClick={() => { deleteStudent() }}>Remove Student</button> : null}
        </div>
    )
}

export default AddStudentCard