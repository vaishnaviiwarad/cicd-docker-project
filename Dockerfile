# Use lightweight official Node.js image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package file and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source files
COPY app.js ./

# Expose port 3000
EXPOSE 3000

# Start the web application
CMD ["node", "app.js"]
