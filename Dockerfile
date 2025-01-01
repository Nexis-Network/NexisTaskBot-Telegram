FROM node:20-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY back-end/package*.json ./

# Install app dependencies including cors
RUN npm install && \
    npm install cors express-session cookie-parser nodemon

# Copy app source
COPY back-end ./

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000

# Expose port
EXPOSE 3000

# Start the app without nodemon in production
CMD ["node", "./bin/www"] 