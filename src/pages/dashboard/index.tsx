import React, { useEffect, useState } from "react";
import { get_resource, get_all } from "../api/axios.crud";
import UserRow from "@/components/UserRow";
import { paginate, calculateTotalPages } from "../../utils/pagination";
import { IResource } from "@/types/types";
import Modal from "@/components/Modal";
import CreateForm from "@/components/CreateForm";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/router";
import Filter from "@/components/Filter";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [resources, setResources] = useState<IResource[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(
    null
  );
  const [create, setCreate] = useState(false);

  const [filterResources, setFilterResources] = useState<IResource[]>([]);
  const [filterTitle, setFilterTitle] = useState<string>("");
  const [filterId, setFilterId] = useState<string>("");

  useEffect(() => {
    if (!user.id) {
      router.push("/");
    }
  }, [user.id, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_all();
        setResources(data);
        setFilterResources(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  if (!resources || resources.length === 0) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </section>
    );
  }

  /** PAGES */

  const PAGE_SIZE = 20;

  const totalItems = isFilter ? filterResources.length : resources.length;

  const totalPages = calculateTotalPages(totalItems, PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = paginate<IResource>(
    isFilter ? filterResources : resources,
    currentPage,
    PAGE_SIZE
  );

  return (
    <section className="flex min-h-[93vh] h-full w-full justify-center items-center mx-auto max-w-4xl">
      <div className="w-screen h-screen bg-white rounded-lg my-4 flex flex-col items-start justify-start mx-6 lg:mx-0">
        <div className="w-full flex items-center justify-between h-10 bg-eldar-grey text-white rounded-t-lg px-2">
          <div
            onClick={() => setIsFilterModal(!isFilterModal)}
            className="cursor-pointer flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                opacity="1"
                fill="#ffffff"
                d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
              />
            </svg>
            <p>Filtrar</p>
          </div>
          <div className="flex justify-center items-center gap-2 h-full">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                width="18"
                viewBox="0 0 512 512"
              >
                <path
                  opacity="1"
                  fill="#ffffff"
                  d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"
                />
              </svg>
            </button>
            <div>
              Página {currentPage} de {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                width="18"
                viewBox="0 0 512 512"
              >
                <path
                  opacity="1"
                  fill="#ffffff"
                  d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            {user.role === "admin" && (
              <button
                onClick={() => setCreate(true)}
                className="bg-eldar-blue rounded-md px-2"
              >
                Crear
              </button>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              width="18"
              viewBox="0 0 448 512"
            >
              <path
                opacity="1"
                fill="#ffffff"
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
          </div>
        </div>
        {isFilterModal && (
          <Filter
            resources={resources}
            setFilterResources={setFilterResources}
            setIsFilter={setIsFilter}
            setCurrentPage={setCurrentPage}
            filterTitle={filterTitle}
            setFilterTitle={setFilterTitle}
            filterId={filterId}
            setFilterId={setFilterId}
          />
        )}
        <div className="w-full h-full flex-col justify-evenly items-center overflow-auto">
          {(isFilter ? filterResources : resources) &&
          paginatedData &&
          paginatedData.length > 0 ? (
            paginatedData.map((user: IResource) => (
              <UserRow
                onResourceClick={() => setSelectedResource(user)}
                key={user.id}
                id={user.id}
                userId={user.userId}
                title={user.title}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-md">No se ha encontrado el valor buscado.</p>
            </div>
          )}
        </div>
      </div>
      {selectedResource && (
        <Modal
          resource={selectedResource}
          closeModal={setSelectedResource}
          setResource={setResources}
          setCurrentPage={setCurrentPage}
        />
      )}
      {create && (
        <CreateForm closeModal={setCreate} setResource={setResources} />
      )}
    </section>
  );
};

export default Dashboard;
