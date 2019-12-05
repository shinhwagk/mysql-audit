import unittest
import os
from main import createDBcnx, executeDDLs


class TestSum(unittest.TestCase):

    def test_sum(self):
        cnx = createDBcnx(os.environ["host"], os.environ["port"], os.environ["user"],
                          os.environ["password"])
        rs = executeDDLs(
            cnx, ["create database test1", "create database test1"])
        self.assertEqual(rs, ["ok", "ok"], "Should be 6")


if __name__ == '__main__':
    unittest.main()
