import { FC } from "react"
import { IStudent } from "../interfaces/studentInterface"
import SearchStudentsDropdown from "./SearchStudentsDropdown"

interface Props {
    student: IStudent,
    editStudent: Function,
    deleteStudent: Function,
    students: IStudent[],
    addFriend: Function
}

const AddStudentCard: FC<Props> = ({ student, editStudent, deleteStudent, students, addFriend }) => {

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStudent = { ...student }
        newStudent.name = event.target.value
        editStudent(newStudent)
    }

    const handleCognitiveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStudent = { ...student }
        newStudent.cognitive = Number(event.target.value)
        editStudent(newStudent)
    }

    const handleSocialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStudent = { ...student }
        newStudent.social = Number(event.target.value)
        editStudent(newStudent)
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            addFriend()
        }
    }

    return (
        <div className="grid p-3 grid-cols-8 gap-5 bg-gray-50 mb-3 pl-5">
            <input
                className="bg-gray-200 p-1 rounded-sm"
                placeholder="leerling naam..."
                type="text"
                value={student.name}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown} />


            <select className={student.cognitive == 0
                ? "bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer text-sm text-gray-500"
                : "bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer"} value={student.cognitive} onChange={handleCognitiveChange}>
                <option value="0" disabled>Cognitief Niveau</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <select className={student.social == 0
                ? "bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer text-sm text-gray-500"
                : "bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer"}
                value={student.social} onChange={handleSocialChange}>
                <option value="0" disabled>Zorg Niveau</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <select className="bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer" value={student.gender} onChange={handleGenderChange}>
                <option value="boy">Jongen</option>
                <option value="girl">Meisje</option>
            </select>

            {
                String(student.friends[0]) != "null" && String(student.friends[0]) !== "undefined"
                    ? <SearchStudentsDropdown
                        currentStudentIndex={student.index}
                        SelectorIndex={0}
                        students={students}
                        handleAddFriend={handleAddFriend} />
                    : null
            }

            {
                String(student.friends[1]) != "null" && String(student.friends[1]) !== "undefined"
                    ? <SearchStudentsDropdown
                        currentStudentIndex={student.index}
                        SelectorIndex={1}
                        students={students}
                        handleAddFriend={handleAddFriend} />
                    : null
            }

            {
                String(student.friends[2]) != "null" && String(student.friends[2]) !== "undefined"
                    ? <SearchStudentsDropdown
                        currentStudentIndex={student.index}
                        SelectorIndex={2}
                        students={students}
                        handleAddFriend={handleAddFriend} />
                    : null
            }

            {
                students.length > 1 ?
                    <button className="bg-red-200 p-1  mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-red-300" onClick={() => { deleteStudent(student.index) }}>Verwijder</button> : null
            }
        </div >
    )
}

export default AddStudentCard