import { defineRule } from "vee-validate";
import { LETTERS_AND_SPACES_REGEX, PASSWORD_STRENGTH_REGEX } from "~/shared/constants/regex";
import { buildYupRules } from "~/shared/utils/validation-rules";

export function useValidationRules() {
  const { t } = useI18n();
 
  defineRule("min_8", (value: string) => {
    if (!value || value.length < 8) return t("validation.min8");
    return true;
  });

  defineRule("max_60", (value: string) => {
    if (value && value.length > 60) return t("validation.max60");
    return true;
  });

  defineRule("valid_email", (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) return t("validation.email");
    return true;
  });

  defineRule("letters_spaces", (value: string) => {
    if (value && !LETTERS_AND_SPACES_REGEX.test(value))
      return t("validation.lettersSpaces");
    return true;
  });

  defineRule("strong_password", (value: string) => {
    if (!value || !PASSWORD_STRENGTH_REGEX.test(value))
      return t("validation.password");
    return true;
  });

  const schemas = buildYupRules(t);
 
  return { schemas };
}