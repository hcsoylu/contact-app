import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY!;

export const hashPasword = (password: string): string => {
  return CryptoJS.HmacSHA1(password, secretKey).toString();
};
