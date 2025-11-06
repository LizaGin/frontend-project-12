install:
	npm ci --legacy-peer-deps

start:
	npm start

build:
	rm build -rf
	npm run build

start-frontend:
	npm run dev

start-backend:
	npx start-server -s ./dist -p 5001
