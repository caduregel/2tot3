import shuffle from '../helpers/shuffle';
import { checkTwoFriends, checkFriendInGroup } from '../helpers/checks';
import testFunction from '../helpers/test';
import { IStudent } from '../../interfaces/studentInterface';
import { IGroups } from '../../interfaces/groupsInterface';

function stepOne(astudents: IStudent[]) {
    let groupOne = [];
    let groupTwo = [];

    let UnShuffledstudents = astudents
    let students = shuffle(UnShuffledstudents)
    const isStudentInGroup = (studentId: number, group: number[]) => group.includes(studentId);

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        if (isStudentInGroup(student.index, groupOne) || isStudentInGroup(student.index, groupTwo)) {
            continue;
        }

        // Case One: A friend is found in both groups
        if (checkFriendInGroup(student, groupOne) && checkFriendInGroup(student, groupTwo)) {
            groupOne.length > groupTwo.length ? groupTwo.push(student.index) : groupOne.push(student.index);
            continue;
        }

        // Case Two: A friend is found in one group
        if (checkFriendInGroup(student, groupOne)) {
            groupOne.push(student.index);
            continue;
        } else if (checkFriendInGroup(student, groupTwo)) {
            groupTwo.push(student.index);
            continue;
        }

        // Case Three: No friends in either group
        let added = false;
        for (let j = i + 1; j < students.length; j++) {
            const studentTwo = students[j];
            if (checkTwoFriends(student, studentTwo)) {
                groupOne.length > groupTwo.length
                    ? groupTwo.push(student.index, studentTwo.index)
                    : groupOne.push(student.index, studentTwo.index);
                added = true;
                break;
            }
        }

        // Fallback: Add student to the smaller group if no match is found
        if (!added) {
            groupOne.length <= groupTwo.length ? groupOne.push(student.index) : groupTwo.push(student.index);
        }
    }

    return [groupOne, groupTwo];
}

const sortStudents = (allStudents: IStudent[]): IGroups => {
    let allFriends = false;
    let acceptableSizes = false
    let acceptableGenderDif = false

    let iterations = 0
    const maxIterations = 30

    let bothGroups = stepOne(allStudents)

    while (allFriends == false || acceptableSizes == false || acceptableGenderDif == false) {
        if (iterations > maxIterations) {
            console.log("to many iterations")
        }
        iterations++
        bothGroups = stepOne(allStudents)
        const groupOne = bothGroups[0]
        const groupTwo = bothGroups[1]
        const results = testFunction(allStudents, groupOne, groupTwo)

        // find out if all students have friends
        if (results.groep1.leerlingenZonderVrienden.length == 0 && results.groep2.leerlingenZonderVrienden.length == 0) {
            allFriends = true
        }

        // find out if the group sizes dont differ by more than 10% of a 50/50split
        const sizeDif = Math.abs(results.groep1.groepsGrote - results.groep2.groepsGrote)
        const fiftySplit = allStudents.length / 20
        if (sizeDif < fiftySplit) {
            acceptableSizes = true
        }

        // verschil in jongen/meisje verdeling
        const groupOneBoyToGirl = results.groep1.jongens / results.groep1.meisjes
        const groupTwoBoyToGirl = results.groep2.jongens / results.groep2.meisjes
        const totalBoys = results.groep1.jongens + results.groep2.jongens
        const totalGirls = results.groep1.meisjes + results.groep2.meisjes
        const maxBGRatio = totalBoys / totalGirls
        const acceptableBGRation = maxBGRatio + (maxBGRatio / 5)
        if (groupOneBoyToGirl <= acceptableBGRation && groupTwoBoyToGirl <= acceptableBGRation) {
            acceptableGenderDif = true
        }
    }

    const groups = [bothGroups[0], bothGroups[1]]
    const stats = testFunction(allStudents, bothGroups[0], bothGroups[1])
    return { groups, iterations, stats}
}

export default sortStudents