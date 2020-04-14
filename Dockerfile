##
# NOTE: The use of this dockerfile requires to build the web server first
##
FROM node:12-buster-slim

# Exposes a socket to the host
EXPOSE 80

# Working directory
WORKDIR /home/node
 
# Adding required files
ADD ./dist /home/node/dist
ADD ./node_modules /home/node/node_modules
ADD ./package.json /home/node/package.json


# Executes the server
CMD ["npm", "start"]