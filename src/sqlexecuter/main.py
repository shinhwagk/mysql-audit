import mysql.connector
from http.server import BaseHTTPRequestHandler, HTTPServer

# config = {
#     'user': 'root',
#     'password': '123456',
#     'host': '10.65.193.51',
#     'database': '',
#     'raise_on_warnings': True
# }

# cnx = mysql.connector.connect(**config)
# cursor = cnx.cursor()
# cursor.execute(
#     "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
# cursor.close()
# cnx.close()


def abc():
    return 6


def execute_ddl(cursor, sql):
    try:
        cursor.execute(sql)
    except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)


def createDbConn(host, post, user, password, sqls):
    cnx = mysql.connector.connect(host, post, user, password, sqls)
    cursor = cnx.cursor()
    for sql in sqls:
        execute_ddl(cursor, sql)
    cursor.close()
    cnx.close()
    return 1


class MainHTTPRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def _html(self, message):
        """This just generates an HTML document that includes `message`
        in the body. Override, or re-write this do do more interesting stuff.
        """
        content = f"<html><body><h1>{message}</h1></body></html>"
        return content.encode("utf8")  # NOTE: must return a bytes object!

    def do_GET(self):
        self._set_headers()
        self.wfile.write(self._html("hi!"))

    def do_POST(self):
        # <--- Gets the size of data
        content_length = int(self.headers['Content-Length'])
        # <--- Gets the data itself
        post_data = self.rfile.read(content_length)

        self.wfile.write("POST request for {}".format(
            self.path).encode('utf-8'))


def run(server_class=HTTPServer, handler_class=MainHTTPRequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()


if __name__ == '__main__':
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
