import React from 'react';
import { IGroups, ISavedGroups } from '../interfaces/groupsInterface';

interface ISavedGroupsProps {
    savedGroups: ISavedGroups[];
    setSorted: Function;
    deleteGroup: Function;
}

const SavedGroups: React.FC<ISavedGroupsProps> = ({ savedGroups, setSorted, deleteGroup }) => {

    const handleSetCurrentSorted = (groups: ISavedGroups) => {
        console.log(groups)
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
                            <button
                                className='bg-red-200 p-1  mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-red-300'
                                onClick={() => { handleDelete(index) }}>
                                verwijder</button>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>
                                <p>Groep 1:</p>
                                <p>Grote: {save.stats.groep1.groepsGrote}</p>
                                <p>Cognitief niveau: {Math.round(save.stats.groep1.gemiddeldCognitief * 10) / 10}</p>
                                <p>Zorg behoefte: {Math.round(save.stats.groep1.gemiddeldGedrag * 10) / 10}</p>
                            </div>
                            <div>
                                <p>Groep 2:</p>
                                <p>Grote: {save.stats.groep2.groepsGrote}</p>
                                <p>Cognitief niveau: {Math.round(save.stats.groep2.gemiddeldCognitief * 10) / 10}</p>
                                <p>Zorg behoefte: {Math.round(save.stats.groep2.gemiddeldGedrag * 10) / 10}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default SavedGroups;