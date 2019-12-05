import unittest
from main import createDbConn


class TestSum(unittest.TestCase):

    def test_sum(self):
        self.assertEqual(sum([1, 2, 3]), 6, "Should be 6")
        self.assertEqual(createDbConn("127.0.0.1", 3306, "root",
                                      "password", ["create database abc"]), 1, "Should be 1")


if __name__ == '__main__':
    unittest.main()
