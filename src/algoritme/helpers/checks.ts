import { IStudent } from "../../interfaces/studentInterface";

// Function that checks if a student has friends in a group
export const checkFriendInGroup = (student: IStudent, group: number[]) => {
    const friendsId = student.friends; // No need for spreading
    for (let i = 0; i < group.length; i++) {
        if (friendsId.includes(group[i])) {
            return true;
        }
    }
    return false; // Only return false after checking all group members
};
// Helper function which checks if two students are friends with eachother
export const checkTwoFriends = (studentOne: IStudent, studentTwo: IStudent) => {
    return (
        studentOne.friends.includes(studentTwo.index)// Match IDs, not names
        // studentTwo.friends.includes(studentOne.id)
    );
};
