DOCKERTAG=`date +"%s"`
echo $DOCKERTAG
yarn install
yarn build
docker build . -t djrobotfreak/emeal-backend:$DOCKERTAG
docker push djrobotfreak/emeal-backend:$DOCKERTAG
kubectl -n emeal-prod set image deployment/server server=djrobotfreak/emeal-backend:$DOCKERTAG