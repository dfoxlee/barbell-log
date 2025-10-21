export const validatePassword = (password: string) => {
   // Regular Expression:
   // ^                                        # Start of string
   // (?=.*[a-z])                              # Must contain at least one lowercase letter
   // (?=.*[A-Z])                              # Must contain at least one uppercase letter
   // (?=.*\d)                                 # Must contain at least one digit
   // (?=.*[!@#$%^&*()\-_=+{};:,<.>])         # Must contain at least one special character
   // [A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}   # Must be 8 or more characters long
   // $                                        # End of string

   const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$"
   );

   return passwordRegex.test(password);
};

export const getPasswordComplianceMessage = (password: string) => {
   const errors = [];

   if (password.length < 8) {
      errors.push("at least 8 characters");
   }

   if (!/[A-Z]/.test(password)) {
      errors.push("at least one uppercase letter (A-Z)");
   }

   if (!/[a-z]/.test(password)) {
      errors.push("at least one lowercase letter (a-z)");
   }

   if (!/\d/.test(password)) {
      errors.push("at least one number (0-9)");
   }

   if (errors.length > 0) {
      return `Your password must contain: ${errors.join(", ")}.`;
   }

   return "";
};
