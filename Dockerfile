FROM node:8.8
MAINTAINER Petar Ivanov <pepincho95@gmail.com>

# Create app directory
ENV INSTALL_PATH /burgers-api
RUN mkdir -p ${INSTALL_PATH}

WORKDIR ${INSTALL_PATH}

# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "dev"]
