const REQUIRED_BASE_LABEL = 'Ayúdanos ingresando tu';

export const FORM_ERRORS = {
  city: {
    required: () => `${REQUIRED_BASE_LABEL} ciudad de residencia`,
  },

  country: {
    required: () => `${REQUIRED_BASE_LABEL} país de residencia`,
  },
  birthdate: {
    required: () => `${REQUIRED_BASE_LABEL} fecha de nacimiento`,
  },
  email: {
    email: () => `Debes ingresar un e-mail válido`,
    pattern: () => `Debes ingresar un e-mail válido`,
    required: () => `${REQUIRED_BASE_LABEL} correo electrónico`,
  },
  gender: {
    required: () => `${REQUIRED_BASE_LABEL} género`,
  },
  name: {
    maxlength: ({ requiredLength }) =>
      `Solo se admiten ${requiredLength} caracteres`,
    pattern: () => `Solo se admiten letras`,
    required: () => `${REQUIRED_BASE_LABEL} nombre`,
  },
  adress: {
    required: () => `${REQUIRED_BASE_LABEL} dirección`,
  },
  zipcode: {
    required: () => `${REQUIRED_BASE_LABEL} código postal`,
  },
  password: {
    required: () => `${REQUIRED_BASE_LABEL} contraseña`,
  },
};
