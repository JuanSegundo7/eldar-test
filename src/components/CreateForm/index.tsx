import React, { ChangeEvent, FormEvent, useState } from "react";
import { create_resource } from "@/pages/api/axios.crud";
import { useUser } from "@/context/userContext";
import { IResource } from "@/types/types";

const CreateForm = ({ closeModal, setResource }: any) => {
  const { user } = useUser();

  const [createResource, setCreateResource] = useState({ title: "", body: "" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreateResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const info = { ...createResource, userId: user.id as number };
    const res = await create_resource(info);
    setResource((prevValues: IResource[]) => [...prevValues, { ...res }]);
    closeModal(false);
    setCreateResource({ title: "", body: "" });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white pb-4 py-2 px-2 rounded-lg max-w-[500px]">
        <div
          className="w-full flex justify-end cursor-pointer mb-2"
          onClick={() => closeModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path
              opacity="1"
              fill="#262626"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </div>
        <h3>Crea tu recurso.</h3>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={createResource.title}
            onChange={handleChange}
            className="px-2 py-1 bg-eldar-light-grey rounded-lg"
            placeholder="Title"
          />
          <textarea
            name="body"
            value={createResource.body}
            onChange={handleChange}
            className="px-2 py-1 bg-eldar-light-grey rounded-lg h-[150px]"
            placeholder="Body"
          />
          <button
            type="submit"
            className="bg-eldar-blue px-4 text-white rounded-md"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
