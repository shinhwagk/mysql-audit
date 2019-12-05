import unittest
import sys
from main import createDbConn


class TestSum(unittest.TestCase):

    def test_sum(self):
        self.assertEqual(sum([1, 2, 3]), 6, "Should be 6")
        self.assertEqual(createDbConn("127.0.0.1", command_line_param, "root",
                                      "password", ["create database abc"]), 1, "Should be 1")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit("ERRORommand-line parameter must be supplied for these tests")
    command_line_param = sys.argv[1]
    unittest.main()
