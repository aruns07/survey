FROM node:6.6
RUN mkdir -p /usr/survey/src/app
WORKDIR /usr/survey/src/app
COPY package.json /usr/survey/src/app/
COPY gulpfile.js /usr/survey/src/app/
RUN npm install
RUN npm install gulp-cli -g
# Bundle app source
COPY . /usr/survey/src/app
RUN gulp buildProd
EXPOSE 3000
CMD [ "node", "web.js", "--isDockerContainer"]