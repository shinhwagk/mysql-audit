FROM python:3.8-alpine

COPY templates templates

COPY requirements.txt .
RUN  pip install -r requirements.txt

COPY mail.py main.py /

ENTRYPOINT python main.py