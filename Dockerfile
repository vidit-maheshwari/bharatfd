# Use an official Node.js runtime as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .


EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]