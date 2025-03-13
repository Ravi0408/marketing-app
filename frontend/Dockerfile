# Step 1: Build React app
FROM node:18 AS build

# Set working directory for React frontend
WORKDIR /frontend

# Copy the package.json and install dependencies
COPY ./package*.json ./
RUN npm install

# Copy the rest of the frontend app files
COPY ./ ./

# Build the React app for production
RUN npm run build

# Step 2: Create the production container
FROM nginx:alpine

# Copy the custom nginx.conf to the Nginx config directory
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the build output to the Nginx HTML directory
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /frontend/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
