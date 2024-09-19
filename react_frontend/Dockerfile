# Dockerfile for React Frontend
FROM node:14

WORKDIR /app

COPY react_frontend/package.json react_frontend/package-lock.json ./
RUN npm install

COPY react_frontend/ .

EXPOSE 3000

CMD ["npm", "start"]