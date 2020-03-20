.PHONY: build
build: dc_build

.PHONY: dc_build
dc_build:
	docker-compose build

.PHONY: start
start:
	docker-compose up -d
