import shuffle from "../helpers/shuffle";
import { checkFriendInGroup } from "../helpers/checks";
import testFunction, { IStats } from "../helpers/test";
import { IStudent } from "../../interfaces/studentInterface";
import { IGroups } from "../../interfaces/groupsInterface";

const isStudentInGroup = (studentId: number, group: number[]) => {
  group.includes(studentId);
};


const isFriendsFriendIngroup = (
  student: IStudent,
  path: number[],
  groups: number[][],
  allStudents: IStudent[]
): number | -1 => {
  // Check for cycles first
  if (path.includes(student.index)) {
    return -1; // Prevent infinite loops by detecting cycles
  }
  
  // Add current student to path
  const newPath = [...path, student.index];
  
  // Check if student is in any group
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const group = groups[groupIndex];
    if (group.includes(student.index)) {
      return student.index;
    }
  }
  
  // Optional path length check to prevent very deep recursion
  if (newPath.length > 5) {
    return -1;
  }
  
  // Check friends recursively
  for (const friendIndex of student.friends) {
    const friend = allStudents.find((s) => s.index === friendIndex);
    if (friend) {
      const friendResult = isFriendsFriendIngroup(friend, newPath, groups, allStudents);
      if (friendResult !== -1) {
        return friendResult;
      }
    }
  }
  
  return -1;
};

function stepOne(astudents: IStudent[], split: number) {
  const groups: number[][] = Array.from({ length: split }, () => []);;

  const UnShuffledstudents = astudents;
  const students = shuffle(UnShuffledstudents);



  for (let i = 0; i < students.length; i++) {

    const student = students[i];
    if (
      groups.every((group: number[]) => {
        isStudentInGroup(student.index, group);
      })
    ) {
      continue;
    }

    // Case One: A friend is found in both groups
    if (
      groups.every((group: number[]) => {
        checkFriendInGroup(student, group);
      })
    ) {
      const smallestGroup = groups.reduce((shortest, current) => {
        return current.length < shortest.length ? current : shortest;
      });
      smallestGroup.push(student.index);
      continue;
    }

    // Case Two: A friend is found in one group
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if (checkFriendInGroup(student, group)) {
        group.push(student.index);
        break;
      }
    }

    // Case Three: No friends in either group
    let added = false;
    const selectedStudents: number[] = [];
    const resultingGroup = isFriendsFriendIngroup(student, [], groups, astudents);
    console.log(resultingGroup)
    if (resultingGroup !== -1) {
      selectedStudents.forEach((studentId) => {
        groups[resultingGroup].push(studentId);
      });
      added = true;
    }
    // Fallback: Add student to the smaller group if no match is found
    if (!added) {
      const smallestGroup = groups.reduce((shortest, current) => {
        return current.length < shortest.length ? current : shortest;
      });
      smallestGroup.push(student.index);
    }
  };
  return groups;
}

const sortStudents = (allStudents: IStudent[], split: number): IGroups => {
  let allFriends = false;
  let acceptableSizes = false;

  let iterations = 0;
  const maxIterations = 30;

  let groups = stepOne(allStudents, split);
console.log(groups)
  // while (allFriends == false || acceptableSizes == false) {
  //   if (iterations > maxIterations) {
  //     console.log("to many iterations");
  //   }
  //   iterations++;
  //   groups = stepOne(allStudents, split);
  //   const results = testFunction(allStudents, groups);
  //   // find out if all students have friends
  //   if (
  //     results.every((group) => {
  //       return group.leerlingenZonderVrienden.length == 0;
  //     })
  //   ) {
  //     allFriends = true;
  //   }

  //   // find out if the group sizes dont differ by more than 10% of the split
  //   const goalSize = allStudents.length / split;
  //   if (
  //     groups.every((group) => {
  //       if (group.length / goalSize <= 0.1) {
  //         return true;
  //       }
  //     })
  //   ) {
  //     acceptableSizes = true;
  //   }
  // }
  const stats: IStats[] = testFunction(allStudents, groups);
  return { groups, iterations, stats };
};

export default sortStudents;
