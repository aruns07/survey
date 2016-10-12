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



