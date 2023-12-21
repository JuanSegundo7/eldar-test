import React from "react";
import { IResource } from "@/types/types";

interface FilterProps {
  resources: IResource[];
  setFilterResources: React.Dispatch<React.SetStateAction<IResource[]>>;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filterTitle: string;
  setFilterTitle: React.Dispatch<React.SetStateAction<string>>;
  filterId: string;
  setFilterId: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({
  resources,
  setFilterResources,
  setIsFilter,
  setCurrentPage,
  filterTitle,
  setFilterTitle,
  filterId,
  setFilterId,
}) => {
  const applyFilter = () => {
    const filtered = resources.filter((resource) => {
      const isIdMatch = String(resource.userId) === filterId;
      const isTitleMatch =
        filterTitle &&
        resource.title.toLowerCase().includes(filterTitle.toLowerCase());

      return isIdMatch || isTitleMatch;
    });

    const filteredBoth = filtered.filter((resource) => {
      const isIdMatch = String(resource.userId) === filterId;
      const isTitleMatch =
        filterTitle &&
        resource.title.toLowerCase().includes(filterTitle.toLowerCase());

      return isIdMatch && isTitleMatch;
    });

    const finalFiltered = filteredBoth.length > 0 ? filteredBoth : filtered;

    setFilterResources(finalFiltered);
    setIsFilter(true);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilterTitle("");
    setFilterId("");
    setFilterResources(resources);
    setIsFilter(false);
    setCurrentPage(1);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 m-auto bg-white rounded-lg p-4 flex flex-col items-center shadow-md">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-start flex-col gap-1">
            <p>Búsqueda por titulo</p>
            <input
              type="text"
              name="title"
              value={filterTitle}
              className="px-2 bg-eldar-light-grey rounded-lg"
              placeholder="Titulo"
              onChange={(e) => setFilterTitle(e.target.value)}
            />
          </div>
          <div className="flex items-start flex-col gap-1">
            <p>Búsqueda por ID</p>
            <input
              type="text"
              name="title"
              value={filterId}
              className="px-2 bg-eldar-light-grey rounded-lg"
              placeholder="ID"
              onChange={(e) => setFilterId(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-2 w-full">
            <button
              onClick={applyFilter}
              className="bg-eldar-blue rounded-md px-2 text-white mt-2"
            >
              Buscar
            </button>
            <button
              onClick={resetFilter}
              className="bg-red-600 rounded-md px-2 text-white mt-2"
            >
              Resetear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
