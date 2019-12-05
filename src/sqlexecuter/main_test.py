import unittest
import os
from main import createDBcnx, executeDDLs

"""
1007 (HY000): Can't create database 'test1'; database exists
1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'database1 test1' at line 1
"""


class TestSum(unittest.TestCase):

    def test_sum(self):
        cnx = createDBcnx(os.environ["host"], os.environ["port"], os.environ["user"],
                          os.environ["password"])
        rs = executeDDLs(
            cnx, ["create database test1", "create database test2"])
        print(rs[1])
        self.assertEqual(rs, ["ok", "ok"], "Should be 6")


if __name__ == '__main__':
    unittest.main()
