# Use Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies from the backend folder
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend application code
COPY backend/ .

# Cloud Run sets the PORT environment variable to 8080 by default.
# The app will listen on this port via process.env.PORT.
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
