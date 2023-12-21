import React, { useState } from "react";
import { IResource } from "@/types/types";
import { delete_resource, update_resource } from "@/pages/api/axios.crud";
import { useUser } from "@/context/userContext";

interface ModalProps {
  resource: IResource;
  closeModal: React.Dispatch<React.SetStateAction<IResource | null>>;
  setResource: React.Dispatch<React.SetStateAction<IResource[]>>;
}

const Modal: React.FC<ModalProps> = ({ resource, closeModal, setResource }) => {
  const { user } = useUser();
  const [edit, setEdit] = useState(false);
  const [editedValues, setEditedValues] = useState<IResource>({
    userId: resource.userId,
    title: resource.title,
    body: resource.body,
  });

  const handleDelete = async () => {
    try {
      const res = await delete_resource(resource.id as number);
      setResource((prevValues) =>
        prevValues.filter((item) => item.id !== resource.id)
      );
      closeModal(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await update_resource(editedValues, user.id as number);
      setResource((prevValues) => [...prevValues, { ...res }]);
      closeModal(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white pb-4 py-2 px-2 rounded-lg max-w-[500px]">
        <div
          className="w-full flex justify-end cursor-pointer mb-2"
          onClick={() => closeModal(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            width="18"
            viewBox="0 0 512 512"
          >
            <path
              opacity="1"
              fill="#262626"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </div>
        {edit ? (
          <div className="p-2">
            <div className="flex justify-between mb-2 gap-2">
              <div className="flex items-start gap-2 flex-col">
                <p className="font-semibold">ID:</p>
                <input
                  className="outline-0 bg-eldar-light-grey px-2 rounded-md cursor-not-allowed"
                  value={resource.id}
                  disabled
                />
              </div>

              <div className="flex items-start gap-2 flex-col">
                <p className="font-semibold">User ID:</p>
                <input
                  className="outline-0 bg-eldar-light-grey px-2 rounded-md"
                  value={editedValues.userId}
                  onChange={handleInputChange}
                  name="userId"
                />
              </div>
            </div>
            <div>
              <div className="text-left capitalize flex flex-col gap-2">
                <p className="font-semibold ">Title</p>
                <input
                  className="w-full outline-0 bg-eldar-light-grey px-2 rounded-md"
                  value={editedValues.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>
              <div className="text-left capitalize flex flex-col gap-2 my-4">
                <p className="font-semibold ">Body:</p>
                <textarea
                  className="w-full h-[150px] outline-0 bg-eldar-light-grey px-2 rounded-md"
                  value={editedValues.body}
                  onChange={handleInputChange}
                  name="body"
                />
              </div>
              {user.role === "admin" && (
                <div className="flex justify-center items-center gap-2 mt-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-eldar-blue rounded-md py-2 px-4 text-white"
                  >
                    Enviar
                  </button>
                  <button
                    onClick={() => setEdit(false)}
                    className="bg-red-600 rounded-md py-2 px-4 text-white"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-2">
            <div className="flex justify-between mb-2">
              <p className="flex gap-1 items-center">
                <span className="font-semibold">ID:</span>
                {resource.id}
              </p>
              <p className="flex gap-1 items-center">
                <span className="font-semibold">User ID:</span>
                {resource.userId}
              </p>
            </div>
            <div className="text-left capitalize flex flex-col my-2">
              <p className="font-semibold ">Title:</p>
              {resource.title}
            </div>
            <div className="text-left capitalize flex flex-col mt-2 mb-4">
              <p className="font-semibold">Body:</p>
              {resource.body}
            </div>
            {user.role === "admin" && (
              <div className="flex justify-center items-center gap-2 mt-2">
                <button
                  onClick={() => setEdit(true)}
                  className="bg-eldar-blue rounded-md py-2 px-4 text-white"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 rounded-md py-2 px-4 text-white"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
