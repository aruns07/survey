# Survey

An app to generate a survey. Add questions and reponse options in json format and survey is ready.

## Build

Dependency
- NodeJS 6.6
- Gulp CLI 1.2.2

### Dev
```
npm install
gulp build
```

### Prod
```
npm install
gulp buildProd
```

### Docker
```
docker build -t survey:1.0 .
docker run -d -P --name survey -v /home/docker/survey/data:/usr/survey/data survey:0.1
```

Data will be present in store.db file.
For Docker at /home/docker/survey/data mounted path
other wise <project folder>/data

## Security
To make the data secure, provide a public encryption key named key.pub.
The applicaton will store the user entered data encrypted.

1. `openssl genrsa -out key.pem 2048`
2. `openssl rsa -in key.pem -pubout > key.pub`

DO NOT PUT THE PRIVATE KEY IN THE SOURCE CODE. KEEP IT SECURE.

### Decrypt & Export
To decrypt the data and export in CSV format use export.js with private key

```
node export.js --privateKeyPath=./key.pem
```



