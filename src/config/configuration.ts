import { JwtModuleOptions } from "@nestjs/jwt";

// 判断系统是否是开发环境
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// 根据环境变量判断使用配置
export default () => {
  const envConfig: IConfig = require(`./config.${process.env.NODE_ENV}`).default;
  return envConfig;
};

// 配置文件接口
export interface IConfig {
  jwt?: JwtModuleOptions;

  redisExpiresIn?: number;

  /**
   * 数据库配置
   */
  database?: {
    type: string;
    host: string;
    port: number | string;
    username: string;
    password: string;
    database: string;
    autoLoadModels: boolean; // 如果为true，模型将自动载入（默认:false)
    synchronize: boolean; //如果为true，自动载入的模型将同步
    logging: boolean;
  };

  /**
   * redis 配置
   */
  redis?: {
    config: {
      url: string;
    };
  };

  /**
   * 队列配置  
   */
  bullRedis?: {
    host: string;
    port: string;
    password: string;
  };
}
