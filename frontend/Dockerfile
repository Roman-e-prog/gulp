# Build Stage
FROM node:lts-alpine as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --silent

# Copy the entire project
COPY . .
# Run the Gulp tasks
RUN npm install -g gulp-cli
RUN gulp frontend-build
# Production Stage
FROM nginx:stable-alpine as production
COPY --from=build /app/frontend/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
