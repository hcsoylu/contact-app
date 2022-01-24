import CryptoJS from "crypto-js";

export const hashPasword = (password: string): string => {
  return CryptoJS.HmacSHA1(password, "secretkey").toString();
};
