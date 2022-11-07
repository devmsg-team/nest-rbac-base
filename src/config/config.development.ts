import { defineConfig } from './defineConfig';
import { jwtConfig, redisConfigExpiresIn } from './auth.config'

export default defineConfig({
  jwt: jwtConfig,
  redisExpiresIn: redisConfigExpiresIn,
  // typeorm 配置
  database: {
    type: 'mysql', //数据库类型
    host: '127.0.0.1', //数据库地址
    port: 3306, //数据库端口
    username: 'root', //数据库账号
    password: '123456', //数据库密码
    database: 'movie', //数据库名称
    autoLoadModels: true, //模型自动加载，无需在在配置处重复写实体。
    synchronize: true, //如果为true 自动加载的模型将被同步进数据库，生产环境要关闭，否则可能因为字段的删除而造成数据的丢失。
    logging: false, //是否启动日志记录
  },
  // redis 配置
  redis: {
    config: {
      url: 'redis://localhost:6379/0',
    },
  },
  // 队列redis 配置
  bullRedis: {
    host: 'localhost',
    port: '6379',
    password: '',
  },
});
