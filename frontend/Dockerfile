# docker file for frontend
# build the frontend and run the server
# /home/neo/Downloads/AI-Defender/frontend/Dockerfile

FROM node:18

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "start"]
