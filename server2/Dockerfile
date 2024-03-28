# Use an official Node.js runtime as the base image
FROM node:21-alpine3.18

# Set the working directory in the container
WORKDIR /express-app

# Copy package.json and package-lock.json to the working directory
COPY . .
COPY package*.json ./

# Install dependencies
RUN npm install --production

EXPOSE 5000

CMD ["node", "index.js"]
