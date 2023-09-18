import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import * as fs from 'fs';

const IMAGE_SERVER_TEST_IP = '3.23.243.145';

const psegTestLink = 'psegtest.servicelinkplatform.net';
const aceTestLink = 'acetest.servicelinkplatform.net';

const servers = {
  ivan: '192.168.1.187',
  eric: '192.168.1.139',
  alexXia: '192.168.1.128',
  geetha: '192.168.1.151',
  bill: '192.168.1.224',
  demitroServer: '192.168.1.126',
  mikeAVL: '192.168.1.216:8082',
  boris: '192.168.1.146',
  test: '192.168.1.160',
};

const currentServer: keyof typeof servers = 'geetha';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
    }),
    ViteEjsPlugin(),
    // reactVirtualized(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/avlSocket/': {
        target: 'ws://192.168.1.216:8082/',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/avlSocket/, ''),
      },
      '/sl3/': {
        target: `http://${servers[currentServer]}/`,
        changeOrigin: true,
      },
      '/sl/': {
        target: `http://${servers[currentServer]}`,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/sl/, ''),
      },
      '/d/': {
        target: `http://${servers[currentServer]}/`,
        changeOrigin: true,
      },
      '/login': {
        target: `http://${servers[currentServer]}/`,
        changeOrigin: true,
      },
      '/avl/': {
        target: `http://${servers.mikeAVL}/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/avl/, ''),
      },
      '/reportingpath/': {
        target:
          'https://jira.servicelinkplatform.net/projects/SS/customers',
        changeOrigin: true,
      },
      '/mothership/': {
        target: `http://${IMAGE_SERVER_TEST_IP}:8000/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mothership/, ''),
      },
      '/imageserver/': {
        target: `http://${IMAGE_SERVER_TEST_IP}:8080/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/imageserver/, ''),
      },
      '/avlPage/': {
        target: `http://localhost:3000/sl7/avl?sidebar=false`,
        changeOrigin: true,
      },
      // '/ws/avl': {
      //   target: `ws://${mikeAVL}`,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/ws/, ''),
      // },
    },
    fs: {
      allow: ['./', '../../../../servicelink/config'],
    },
  },
  build: {
    outDir: 'build',
    target: 'esnext',
  },
  esbuild: {
    supported: {
      'top-level-await': true, //browsers can handle top-level-await features
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(path.resolve(), './src'),
      config: path.resolve(
        path.resolve(),
        '../../../../servicelink/config',
      ),
      'xml-js': '@netless/xml-js',
    },
  },
});
