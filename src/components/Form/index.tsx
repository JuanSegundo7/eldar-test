import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import validationSchema from "../../utils/validation";
import Image from "next/image";
import { userValidate } from "@/utils/userValidate";
import { useUser } from "@/context/userContext";

const Form = () => {
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const res = userValidate(values);

      if (res) {
        login(res);
        router.push("/dashboard");
      }

      setError("El usuario ingresado no se encuentra");
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      formik.setErrors({});
    }, 3000);

    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [formik.errors, error]);

  return (
    <div>
      <form
        className="w-full h-full flex flex-col items-center justify-center gap-6 bg-white p-6 rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <Image src="/imgs/e-logo.png" width="32" height="32" alt="logo" />
        <div className="flex gap-[4px] flex-col">
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            placeholder="e-mail"
            className={`bg-eldar-light-grey px-4 py-1 rounded-lg outline-0 ${
              formik.errors.email &&
              formik.touched.email &&
              "border border-red-600"
            }`}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm text-left">
              {formik.errors.email}
            </p>
          )}
        </div>
        <div className="flex gap-[4px] flex-col">
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            placeholder="password"
            className={`bg-eldar-light-grey px-4 py-1 rounded-lg outline-0 ${
              formik.errors.password &&
              formik.touched.password &&
              "border border-red-600"
            }`}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm max-w-[180px] leading-4 text-left">
              {formik.errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          onClick={() => {
            formik.handleSubmit();
          }}
          className="w-full bg-eldar-blue text-white rounded-lg"
        >
          Ingresar
        </button>
        {error && <p className="text-red-600 text-center w-[150px]">{error}</p>}
        <p className="text-sm cursor-pointer">¿Olvidaste tu contraseña?</p>
      </form>
    </div>
  );
};

export default Form;
