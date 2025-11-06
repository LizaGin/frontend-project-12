install:
	npm install
	npm install --prefix frontend

build:
	rm -rf frontend/dist
	npm run build --prefix frontend

start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	npm run dev --prefix frontend

start:
	make start-backend & make start-frontend

lint:
	npm run lint --prefix frontend

fix:
	npm run lint:fix --prefix frontend