import { FC } from "react"
import { IStudent } from "../interfaces/studentInterface"

interface Props {
    student: IStudent,
    editStudent: Function,
    finalStudent: boolean,
    deleteStudent: Function,
}

const AddStudentCard: FC<Props> = ({ student, editStudent, finalStudent, deleteStudent }) => {

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStudent = { ...student }
        newStudent.name = event.target.value
        editStudent(newStudent)
    }
    const handleCognitiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) <= 5 && Number(event.target.value) >= 0) {
            const newStudent = { ...student }
            newStudent.cognitive = Number(event.target.value)
            editStudent(newStudent)
        }
    }
    const handleSocialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) <= 5 && Number(event.target.value) >= 0) {
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

    return (
        <div className="flex p-3 items-center bg-gray-50 mb-3">
            <input className="bg-gray-200 mr-5 p-1 rounded-sm" type="text" value={student.name} onChange={handleNameChange} />

            <p >Cognitive level: </p>
            <input className="bg-gray-200 mr-5 p-1 rounded-sm" type="number" max="5" min="0" value={student.cognitive} onChange={handleCognitiveChange} />

            <p className="mr-1">Social level: </p>
            <input className="bg-gray-200 mr-5 p-1 rounded-sm" type="number" max="5" min="0" value={student.social} onChange={handleSocialChange} />

            <select className="bg-gray-200 mr-5 p-1 rounded-sm" value={student.gender} onChange={handleGenderChange}>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
            </select>

            {finalStudent ?
                <button className="bg-red-300 p-1 rounded-sm hover:cursor-pointer" onClick={() => { deleteStudent() }}>Remove Student</button> : null}
        </div>
    )
}

export default AddStudentCard