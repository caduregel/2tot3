import { FC } from "react"
import { IStudent } from "../interfaces/studentInterface"

interface Props {
    students: IStudent[],
    handleAddFriend: Function,
    currentStudentIndex: number,
    SelectorIndex: number,
}

const SearchStudentsDropdown: FC<Props> = ({ students, handleAddFriend, currentStudentIndex, SelectorIndex }) => {

    const options = []
    for (let i = 0; i < students.length; i++) {
        options.push({
            value: students[i].index,
            label: students[i].name,
        })
    }

    const handleAddStudentFriends = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStudent = students[currentStudentIndex]
        newStudent.friends[SelectorIndex] = Number(event.target.value)
        handleAddFriend(newStudent)
    }

    const alreadyChosen: number[] = []
    students[currentStudentIndex].friends.forEach((friendId) => {
        if (friendId != students[currentStudentIndex].friends[SelectorIndex]) {
            alreadyChosen.push(friendId)
        }
    })
    console.log(students[currentStudentIndex].friends[SelectorIndex]
    )

  
    return (
        <div className="m-2">
            <select
                className="bg-gray-200 mr-5 p-1 rounded-sm hover:cursor-pointer"
                value={
                    String(
                        students[currentStudentIndex].friends[SelectorIndex] ?? ''
                    )
                        ? students[currentStudentIndex].friends[SelectorIndex]
                        : ''
                }
                onChange={handleAddStudentFriends}>
                <option disabled value=''> -- select an option -- </option>
                {options.map((option, index) => {
                    // console.log(alreadyChosen)
                    if (option.value != currentStudentIndex && !alreadyChosen.includes(option.value)) {
                        return <option value={option.value} key={index + 1}>
                            {option.label}
                        </option>
                    }
                })}
            </select>
        </div>
    )
}

export default SearchStudentsDropdown