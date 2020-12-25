FROM mongo

COPY ./backup/dump /tmp/backup
COPY ./sync-prod-with-ci-db.sh /docker-entrypoint-initdb.d/sync-prod-with-ci-db.sh

RUN chmod 777 /docker-entrypoint-initdb.d/sync-prod-with-ci-db.sh

# CMD mongod --fork --logpath /var/log/mongodb.log; \
#     mongorestore /tmp/backup/; \
#     mongod --shutdown; \
#     docker-entrypoint.sh mongod