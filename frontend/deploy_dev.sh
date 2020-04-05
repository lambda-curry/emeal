DOCKERTAG=`date +"%s"`
yarn install
yarn build:dev
yarn build:modal
docker build . -t emeal/frontend-dev:$DOCKERTAG
docker push emeal/frontend-dev:$DOCKERTAG
kubectl -n emeal-dev set image deployment/frontend frontend=emeal/frontend-dev:$DOCKERTAG