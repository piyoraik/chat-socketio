restart:
	docker compose down
	docker compose up -d
	(cd /Users/raityupiyo/docker/chat-socketio/client; yarn "start")

noderestart:
	docker compose restart node

nodelogs:
	docker logs -f node

build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

ps:
	docker compose ps -a