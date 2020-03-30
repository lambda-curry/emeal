yarn install
yarn build
docker build . -t djrobotfreak/emeal-frontend
docker push djrobotfreak/emeal-frontend