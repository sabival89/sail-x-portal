FROM node:18-alpine

# # Expose port 8000
EXPOSE 8000

# # Create work directory
WORKDIR /usr/src/app

COPY package*.json ./

# # Install app dependencies
RUN npm install

# # Copy app source to work directory
COPY . .

# # Build and run the app
CMD ["npm","run","dev"]

