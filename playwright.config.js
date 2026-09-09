import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests',
  fullyParallel:false,
  workers:1,
  timeout:45000,
  use:{baseURL:'http://127.0.0.1:5173',headless:true,launchOptions:{executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'},viewport:{width:1440,height:1000},screenshot:'only-on-failure'},
  webServer:process.env.SUNROOM_EXTERNAL_SERVER ? undefined : {command:'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort',url:'http://127.0.0.1:5173',reuseExistingServer:true,timeout:60000},
});
