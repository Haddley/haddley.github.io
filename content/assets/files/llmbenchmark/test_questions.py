"""Checks the benchmark's own sums against answers worked out by hand. Run: python3 -m unittest -v"""
import unittest
import questions as q


class Sums(unittest.TestCase):
    def test_bank_reconciliation(self):
        # cash book 5,000; charges 50 and a dishonoured cheque 100 are not in the cash book; interest 20 is not either;
        # cheques of 300 are not yet presented; a deposit of 200 is not yet credited.
        self.assertEqual(q.bank_statement_balance(5000, charges=50, interest=20, unpresented=300, uncredited=200, dishonoured=100), 4970.0)

    def test_straight_line_and_reducing_balance(self):
        self.assertEqual(q.straight_line(20000, 2000, 6), 3000.0)
        self.assertEqual(q.reducing_balance_nbv(10000, 0.20, 3), 5120.0)

    def test_gst(self):
        self.assertEqual(q.gst_inclusive(100), 115.0)
        self.assertEqual(q.gst_in_total(115), 15.0)

    def test_inventory(self):
        layers = [(10, 5.0), (10, 7.0)]
        self.assertEqual(q.weighted_average(layers), 6.0)
        self.assertEqual(q.fifo_cost(layers, 15), 85.0)          # 10 x 5 + 5 x 7


class Parsing(unittest.TestCase):
    def test_reads_the_last_answer_line(self):
        self.assertEqual(q.parse_answer("First 1 then 2\nANSWER: 3,496.00"), 3496.0)
        self.assertEqual(q.parse_answer("ANSWER: 10\nI mean\nANSWER: -450"), -450.0)
        self.assertEqual(q.parse_answer("**ANSWER: 22.39**"), 22.39)

    def test_a_missing_answer_line_is_not_a_guess(self):
        self.assertIsNone(q.parse_answer("The answer is 42"))
        self.assertIsNone(q.parse_answer(""))
        self.assertIsNone(q.parse_answer(None))

    def test_a_cent_of_rounding_is_forgiven_but_not_two(self):
        self.assertTrue(q.is_correct(1578.13, 1578.125))
        self.assertTrue(q.is_correct(1578.13, 1578.12))      # exactly one cent apart: a float "within 0.01" test fails this
        self.assertTrue(q.is_correct(1578.11, 1578.12))
        self.assertFalse(q.is_correct(1578.14, 1578.12))
        self.assertFalse(q.is_correct(None, 5.0))


class Questions(unittest.TestCase):
    def test_thirty_questions_six_domains_five_levels(self):
        qs = q.build()
        self.assertEqual(len(qs), 30)
        self.assertEqual(len({x.domain for x in qs}), 6)
        self.assertEqual(sorted({x.level for x in qs}), [1, 2, 3, 4, 5])

    def test_the_same_seed_gives_the_same_questions(self):
        self.assertEqual([x.prompt for x in q.build()], [x.prompt for x in q.build()])

    def test_no_inventory_question_sells_more_than_it_has(self):
        import re
        for seed in range(200):
            for x in q.build(seed):
                if not x.id.startswith("inventory-") or x.level < 3:
                    continue
                units = [int(n) for n in re.findall(r"(\d+) units at", x.prompt)]
                sold = int(re.search(r"sold (\d+) units", x.prompt).group(1))
                returned = re.search(r"returned (\d+) units", x.prompt)
                available = sum(units) - (int(returned.group(1)) if returned else 0)
                self.assertLess(sold, available, "{} (seed {}) sells {} of {}".format(x.id, seed, sold, available))


if __name__ == "__main__":
    unittest.main()
