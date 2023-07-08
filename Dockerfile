FROM node:18 as build
WORKDIR /src
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html
EXPOSE 80
RUN ["rm", "-rf", "index.html"]
COPY --from=build /src/dist/angular-portfolio .
