import { FC } from "react"
import { IStudent } from "../interfaces/studentInterface"

interface MainProps {
    students: IStudent[],
    index: number
    group: number[]
}

interface SideProps {
    friendIDs: number[]
    group: number[]
    students: IStudent[]
}

const ReturnGroupedFriends: FC<SideProps> = ({ friendIDs, group, students }) => {
    const groupedFriends: IStudent[] = []
    friendIDs.forEach((id) => {
        if (group.includes(id)) {
            groupedFriends.push(students[id])
        }
    })

    return (
        <>
            {
                groupedFriends.map((friend: IStudent, index) => {
                    return (
                        <p 
                        key={index}
                        className="mr-3 bg-gray-300 rounded-md  p-1">{friend.name}</p>
                    )
                })
            }
        </>
    )
}

const SortedStudentCard: FC<MainProps> = ({ students, index, group }) => {
    const student = students[index]

    return (
        <div className="flex p-3 items-center bg-gray-200 mb-3 rounded-md">
            <p className="mr-10 font-bold">{student.name}</p>

            <p className="mr-3">Matched Vriendjes:</p>
            <ReturnGroupedFriends friendIDs={student.friends} group={group} students={students} />
        </div>
    )
}

export default SortedStudentCard