# FROM golang:1.13

# COPY astparser ./

# CMD astparser

# FROM alpine
# COPY astparser /
# ENTRYPOINT  ["/astparser"]

FROM golang:alpine AS build-env
WORKDIR /app
ADD . /app
RUN go env -w GOPROXY=https://goproxy.cn,direct
RUN go env -w GO111MODULE="on" 
RUN cd /app && go build -o miservice

FROM alpine
WORKDIR /app
COPY --from=build-env /app/miservice /app
ENTRYPOINT ./miservice