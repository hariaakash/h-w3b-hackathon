import smartpy as sp

@sp.module
def main():

    class SewageOverflow(sp.Contract):
        def __init__(self):
            self.data.count = 0
            # lat, lon, timestamp, overflowValue
            self.data.overflows = sp.cast({}, sp.map[sp.int, sp.list[sp.int]])

        @sp.entrypoint
        def addData(self, element):
            self.data.count += 1
            self.data.overflows[self.data.count] = element

        @sp.onchain_view
        def getData(self):
            return self.data.overflows

        @sp.onchain_view
        def getDataById(self, id):
            return self.data.overflows[id]

if "main" in __name__:

    @sp.add_test()
    def test():
        scenario = sp.test_scenario("Sewage Overflow", main)
        scenario.h1("Sewage Overflow Contract")
        c1 = main.SewageOverflow()
        scenario += c1
        c1.addData([1000, 2000, 12345678, 80])
        c1.addData([2000, 3000, 12345999, 50])
        scenario.show(c1.getData())
        scenario.show(c1.getDataById(1))
