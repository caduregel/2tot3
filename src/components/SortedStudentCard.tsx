import { FC } from "react"
import { IStudent } from "../interfaces/studentInterface"
import { MdDragIndicator } from "react-icons/md";
import { IconContext } from "react-icons";
import { useDraggable } from "@dnd-kit/core";

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
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `student-${index}`,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)`,
        cursor: "grabbing", 
    } : undefined;


    const student = students.find((student) => student.index === index)
    if (!student) {
        return null
    }

    return (
        <div className="flex p-3 items-center bg-gray-200 mb-3 rounded-md flex-wrap hover:bg-gray-300 hover:cursor-pointer" style={style} ref={setNodeRef} {...attributes} {...listeners}> 
            <IconContext.Provider value={{ className: "text-gray-500 mr-2 hover:cursor-pointer w-5 h-5" }}>
                <MdDragIndicator />
            </IconContext.Provider>
            <p className="mr-10 font-bold">{student.name}</p>
            <p className="mr-3">Matched Vriendjes:</p>
            <ReturnGroupedFriends friendIDs={student.friends} group={group} students={students} />
        </div>
    )
}

export default SortedStudentCard