# static webserver

Static webserver implemented with express and typescript.
Perfect for single web pages.

## Table of contents

* [static-web-server](#static-web-server)
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

## Usage

You need to provide a configuration file such as [this](./config/config.json)
and define a variable to point to it's location folder such as:

```bash
export SIMPLE_WEB_SERVICE_CONFIG_DIR="/my/config/dir/"
```

Then you can start the server
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
