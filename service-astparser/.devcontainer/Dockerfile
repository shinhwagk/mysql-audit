#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM golang:1.13.5

# Avoid warnings by switching to noninteractive
# ENV DEBIAN_FRONTEND=noninteractive


# This Dockerfile adds a non-root 'vscode' user with sudo access. However, for Linux,
# this user's GID/UID must match your local user UID/GID to avoid permission issues
# with bind mounts. Update USER_UID / USER_GID if yours is not 1000. See
# https://aka.ms/vscode-remote/containers/non-root-user for details.
# ARG USERNAME=vscode
# ARG USER_UID=1000
# ARG USER_GID=$USER_UID

# Configure apt, install packages and tools
# RUN sed -i 's/deb\.debian\.org/mirrors\.aliyun\.com/g'  /etc/apt/sources.list
# RUN sed -i 's/security\.debian\.org/mirrors\.aliyun\.com/g' /etc/apt/sources.list
# RUN apt-get update 
# RUN apt-get -y install git 

# && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
# ENV http_proxy=http://10.65.193.51:31081
# RUN git config --global http.proxy http://10.65.193.51:31081
RUN go env -w GOPROXY=https://goproxy.cn,direct
RUN go env -w GO111MODULE="on" 
# go env -w GOPROXY=https://goproxy.io,direct
# RUN go get -u -v \
#         github.com/mdempsky/gocode \
#         github.com/uudashr/gopkgs/cmd/gopkgs \
#         github.com/ramya-rao-a/go-outline \
#         # github.com/acroca/go-symbols \
#         # github.com/godoctor/godoctor \
#         # golang.org/x/tools/cmd/guru \
#         # golang.org/x/tools/cmd/gorename \
#         github.com/rogpeppe/godef \
#         # github.com/zmb3/gogetdoc \
#         # github.com/haya14busa/goplay/cmd/goplay \
#         # github.com/sqs/goreturns \
#         # github.com/josharian/impl \
#         # github.com/davidrjenni/reftools/cmd/fillstruct \
#         # github.com/fatih/gomodifytags \
#         # github.com/cweill/gotests/... \
#         golang.org/x/tools/cmd/goimports \
#         golang.org/x/lint/golint \
#         golang.org/x/tools/cmd/gopls
#         # github.com/alecthomas/gometalinter \
#         # honnef.co/go/tools/... \
#         # github.com/golangci/golangci-lint/cmd/golangci-lint \
#         # github.com/mgechev/revive \
#         # github.com/derekparker/delve/cmd/dlv 2>&1 \

# RUN go get -u -v \
#     github.com/mdempsky/gocode \
#     github.com/uudashr/gopkgs/cmd/gopkgs \
#     github.com/ramya-rao-a/go-outline \
#     github.com/stamblerre/gocode \
#     github.com/rogpeppe/godef \
#     golang.org/x/tools/cmd/goimports \
#     golang.org/x/lint/golint \
#     golang.org/x/tools/cmd/gopls



# RUN go get -u -v golang.org/x/tools/cmd/gopls
# RUN go get -u -v github.com/mdempsky/gocode
# RUN go get -u -v github.com/uudashr/gopkgs/cmd/gopkgs
# RUN go get -u -v github.com/ramya-rao-a/go-outline
# RUN go get -u -v github.com/stamblerre/gocode
# RUN go get -u -v github.com/rogpeppe/godef
# RUN go get -u -v golang.org/x/tools/cmd/goimports
# RUN go get -u -v golang.org/x/lint/golint

# RUN go get -u -v \
#     github.com/pingcap/parser \
#     github.com/pingcap/parser/ast \
# 	github.com/pingcap/tidb/types/parser_driver


RUN go get -v golang.org/x/tools/gopls