DOCKERTAG=`date +"%s"`
echo $DOCKERTAG
yarn install
yarn build
docker build . -t djrobotfreak/emeal-api:$DOCKERTAG
docker push djrobotfreak/emeal-api:$DOCKERTAG
kubectl -n emeal-prod set image deployment/api api=djrobotfreak/emeal-api:$DOCKERTAG