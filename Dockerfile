# Use a base image with Node.js
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy all necessary files and folders to the container
COPY . .

# Install dependencies for each project
RUN cd Assignment\ 3/backend && npm install
RUN cd Assignment\ 3/inventory-management && npm install
RUN cd my && npm install

# Expose any necessary ports
EXPOSE 3000 3002 3006 5000 5001

# Command to run all the services
CMD ["sh", "-c", "node Assignment\\ 3/backend/server.js & npm start --prefix my & node my/src/components/Server.js & node Assignment\\ 3/backend/db.js & npm start --prefix Assignment\\ 3/inventory-management"]
