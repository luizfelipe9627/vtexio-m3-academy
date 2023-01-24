FROM node:14

WORKDIR /app

RUN npm i -g vtex concurrently gulp
RUN yarn


COPY . .
RUN mkdir /root/.vtex
RUN chmod o+rx /root
RUN chown -R node /root/.vtex
RUN ln -s /root/.vtex /home/node/


CMD ["yarn", "vlink"]


