import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("El email es requerido")
    .email("Ingrese un email válido"),

  password: Yup.string()
    .required("La contraseña es requerida")
    .matches(/[A-Z]/, "La contraseña debe tener al menos mayúscula")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export default ValidationSchema;
