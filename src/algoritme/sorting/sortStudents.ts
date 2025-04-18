import shuffle from "../helpers/shuffle";
import { checkFriendInGroup } from "../helpers/checks";
import testFunction, { IStats } from "../helpers/test";
import { IStudent } from "../../interfaces/studentInterface";
import { IGroups } from "../../interfaces/groupsInterface";

// const isStudentInGroup = (studentId: number, group: number[]) => {
//   return group.includes(studentId);
// };

function stepOne(astudents: IStudent[], split: number) {
  const groups: number[][] = Array.from({ length: split }, () => []);;

  const students = shuffle([...astudents]);

  const assignedStudents = new Set<number>();

  for (let i = 0; i < students.length; i++) {

    const student = students[i];

    // Skip student if already grouped
    if (assignedStudents.has(student.index)) {
      continue;
    }

    let added = false; // keep track of wether the student was added to a group

    // Case One: A friend is found in both groups
    if (
      groups.every((group: number[]) => {
        return checkFriendInGroup(student, group);
      })
    ) {
      const smallestGroup = groups.reduce((shortest, current) => {
        return current.length < shortest.length ? current : shortest;
      });
      smallestGroup.push(student.index);
      assignedStudents.add(student.index); // Add this line
      added = true;
      continue;
    }

    // Case Two: A friend is found in one group
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if (checkFriendInGroup(student, group)) {
        group.push(student.index);
        assignedStudents.add(student.index);
        added = true;
        break;
      }
    }

    if (added) continue;

     // Case Three: A friend has a mutual friendship
     for (const friendId of student.friends) {
      if (added) break;
      
      // Skip if friend is already assigned
      if (assignedStudents.has(friendId)) continue;
      
      const friend = astudents.find((s) => s.index === friendId);
      if (friend?.friends.includes(student.index)) {
        const smallestGroup = groups.reduce((shortest, current) => {
          return current.length < shortest.length ? current : shortest;
        });
        
        smallestGroup.push(student.index);
        smallestGroup.push(friendId);
        assignedStudents.add(student.index);
        assignedStudents.add(friendId);
        added = true;
      }
    }

    // Fallback: Add student to the smallest group if no match is found
    if (!added) {
      const smallestGroup = groups.reduce((shortest, current) => {
        return current.length < shortest.length ? current : shortest;
      });
      smallestGroup.push(student.index);
      assignedStudents.add(student.index);
    }
  };
  return groups;
}

const sortStudents = (allStudents: IStudent[], split: number): IGroups => {
  let allFriends = false;
  let acceptableSizes = false;

  let iterations = 0;
  const maxIterations = 50000;

  let groups = stepOne(allStudents, split);
  
  const AcceptableSizeDeviation = split * 0.08; // variable deviation based on how many groups to split into

  while (allFriends == false || acceptableSizes == false) {
    if (iterations > maxIterations) {
      console.log("to many iterations");
      break;
    }
    groups = stepOne(allStudents, split);
    const results = testFunction(allStudents, groups);

    // find out if all students have friends
    if (
      results.every((group) => {
        return group.leerlingenZonderVrienden.length == 0;
      })
    ) {
      allFriends = true;
    } else {
      allFriends = false;
    }

    iterations++;

    // check for acceptableSizes
    const goalSize = allStudents.length / split;
    if (
      groups.every((group) => {
        // Check if group size doesn't differ by more than 10% from goal
        return Math.abs(group.length - goalSize) / goalSize <= AcceptableSizeDeviation;
      })
    ) {
      acceptableSizes = true;
    } else {
      acceptableSizes = false;
    }
  }

  const stats: IStats[] = testFunction(allStudents, groups);
  return { groups, iterations, stats };
};

export default sortStudents;
