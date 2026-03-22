import * as yup from "yup";
import { LETTERS_AND_SPACES_REGEX, PASSWORD_STRENGTH_REGEX } from "../constants/regex";

export function buildYupRules(t: (key: string) => string) {
  return {
    baseString: yup
      .string()
      .required(t("validation.required"))
      .max(60, t("validation.max_60")),
 
    lettersAndSpaces: yup
      .string()
      .required(t("validation.required"))
      .max(60, t("validation.max_60"))
      .matches(LETTERS_AND_SPACES_REGEX, t("validation.letters_spaces")),
 
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email"))
      .max(60, t("validation.max_60")),
 
    password: yup
      .string()
      .required(t("validation.required"))
      .min(8, t("validation.min_8"))
      .max(60, t("validation.max_60"))
      .matches(PASSWORD_STRENGTH_REGEX, t("validation.password")),
  } as const;
}