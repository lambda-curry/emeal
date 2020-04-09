DOCKERTAG=`date +"%s"`
echo $DOCKERTAG
yarn install && \
yarn build && \
cp ../yarn.lock ./dist/yarn.lock && \
docker build . -t emeal/api:$DOCKERTAG && \
docker push emeal/api:$DOCKERTAG && \
kubectl -n emeal-dev set image deployment/api api=emeal/api:$DOCKERTAG