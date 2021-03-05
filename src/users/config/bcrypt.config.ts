import { registerAs } from "@nestjs/config";

export default registerAs('bcrypt', () => ({ // 👈
  saltRounds: +process.env.SALT_ROUNDS,
}));
