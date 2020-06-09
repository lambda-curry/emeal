DOCKERTAG=`date +"%s"`
yarn install
yarn build:modal
yarn build:static
yarn build
docker build . -t emeal/frontend:$DOCKERTAG
docker push emeal/frontend:$DOCKERTAG
kubectl -n emeal-prod set image deployment/frontend frontend=emeal/frontend:$DOCKERTAG