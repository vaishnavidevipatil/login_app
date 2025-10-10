# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all other frontend files
COPY . .

# Expose React dev port
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
