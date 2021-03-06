import * as h from "./helper.js"
import * as assert from "assert"

describe("Volume breakdown test", function() {
    function volume_breakdown_test(volume_m3_tested, first_40_expected, beyond_40_expected) {
        assert.deepStrictEqual(
            h.m3_breakdown(volume_m3_tested),
            {first_40 : first_40_expected,
             beyond_40 : beyond_40_expected});
    }
    it("less tn 40m3", function(done) {
        volume_breakdown_test(30, 30, 0)
        done();
    });
    it("equal 40m3", function(done) {
        volume_breakdown_test(40, 40, 0)
        done();
    });
    it("more tn 40m3", function(done) {
        volume_breakdown_test(50, 40, 10)
        done();
    });
})

describe("Price test", function() {
    function price_test(volume_m3_tested, sgd_expected) {
        return assert.equal(h.m3_to_sgd(volume_m3_tested), h.my_round(sgd_expected))
    }
    it("less tn 40m3", function(done) {
        price_test(30, 30 * h.water_price["first_40"]);
        done();
    });
    it("equal 40m3", function(done) {
        price_test(40, 40 * h.water_price["first_40"]);
        done();
    });
    it("more tn 40m3", function(done) {
        price_test(50, 40 * h.water_price["first_40"] + 10 * h.water_price["beyond_40"]);
        done();
    });
})

describe("sgd to m3 test", function() {
    for (let volume_m3 of [10, 100, 1000]) {
        it ( `testing ${volume_m3}m3`, function(done) {
            assert.equal(h.my_round(h.sgd_to_m3(h.m3_to_sgd(volume_m3))), h.my_round(volume_m3));
            done();
        })
    }
})