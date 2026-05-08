# Use Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies from the backend folder
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend application code
COPY backend/ .

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD [ "npm", "start" ]
