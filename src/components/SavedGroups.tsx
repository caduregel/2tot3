import React from 'react';
import { IGroups, ISavedGroups } from '../interfaces/groupsInterface';
import { IStudent } from '../interfaces/studentInterface';

interface ISavedGroupsProps {
    savedGroups: ISavedGroups[];
    setSorted: Function;
    deleteGroup: Function;
}

const SavedGroups: React.FC<ISavedGroupsProps> = ({ savedGroups, setSorted, deleteGroup }) => {

    const handleSetCurrentSorted = (groups: ISavedGroups) => {
        const newGroupOne: number[] = []
        const newGroupTwo: number[] = []

        groups.groupOne.forEach((student) => {
            newGroupOne.push(student.index)
        })
        groups.groupTwo.forEach((student) => {
            newGroupTwo.push(student.index)
        })

        const newSortedGroups: IGroups = {
            groups: [newGroupOne, newGroupTwo],
            iterations: 0,
            stats: groups.stats
        }

        setSorted(newSortedGroups)
    }

    const handleDelete = (index: number) => {
        deleteGroup(index)
    }

    const writeStudent = (student: IStudent, group: IStudent[]): string => {
        const groupedFriends: IStudent[] = []
        student.friends.forEach((id) => {
            if (group.find(student => student.index === id)) {
                groupedFriends.push(group.find(student => student.index === id) || student)
            }
        })
        const friends = `${groupedFriends.map(friend => friend.name).join(', ')}`
        return `${student.name}, friends:, ${friends}`
    }

    const writeSummary = (groups: ISavedGroups) => {

        const groupOneSummary = `Groep 1: \n `
            + `Grote:, ${groups.stats.groep1.groepsGrote} \n `
            + `Cognitief niveau:, ${Math.round(groups.stats.groep1.gemiddeldCognitief * 10) / 10} \n `
            + `Zorg behoefte:, ${Math.round(groups.stats.groep1.gemiddeldGedrag * 10) / 10} \n `
            + `Jongens:, ${groups.stats.groep1.jongens} \n `
            + `Meisjes:, ${groups.stats.groep1.meisjes} \n `

        const groupTwoSummary = `Groep 2: \n `
            + `Grote:, ${groups.stats.groep2.groepsGrote} \n `
            + `Cognitief niveau:, ${Math.round(groups.stats.groep2.gemiddeldCognitief * 10) / 10} \n `
            + `Zorg behoefte:, ${Math.round(groups.stats.groep2.gemiddeldGedrag * 10) / 10} \n `
            + `Jongens:, ${groups.stats.groep2.jongens} \n `
            + `Meisjes:, ${groups.stats.groep2.meisjes} \n`

        return [groupOneSummary, groupTwoSummary]
    }

    const handleDownload = (groups: ISavedGroups) => {
        const groupSummaries = writeSummary(groups)

        const csvContentGroups = `Groep 1: \n Samenvatting: ${groupSummaries[0]} \n ${groups.groupOne.map(student => writeStudent(student, groups.groupOne)).join('\n')} \n
        Groep 2: \n Samenvatting: ${groupSummaries[1]} \n ${groups.groupTwo.map(student => writeStudent(student, groups.groupTwo)).join('\n')} `;

        const csvContent = `data: text / csv; charset = utf - 8, ${csvContentGroups} `;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${groups.name}.csv`);
        document.body.appendChild(link);

        console.log(csvContentGroups
        )
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className='ml-5'>
            <h1 className='text-2xl'>Opgeslagen groepen:</h1>
            {savedGroups.map((save, index) => {
                return (
                    <div key={index}
                        className=' bg-gray-200 p-3 m-2 rounded-md hover:cursor-pointer hover:bg-gray-300'
                        onClick={() => { handleSetCurrentSorted(save) }}>
                        <div className='flex justify-between'>
                            <h1 className='font-semibold text-md'>{save.name}</h1>
                            <div className='mb-2'>
                                <button
                                    className='bg-slate-400 text-white p-1  mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-gray-500'
                                    onClick={() => { handleDownload(save) }}>
                                    Download</button>
                                <button
                                    className='bg-red-200 p-1  mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-red-300'
                                    onClick={() => { handleDelete(index) }}>
                                    verwijder</button>
                            </div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>
                                <p>Groep 1:</p>
                                <p>Grote: {save.stats.groep1.groepsGrote}</p>
                                <p>Cognitief niveau: {Math.round(save.stats.groep1.gemiddeldCognitief * 10) / 10}</p>
                                <p>Zorg behoefte: {Math.round(save.stats.groep1.gemiddeldGedrag * 10) / 10}</p>
                                <p>Jongens: {save.stats.groep1.jongens}</p>
                                <p>Meisjes: {save.stats.groep1.meisjes}</p>
                            </div>
                            <div>
                                <p>Groep 2:</p>
                                <p>Grote: {save.stats.groep2.groepsGrote}</p>
                                <p>Cognitief niveau: {Math.round(save.stats.groep2.gemiddeldCognitief * 10) / 10}</p>
                                <p>Zorg behoefte: {Math.round(save.stats.groep2.gemiddeldGedrag * 10) / 10}</p>
                                <p>Jongens: {save.stats.groep2.jongens}</p>
                                <p>Meisjes: {save.stats.groep2.meisjes}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default SavedGroups;