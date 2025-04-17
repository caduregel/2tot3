import React from 'react';
import { IGroups, ISavedGroups } from '../../interfaces/groupsInterface';

interface ISavedGroupsProps {
    savedGroups: ISavedGroups[];
    setSorted: Function;
    deleteGroup: Function;
}

const SavedGroups: React.FC<ISavedGroupsProps> = ({ savedGroups, setSorted, deleteGroup }) => {

    const handleSetCurrentSorted = (groups: ISavedGroups) => {
        const newSortedGroups: IGroups = {
            groups: groups.groups,
            iterations: 0,
            stats: groups.stats
        }

        setSorted(newSortedGroups)
    }

    const handleDelete = (index: number) => {
        deleteGroup(index)
    }

    return (
        <div className='m-4'>
            <h1 className='text-2xl'>Opgeslagen groepen</h1>
            <div className='flex flex-wrap'>
                {savedGroups.map((save, index) => {
                    return (
                        <div key={index}
                            className=' bg-gray-200 p-3 m-2 rounded-md hover:cursor-pointer hover:bg-gray-300'
                            onClick={() => { handleSetCurrentSorted(save) }}>
                            <div className='flex justify-between'>
                                <h1 className='font-semibold text-md'>{save.name}</h1>
                                <div className='mb-2'>
                                    <button
                                        className='bg-red-200 p-1  mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-red-300'
                                        onClick={() => { handleDelete(index) }}>
                                        verwijder</button>
                                </div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <p>Aantal groepen: {save.groups.length}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SavedGroups;