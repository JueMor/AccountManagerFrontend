FROM node:18.16.0 as build
LABEL authors="GrandJM"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/AccountManagerFront /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]
