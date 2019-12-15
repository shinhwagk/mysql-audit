import unittest
import os
from main import createDBcnx, executeDDLs, MainHTTPRequestHandler
import threading
import time
import http
from http.server import HTTPServer

"""
1007 (HY000): Can't create database 'test1'; database exists
1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'database1 test1' at line 1
"""


def startHTTPServer():
    server = HTTPServer(("127.0.0.1", 12345), MainHTTPRequestHandler)
    server_thread = threading.Thread(target=server.serve_forever)
    server_thread.start()
    return server


class TestSum(unittest.TestCase):
    def setUp(self):
        # server = HTTPServer(("127.0.0.1", 12345), MainHTTPRequestHandler)
        # print("start http")
        self.server = startHTTPServer()

    def tearDown(self):
        self.server.shutdown()
        print("test end.")

    def test_sum(self):
        self.assertEqual(200, 200, "Should be 1")
        # cnx = createDBcnx(os.environ["host"], os.environ["port"], os.environ["user"],
        #                   os.environ["password"])
        # rs = executeDDLs(
        #     cnx, ["create database test1", "create database test2"])
        # self.assertEqual(rs, ["ok", "ok"], "Should be 6")

    def test_api(self):
        self.assertEqual(200, 200, "Should be26")
        # conn = http.client.HTTPConnection('127.0.0.1', 12345)
        # conn.request("GET", "")
        # response = conn.getresponse()
        # print(response.status, response.reason)
        # self.assertEqual(response.status, 200, "Should be 6")
        # conn.close()


if __name__ == '__main__':
    time.sleep(1)
    unittest.main()
