import crypto from "crypto";


export function hashedPassword(str: string) {
  return crypto.createHash("md5").update(str).digest("hex");
};

export const toEnum = (val: boolean) : "Yes" | "No" => (val === true ? "Yes" : "No");

export const fromEnum = (val: string | null | undefined) => val === "Yes";