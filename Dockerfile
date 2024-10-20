# Step 1: Use an official Node.js runtime as the base image
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install app dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port your app runs on (default is 3000 for Express apps)
EXPOSE 3000

# Step 7: Define the command to start your app
CMD [ "node", "app.js" ]
