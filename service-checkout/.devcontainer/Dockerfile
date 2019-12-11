#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM node:lts

# Avoid warnings by switching to noninteractive
# ENV DEBIAN_FRONTEND=noninteractive

# ARG USER_UID=1000
# ARG USER_GID=$USER_UID

# # RUN sed -i 's/deb\.debian\.org/mirrors\.aliyun\.com/g'  /etc/apt/sources.list
# # RUN sed -i 's/security\.debian\.org/mirrors\.aliyun\.com/g' /etc/apt/sources.list
# # RUN apt-get update \
# #     && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \ 
# #     && apt-get -y install git \
# #     && apt-get install -y curl apt-transport-https lsb-release \
# #     && apt-get update \
# #     && if [ "$USER_GID" != "1000" ]; then groupmod node --gid $USER_GID; fi \
# #     && if [ "$USER_UID" != "1000" ]; then usermod --uid $USER_UID node; fi \
# #     && apt-get install -y sudo \
# #     && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
# #     && chmod 0440 /etc/sudoers.d/node \

# #     && apt-get autoremove -y \
# #     && apt-get clean -y \
# #     && rm -rf /var/lib/apt/lists/*

# ENV DEBIAN_FRONTEND=

RUN npm set registry https://registry.npm.taobao.org
RUN npm i -g npm
RUN npm i -g typescript eslint
