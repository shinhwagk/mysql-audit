FROM python:3.8-slim as base

FROM base as builder

RUN apt-get -qq update \
    && apt-get install -y --no-install-recommends \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# get packages
COPY requirements.txt .
RUN pip install -r requirements.txt

FROM base as final
# Enable unbuffered logging
ENV PYTHONUNBUFFERED=1

RUN apt-get -qq update \
    && apt-get install -y --no-install-recommends \
    wget

WORKDIR /email_server

COPY --from=builder /usr/local/lib/python3.8/ /usr/local/lib/python3.8/

COPY main.py .

EXPOSE 8080
ENTRYPOINT [ "python", "main.py" ]