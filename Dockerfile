FROM node:current-alpine3.12

COPY --chown=1000:node . ./

ENTRYPOINT ["startup.sh"]

CMD [ "node" ]