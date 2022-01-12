FROM node:16-alpine
WORKDIR /app/client
COPY package.json /app/client
RUN npm install --force
RUN npm install react-scripts@3.4.1 -g
COPY . ./
RUN npm run build
EXPOSE 3000