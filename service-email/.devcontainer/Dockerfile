FROM python:3.8


RUN mkdir ~/.pip && echo '[global]' >> ~/.pip/pip.conf && echo 'index-url = https://mirror.kaiyuanshe.cn/pypi/simple'>> ~/.pip/pip.conf
RUN pip install --upgrade pip
RUN pip install pylint autopep8