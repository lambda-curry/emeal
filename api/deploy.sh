DOCKERTAG=`date +"%s"`
echo "Building and deploying emeal/api:$DOCKERTAG"
cp ../yarn.lock ./dist/yarn.lock
yarn install
yarn build
docker build . -t emeal/api:$DOCKERTAG
docker push emeal/api:$DOCKERTAG
kubectl -n emeal-prod set image deployment/api api=emeal/api:$DOCKERTAG