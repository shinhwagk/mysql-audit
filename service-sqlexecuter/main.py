import mysql.connector
from json import loads, dumps
from http.server import BaseHTTPRequestHandler, HTTPServer


def executeDMLs(cnx, sqls):
    return 2


def createDBcnx(host, port, user, password):
    return mysql.connector.connect(
        host=host, user=user, port=port, password=password)


def executeDDLs(cnx, sqls):
    rs = []
    c = cnx.cursor()
    rs = list(map(lambda x: executeDDL(c, x), sqls))
    c.close()
    return rs


def executeDDL(c, sql):
    try:
        c.execute(sql)
    except Exception as e:
        return str(e)
    else:
        return "ok"


def bootstrapExecuter(c):
    rs = []
    cnx = createDBcnx(c["host"], c["port"], c["user"], c["pass"])
    rs = executeDDLs(cnx, c["sqls"])
    cnx.close()
    return rs


class MainHTTPRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, ct=None):
        self.send_response(200)
        ct and self.send_header("Content-type", ct)
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        self.wfile.writable()

    def do_POST(self):
        """
        request body: "host", "port", "user", "pass", "sqls"
        """
        body = self.rfile.read(int(self.headers['Content-Length']))
        self._set_headers("application/json")
        self.wfile.write(dumps(bootstrapExecuter(loads(body))).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=MainHTTPRequestHandler, port=7000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

if __name__ == '__main__':
    print("sqlexecuter service start.")
    run()