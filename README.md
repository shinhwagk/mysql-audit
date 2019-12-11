sqls -> checkout - http -> inspection - rpc -> astparser
        checkout    ->        http          -> 
        checkout       <- inspection <-
        checkout -> email
        checkout <-> sqlexecuter
        checkout -> email

## astparser
```sh
protoc -I helloworld/ helloworld/helloworld.proto --go_out=plugins=grpc:helloworld
```

## webhook
```sh
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```