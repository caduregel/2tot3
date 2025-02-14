import React from 'react';
import { ISavedGroups } from '../interfaces/groupsInterface';

interface ISavedGroupsProps {
    savedGroups: ISavedGroups[];
}

const SavedGroups: React.FC<ISavedGroupsProps> = ({ savedGroups }) => {
    return (
        <div>
            <h1 className='text-2xl'>Opgeslagen groepen:</h1>
            {savedGroups.map((save, index) => {
                return (
                    <div key={index} className=' bg-gray-200 p-3 m-2 rounded-md'>
                        <div className='flex justify-between'>
                            <h1 className='font-semibold text-md'>{save.name}</h1>
                            <button className='bg-red-200 p-1  mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-red-300'>verwijder</button>
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