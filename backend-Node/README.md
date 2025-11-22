
## Run application first see in package.json cofig , the start function call
{
  "name": "sps",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "start:backend": "node server/server.js",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },

## Backend app launch and test
cd ~/work/sps/backend-Node
npm run start:backend
![alt text](/images/image.png)

1️⃣ in shell windows ,Test email sending (again)
curl -X POST http://localhost:4000/api/start \
  -H "Content-Type: application/json" \
  -d '{"phase": "conception", "target": "safrawiihab@gmail.com"}'

2️⃣ in shell windows , Test inbox reading
curl http://localhost:4000/api/messages


## recompiler l application
cd ~/work/sps/backend-Node
npm install
npm run build
