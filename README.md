sqls -> checkout - http -> inspection - rpc -> astparser
        checkout       <- inspection <-
        checkout -> email
        checkout <-> sqlexecuter
        checkout -> email

## astparser
```sh
protoc -I helloworld/ helloworld/helloworld.proto --go_out=plugins=grpc:helloworld
```
