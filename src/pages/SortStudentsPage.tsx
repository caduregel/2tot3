import BreadCrumbs, { IPath } from "../components/BreadCrumbs";
import sortStudents from "../algoritme/sorting/sortStudents";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IGroups, ISavedGroups } from "../interfaces/groupsInterface";
import SavedGroups from "../components/SavedGroups/SavedGroups";
import Group from "../components/Group";

const SortStudentsPage = () => {
  const [savedGroups, setSavedGroups] = useState<ISavedGroups[]>(
    localStorage.getItem("savedGroups")
      ? JSON.parse(localStorage.getItem("savedGroups") || "{}")
      : [],
  );

  const [split, setSplit] = useState<number>(2);

  const students = JSON.parse(localStorage.getItem("students") || "{}");

  const [currentSorted, setCurrentSorted] = useState<IGroups>(
    localStorage.getItem("sorted")
      ? JSON.parse(localStorage.getItem("sorted") || "{}")
      : sortStudents(students, split),
  );

  const [saveGroupName, setSaveGroupName] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("savedGroups", JSON.stringify(savedGroups));
  }, [savedGroups]);

  useEffect(() => {
    localStorage.setItem("sorted", JSON.stringify(currentSorted));
  }, [currentSorted]);

  useEffect(() => {
    () => { window.scrollTo({ top: 0, behavior: "smooth" }) }

  }, [currentSorted]);

  const saveGroupDialogRef = useRef<HTMLDialogElement>(null);

  const path: IPath = {
    links: [
      {
        href: "/input-students",
        label: "Proberen",
      },
    ],
    current: "Sorteren",
  };

  const handleSave = () => {
    const groups: ISavedGroups = {
      name: saveGroupName,
      groups: currentSorted.groups,
      stats: currentSorted.stats,
    };
    const newSavedGroups = [...savedGroups];
    newSavedGroups.push(groups);
    setSavedGroups(newSavedGroups);
  };

  const saveGroupDialog = () => {
    if (!saveGroupDialogRef.current) {
      return;
    }
    saveGroupDialogRef.current.hasAttribute("open")
      ? saveGroupDialogRef.current.close()
      : saveGroupDialogRef.current.showModal();
  };

  const handleSavGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveGroupName(event.target.value);
  };

  const setSorted = (groups: IGroups) => {
    setCurrentSorted(groups);
  };

  const deleteSavedGroup = (index: number) => {
    const newSavedGroups = [...savedGroups];
    newSavedGroups.splice(index, 1);
    setSavedGroups(newSavedGroups);
  };

  const handleNewSorted = () => {
    const newSorted = sortStudents(students, split);
    setCurrentSorted(newSorted);
  };

  const handleSplitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSplit = Number(event.target.value);
    if (newSplit > 1 && newSplit <= 6) {
      setSplit(newSplit);
    }
  };

  return (
    <div className="flex-flex-col mb-10 ">
      <BreadCrumbs path={path} />
      <div className="flex justify-between m-4">
      <div className="justify-self-center self-center col-start-2">
          <Link
            to="/input-students"
            className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
          >
            Terug
          </Link>
          <Link
            to="/contact"
            className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
          >
            Contact Ons!
          </Link>
        </div>
        <div>
          <button>Aantal groepen</button>
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
        
        <div className="justify-self-end self-center col-start-3">
          <button
            className="justify-self-end bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
            onClick={handleNewSorted}
          >
            Maak Nieuwe Groepen
          </button>
          <button
            className="justify-self-end bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
            onClick={saveGroupDialog}
          >
            Groep Opslaan
          </button>
        </div>
      </div>
      {savedGroups.length > 0 ? (
          <SavedGroups
            savedGroups={savedGroups}
            setSorted={setSorted}
            deleteGroup={deleteSavedGroup}
          />
        ) : null}
      <div className="flex">
        {
          currentSorted.groups.map((group, index) => {
            return <Group index={index} group={group} stats={currentSorted.stats[index]} students={students} key={index} />
          })
        }
      </div>
      <div
        className={
          savedGroups.length > 0 ? "grid grid-cols-3" : "grid grid-cols-2"
        }
      >
        <dialog
          ref={saveGroupDialogRef}
          className="p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div>
            <input
              className="bg-gray-200 p-1 mb-4 rounded-sm"
              placeholder="Opslaan als... "
              type="text"
              value={saveGroupName}
              onChange={handleSavGroupName}
            />

            <div className="text-right">
              <button
                className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-600 hover:cursor-pointer mr-2"
                onClick={saveGroupDialog}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSave();
                  saveGroupDialog();
                }}
                className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 hover:cursor-pointer"
              >
                Opslaan
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default SortStudentsPage;
