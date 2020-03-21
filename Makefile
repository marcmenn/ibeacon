.PHONY: build
build: dc_build

.PHONY: dc_build
dc_build:
	docker-compose build

.PHONY: start
start:
	docker-compose up -d

CB_CLUSTER=localhost
CB_USERNAME=username
CB_PASSWORD=password
CB_BUCKET_NAME=default
CB_BUCKET_TYPE=couchbase
CB_BUCKET_RAMSIZE=128
CB_CLI=docker-compose exec couchbase couchbase-cli
CB_CLI_OPTS=--cluster "$(CB_CLUSTER)" --username "$(CB_USERNAME)" --password "$(CB_PASSWORD)"
CB_INFO=($(CB_CLI) server-info $(CB_CLI_OPTS) &> /dev/null) && echo 'Couchbase ready'

.PHONY: cb_info
cb_info:
	$(CB_CLI) server-info $(CB_CLI_OPTS)

.PHONY: cb_ready
cb_ready:
	@$(CB_INFO) || \
	(docker-compose up -d couchbase && sleep 2 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO)) || \
	(sleep 4 && $(CB_INFO))

.PHONY: cb_init
cb_init: cb_ready
	@($(CB_CLI) bucket-edit $(CB_CLI_OPTS) --bucket "$(CB_BUCKET_NAME)" --bucket-ramsize "$(CB_BUCKET_RAMSIZE)" &> /dev/null) || \
	($(CB_CLI) cluster-init --cluster-username "$(CB_USERNAME)" --cluster-password "$(CB_PASSWORD)" && \
	$(CB_CLI) bucket-create $(CB_CLI_OPTS) --bucket "$(CB_BUCKET_NAME)" --bucket-type "$(CB_BUCKET_TYPE)" --bucket-ramsize "$(CB_BUCKET_RAMSIZE)")

.PHONY: test
test: npm_test

.PHONY: npm_test
npm_test: cb_init
	cd backend; npm test
