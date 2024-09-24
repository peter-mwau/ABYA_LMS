FROM node:14 as build

WORKDIR /app

COPY react_frontend/package.json react_frontend/package-lock.json ./
RUN npm install

COPY react_frontend/ .

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

