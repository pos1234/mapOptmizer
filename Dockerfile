# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
