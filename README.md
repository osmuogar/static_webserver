# simple-web-service

Simple web service implemented with express and typescript.

## Table of contents

* [simple-web-service](#simple-web-service)
* [Table of contents](#table-of-contents)
* [Installation](#installation)
* [Usage](#usage)
  * [Docker deployment](#docker-deployment)
* [Contributing](#contributing)
* [License](#license)

## Installation

```bash
# Installs all dependencies
npm install

# Compiles all typescript to javascript
npm run build
```

## Ussage

```bash
# Runs the server
npm start
```

### Docker deployment

```bash
# Builds a docker image
docker build -t username/webserver .

# Runs the previously created docker image
docker run -d -p 8080:80 --name webserver username/webserver
```

## Contributing

## License

MIT LICENSE Copyright (c) 2017-present, Óscar Muñoz Garrigós