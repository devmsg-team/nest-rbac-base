import { IConfig } from "./configuration";

export const jwtConfig: IConfig['jwt'] = {
  secret: '123456',
  signOptions: {
    expiresIn: "1d",
  }
};

export const redisConfigExpiresIn: IConfig['redisExpiresIn'] = 60 * 60 * 24;
