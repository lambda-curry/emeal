DOCKERTAG=`date +"%s"`
yarn install
yarn build
yarn build:modal
docker build . -t djrobotfreak/emeal-frontend:$DOCKERTAG
docker push djrobotfreak/emeal-frontend:$DOCKERTAG
kubectl -n emeal-prod set image deployment/frontend frontend=djrobotfreak/emeal-frontend:$DOCKERTAG