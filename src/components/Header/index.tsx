import { useUser } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Header = () => {
  const { user, logout } = useUser();
  const [isUserVisible, setIsUserVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsUserVisible(false);

    if (router.pathname === "/dashboard") {
      router.push("/");
    }
  };

  return (
    <>
      <header className="bg-eldar-grey w-full flex items-center justify-center px-[24px] py-[8px]">
        <nav className="flex w-full items-center justify-between mx-auto max-w-4xl">
          <Link href="/">
            <Image src="/imgs/logo.png" width={120} height={120} alt="logo" />
          </Link>
          {user.id ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/dashboard">
                <p className="text-white cursor-pointer">Dashboard</p>
              </Link>
              <div
                className="cursor-pointer"
                onClick={() => setIsUserVisible(!isUserVisible)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
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
          ) : (
            <ul className="hidden text-white items-center gap-4 md:flex">
              <li className="cursor-pointer">Nosotros</li>
              <li className="cursor-pointer">Servicios</li>
              <li className="cursor-pointer">Clientes</li>
              <li className="cursor-pointer">Contacto</li>
            </ul>
          )}
          <div className="flex md:hidden items-center gap-2">
            {user.id && (
              <div
                className="cursor-pointer"
                onClick={() => setIsUserVisible(!isUserVisible)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 448 512"
                >
                  <path
                    opacity="1"
                    fill="#ffffff"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="18"
              viewBox="0 0 448 512"
            >
              <path
                opacity="1"
                fill="#ffffff"
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </div>
        </nav>
      </header>
      {isUserVisible && (
        <div className="w-full h-full mx-auto max-w-4xl relative">
          <div className="absolute top-0 right-5 md:right-0 m-auto bg-white rounded-lg p-4 flex flex-col items-start shadow-md">
            <p className="text-black">¡Hola {user.role}!</p>
            <div
              onClick={handleLogout}
              className="flex gap-1 items-center cursor-pointer"
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path
                  opacity="1"
                  fill="#4a8ecc"
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
