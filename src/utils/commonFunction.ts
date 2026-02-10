import crypto from "crypto";


export function hashedPassword(str: string) {
  return crypto.createHash("md5").update(str).digest("hex");
}