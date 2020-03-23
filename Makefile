.PHONY: default
default: start

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down -v

.PHONY: build
build: dc_build

.PHONY: dc_build
dc_build:
	docker-compose build

.PHONY: start
start:
	docker-compose build
	docker-compose up -d

CLEAN_VIEWS:=rm -rf views/build
CB_CLUSTER=localhost
CB_USERNAME=username
CB_PASSWORD=password
CB_BUCKET_NAME=default
CB_TEST_BUCKET_NAME=test
CB_BUCKET_TYPE=couchbase
CB_BUCKET_RAMSIZE=128
CB_CLI=docker-compose exec couchbase couchbase-cli
CB_CLI_OPTS=--cluster "$(CB_CLUSTER)" --username "$(CB_USERNAME)" --password "$(CB_PASSWORD)"
CB_INFO=($(CB_CLI) server-info $(CB_CLI_OPTS) &> /dev/null) && echo 'Couchbase ready'

.PHONY: cb_info
cb_info:
	$(CB_CLI) server-info $(CB_CLI_OPTS)

.PHONY: cb_up
cb_up:
	@$(CB_INFO) || \
	(docker-compose up -d couchbase && sleep 2 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO))

.PHONY: cb_volume
cb_volume:
	@docker volume inspect cochain-data &> /dev/null || docker volume create --name=cochain-data

.PHONY: cb_ready
start: cb_ready
cb_buckets: cb_up
	@($(CB_CLI) bucket-edit $(CB_CLI_OPTS) --bucket "$(CB_BUCKET_NAME)" --bucket-ramsize "$(CB_BUCKET_RAMSIZE)" &> /dev/null) || \
	($(CB_CLI) cluster-init --cluster-username "$(CB_USERNAME)" --cluster-password "$(CB_PASSWORD)" && \
	$(CB_CLI) bucket-create $(CB_CLI_OPTS) --bucket "$(CB_BUCKET_NAME)" --bucket-type "$(CB_BUCKET_TYPE)" --bucket-ramsize "$(CB_BUCKET_RAMSIZE)" && \
	$(CLEAN_VIEWS))
	@($(CB_CLI) bucket-edit $(CB_CLI_OPTS) --bucket "$(CB_TEST_BUCKET_NAME)" --bucket-ramsize "$(CB_BUCKET_RAMSIZE)" &> /dev/null) || \
	$(CB_CLI) bucket-create $(CB_CLI_OPTS) --bucket "$(CB_TEST_BUCKET_NAME)" --bucket-type "$(CB_BUCKET_TYPE)" --bucket-ramsize "$(CB_BUCKET_RAMSIZE)" --enable-flush 1 && \
	$(CLEAN_VIEWS)
cb_ready: cb_volume cb_buckets views

.PHONY: test

haproxy/test-https.cert.pem: haproxy/test-https.priv.pem
	cd haproxy; openssl req -new -x509 -config test-https.cert.cnf -nodes -days 7300 -key test-https.priv.pem -out test-https.cert.pem

haproxy/test-https.priv.pem:
	cd haproxy; openssl genrsa -out test-https.priv.pem 2048

haproxy/test-https.pem: haproxy/test-https.cert.pem haproxy/test-https.priv.pem
	cat haproxy/test-https.cert.pem haproxy/test-https.priv.pem > haproxy/test-https.pem

.PHONY: haproxy
start: haproxy/test-https.pem
haproxy: haproxy/test-https.pem
	docker-compose up -d haproxy

.PHONY: lint
test: lint
lint: npm_lint
.PHONY: npm_lint
npm_lint:
	cd backend; npm run lint

.PHONY: test_unit
test: test_unit
test_unit:
	cd backend; npm run test:unit

.PHONY: test_integration
test: test_integration
test_integration: cb_ready
	cd backend; npm run test:integration

.PHONY: test_rest-api
test: test_rest-api
test_rest-api: DC:=docker-compose -f docker-compose.rest.yml -f docker-compose.yml
test_rest-api: cb_ready
	@$(DC) up -d --build --force-recreate rest
	cd backend; REST_URL=http://localhost:3030 npm run test:rest-api
	@$(DC) stop rest
	@$(DC) rm -f rest

.PHONY: clean
clean:
	$(CLEAN_VIEWS)

build: views

.PHONY: views
views: views/build/views.json
	cat views/build/views.json | node backend/src/database/upsert-views.js
	cat views/build/views.json | CB_BUCKETNAME=test node backend/src/database/upsert-views.js
.PHONY: views/build/views.json
views/build/views.json:
	cd views; mkdir -p build; node . ../backend/couchbase.views.json > build/views.json
