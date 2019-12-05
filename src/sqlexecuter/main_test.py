import unittest
import os
from main import createDBcnx, executeDDLs


class TestSum(unittest.TestCase):

    def test_sum(self):
        cnx = createDBcnx(os.environ["host"], os.environ["port"], os.environ["user"],
                          os.environ["password"])
        executeDDLs(cnx, ["create database test1", "create database1 test2"])
        self.assertEqual(sum([1, 2, 3]), 6, "Should be 6")


if __name__ == '__main__':
    unittest.main()
