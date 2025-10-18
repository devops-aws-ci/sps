
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
npm run start:backend
![alt text](/images/image.png)

1️⃣ Test email sending (again)
curl -X POST http://localhost:4000/api/start \
  -H "Content-Type: application/json" \
  -d '{"phase": "conception", "target": "safrawiihab@gmail.com"}'

2️⃣ Test inbox reading
curl http://localhost:4000/api/messages


## recompiler l application
npm install
npm run build
