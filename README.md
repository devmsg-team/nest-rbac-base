# nest-rbac-base

rbac基础工程


## web工程

### 创建umi4项目

```shell
yarn create umi
```

### 安装@devmsg/umi-plugin-rbac插件

```
yarn add @devmsg/umi-plugin-rbac
```

### 在.umirc.ts配置插件

```ts
export default {
  npmClient: 'yarn',
  plugins: [
    '@devmsg/umi-plugin-rbac'
  ],
  deadCode: {},
  rbac: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};
```

### 配置app.ts
```ts
import { request, RuntimeConfig, history } from 'umi'

export const rbac: RuntimeConfig['rbac'] = {
  title: 'RBAC',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  getMenuData: async () => {
    const { success, data } = await request('/api/getMenus')
    return success ? data : [];
  },
  logout: async () => {
    const { success } = await request('/api/logout');
    if (success) {
      history.replace('/login');
    }
  },
}

export async function getInitialState(): Promise<{
  username?: string;
}> {
  if (location.pathname === '/login') {
    return {};
  }
  const res = await request('/api/checkAuth');
  return {
    username: res.data.username,
  };
}
```

## 服务工程

正常启动就行
