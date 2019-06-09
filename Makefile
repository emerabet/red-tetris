soutenance:
	rm -rf server/build
	rm -rf server/dist
	rm -rf client/build
	cd client && yarn && yarn build
	cp -r client/build server/
	cd server && yarn && tsc && yarn prod

.PHONY: soutenance