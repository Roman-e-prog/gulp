FROM node:lts-alpine as build
ENV NODE_ENV=production
WORKDIR /app
# Copy package.json and other related files
COPY package.json ./ package-lock.json ./
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build
EXPOSE 3000

# Production stage
FROM nginx:stable-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
