FROM python:3.8-slim

COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 7000
ENTRYPOINT [ "python", "main.py" ]

COPY main.py .