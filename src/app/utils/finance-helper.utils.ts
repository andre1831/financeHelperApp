

export interface IBirthDateMaxMin {
  minBirthDate: Date;
  maxBirthDate: Date;
}

export interface IBirthLabelMaxMin {
  minBirthLabel: string;
  maxBirthLabel: string;
}

export function getBirthDateMaxMin(
  min: number = 18,
  max: number = 70,
): IBirthDateMaxMin {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minBirthDate = new Date(
    today.getFullYear() - min,
    today.getMonth(),
    today.getDate(),
  );
  const maxBirthDate = new Date(
    today.getFullYear() - max,
    today.getMonth(),
    today.getDate() + 1,
  );

  return { minBirthDate, maxBirthDate };
}



export const NAME_REGEXP = /^[a-zA-ZñÑüÜáéíóúÁÉÍÓÚ]+$/;

export const PHONE_REGEXP = /^[0-9]*$/;

export const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const MIDDLE_NAME_REGEXP = /^([a-zA-ZñÑüÜáéíóúÁÉÍÓ]+\s)*[a-zA-ZñÑüÜáéíóúÁÉÍÓÚ]+$/;

export const SECOND_SURNAME_REGEXP = /^([a-zA-ZñÑüÜáéíóúÁÉÍÓ]+\s)*[a-zA-ZñÑüÜáéíóúÁÉÍÓÚ]+$/;
