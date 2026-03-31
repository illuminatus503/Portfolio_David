import bcrypt from "bcryptjs";

export const passwordHasher = {
  async compare(plainText, hash) {
    return bcrypt.compare(plainText, hash);
  }
};
