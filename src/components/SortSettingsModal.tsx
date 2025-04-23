import React from "react";

interface ISortSettingsModalProps {
    split: number;
    handleSplitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    groupSizeDeviation: number;
    handleGroupSizeDeviation: (event: React.ChangeEvent<HTMLInputElement>) => void;

    cognitiveDeviation: number;
    handleCognitiveDeviation: (event: React.ChangeEvent<HTMLInputElement>) => void;

    socialDeviation: number;
    handleSocialDeviation: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortSettingsModal: React.FC<ISortSettingsModalProps> = ({ split, handleSplitChange, groupSizeDeviation, handleGroupSizeDeviation, cognitiveDeviation, handleCognitiveDeviation, socialDeviation, handleSocialDeviation }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button className="bg-gray-200 p-2 m-2 rounded-sm hover:bg-gray-300 hover:cursor-pointer" onClick={handleOpen}>Sorteer Settings</button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white p-4 rounded shadow-lg flex flex-col justify-between w-100">
                        <h2 className="text-xl font-bold">Sorteer Instellingen</h2>
                        <div className="flex gap-2 items-center">
                            <p>Aantal groepen</p>
                            <input
                                className="bg-gray-200 p-1 m-2 rounded-sm max-w-10"
                                placeholder="Aantal groepen..."
                                type="number"
                                value={split}
                                onChange={handleSplitChange}
                                max={5}
                                min={2}
                            />
                        </div>
                        <div className="flex">
                            <p className="text-lg font-bold">Afwijkingen</p>
                        </div>
                        <div>
                            <p>Grote afwijking</p>
                            <div className="flex gap-2 space-between items-center">
                                <input type="range" value={groupSizeDeviation} onChange={handleGroupSizeDeviation} min="10" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300" />
                                <p className="flex-1/2  ">{groupSizeDeviation} %</p>
                            </div>
                        </div>
                        <div>
                            <p>Cognitief afwijking</p>
                            <div className="flex gap-2 space-between items-center">
                                <input type="range" value={cognitiveDeviation} onChange={handleCognitiveDeviation} min="10" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300" />
                                <p className="flex-1/2  ">{cognitiveDeviation} %</p>
                            </div>
                        </div>

                        <div>
                            <p>Zorg afwijking</p>
                            <div className="flex gap-2 space-between items-center">
                                <input type="range" value={socialDeviation} onChange={handleSocialDeviation} min="10" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300" />
                                <p className="flex-1/2  ">{socialDeviation} %</p>
                            </div>
                        </div>
                        <button className="bg-gray-200 p-1 m-2 rounded-sm hover:bg-gray-300 hover:cursor-pointer" onClick={handleOpen}>Opslaan</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SortSettingsModal