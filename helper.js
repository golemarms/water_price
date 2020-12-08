export function my_round(n, dec_places=2) {
    return +(n).toFixed(dec_places);
}

export let water_price = {
    first_40 : 2.74,
    beyond_40 : 3.69
}

export let m3_breakdown = function(volume_m3, round=false) {
    let first_40 = Math.min(volume_m3, 40);
    let beyond_40 = volume_m3 - first_40;

    if (round) {
        return {first_40 : my_round(first_40),
                beyond_40 : my_round(beyond_40)} 
    }
    
    else return {first_40, beyond_40} 
}

export let m3_cost_breakdown = function(volume_m3) {
    let m3_cost_breakdown = {}
    for (let [type, volume] of Object.entries(m3_breakdown(volume_m3))) {
        m3_cost_breakdown[type] = my_round(volume * water_price[type]);
    }
    return m3_cost_breakdown;
}

export let m3_to_sgd = function(volume_m3, round=false) {
    return (round ? my_round : v => v)(Object.values(m3_cost_breakdown(volume_m3)).reduce((acc, v)=> acc + v, 0));
}

export let sgd_to_m3 = function(sgd, round=false) {
    let first_40_sgd = Math.min(sgd, 40*water_price["first_40"]);
    let beyond_40_sgd = sgd - first_40_sgd;
    return (round ? my_round : v => v)( first_40_sgd/ water_price["first_40"] + beyond_40_sgd/ water_price["beyond_40"]) 
}

export let density_data = [
    {
      "group": 1.8676,
      "sum": 26668.6607,
      "pdf": 0.0016,
      "cumsum": 26668.6607,
      "cdf": 0.0016
    },
    {
      "group": 3.7025,
      "sum": 111916.2739,
      "pdf": 0.0069,
      "cumsum": 138584.9346,
      "cdf": 0.0085
    },
    {
      "group": 5.5375,
      "sum": 261733.8003,
      "pdf": 0.016,
      "cumsum": 400318.7349,
      "cdf": 0.0245
    },
    {
      "group": 7.3724,
      "sum": 460275.6987,
      "pdf": 0.0282,
      "cumsum": 860594.4336,
      "cdf": 0.0527
    },
    {
      "group": 9.2074,
      "sum": 671421.6999,
      "pdf": 0.0411,
      "cumsum": 1532016.1335,
      "cdf": 0.0938
    },
    {
      "group": 11.0423,
      "sum": 857537.1154,
      "pdf": 0.0525,
      "cumsum": 2389553.2489,
      "cdf": 0.1463
    },
    {
      "group": 12.8773,
      "sum": 1007397.2463,
      "pdf": 0.0617,
      "cumsum": 3396950.4952,
      "cdf": 0.208
    },
    {
      "group": 14.7123,
      "sum": 1113111.6967,
      "pdf": 0.0682,
      "cumsum": 4510062.1919,
      "cdf": 0.2762
    },
    {
      "group": 16.5472,
      "sum": 1151135.1181,
      "pdf": 0.0705,
      "cumsum": 5661197.31,
      "cdf": 0.3467
    },
    {
      "group": 18.3822,
      "sum": 1154272.222,
      "pdf": 0.0707,
      "cumsum": 6815469.5319,
      "cdf": 0.4174
    },
    {
      "group": 20.2171,
      "sum": 1101310.0728,
      "pdf": 0.0674,
      "cumsum": 7916779.6048,
      "cdf": 0.4848
    },
    {
      "group": 22.0521,
      "sum": 1028398.5896,
      "pdf": 0.063,
      "cumsum": 8945178.1944,
      "cdf": 0.5478
    },
    {
      "group": 23.887,
      "sum": 941516.126,
      "pdf": 0.0577,
      "cumsum": 9886694.3203,
      "cdf": 0.6055
    },
    {
      "group": 25.722,
      "sum": 846856.4995,
      "pdf": 0.0519,
      "cumsum": 10733550.8198,
      "cdf": 0.6573
    },
    {
      "group": 27.5569,
      "sum": 771635.982,
      "pdf": 0.0473,
      "cumsum": 11505186.8019,
      "cdf": 0.7046
    },
    {
      "group": 29.3919,
      "sum": 666508.6865,
      "pdf": 0.0408,
      "cumsum": 12171695.4884,
      "cdf": 0.7454
    },
    {
      "group": 31.2269,
      "sum": 575443.4205,
      "pdf": 0.0352,
      "cumsum": 12747138.9089,
      "cdf": 0.7807
    },
    {
      "group": 33.0618,
      "sum": 501840.0127,
      "pdf": 0.0307,
      "cumsum": 13248978.9216,
      "cdf": 0.8114
    },
    {
      "group": 34.8968,
      "sum": 432083.2619,
      "pdf": 0.0265,
      "cumsum": 13681062.1835,
      "cdf": 0.8379
    },
    {
      "group": 36.7317,
      "sum": 374396.0138,
      "pdf": 0.0229,
      "cumsum": 14055458.1973,
      "cdf": 0.8608
    },
    {
      "group": 38.5667,
      "sum": 322079.8644,
      "pdf": 0.0197,
      "cumsum": 14377538.0617,
      "cdf": 0.8805
    },
    {
      "group": 40.4016,
      "sum": 276100.2098,
      "pdf": 0.0169,
      "cumsum": 14653638.2716,
      "cdf": 0.8974
    },
    {
      "group": 42.2366,
      "sum": 238766.4275,
      "pdf": 0.0146,
      "cumsum": 14892404.6991,
      "cdf": 0.912
    },
    {
      "group": 44.0716,
      "sum": 202223.5685,
      "pdf": 0.0124,
      "cumsum": 15094628.2675,
      "cdf": 0.9244
    },
    {
      "group": 45.9065,
      "sum": 174676.5832,
      "pdf": 0.0107,
      "cumsum": 15269304.8508,
      "cdf": 0.9351
    },
    {
      "group": 47.7415,
      "sum": 150588.6231,
      "pdf": 0.0092,
      "cumsum": 15419893.4739,
      "cdf": 0.9443
    },
    {
      "group": 49.5764,
      "sum": 124007.1682,
      "pdf": 0.0076,
      "cumsum": 15543900.6421,
      "cdf": 0.9519
    },
    {
      "group": 51.4114,
      "sum": 108747.9787,
      "pdf": 0.0067,
      "cumsum": 15652648.6208,
      "cdf": 0.9586
    },
    {
      "group": 53.2463,
      "sum": 95129.234,
      "pdf": 0.0058,
      "cumsum": 15747777.8548,
      "cdf": 0.9644
    },
    {
      "group": 55.0813,
      "sum": 78950.2591,
      "pdf": 0.0048,
      "cumsum": 15826728.1139,
      "cdf": 0.9693
    },
    {
      "group": 56.9162,
      "sum": 69935.8727,
      "pdf": 0.0043,
      "cumsum": 15896663.9866,
      "cdf": 0.9735
    },
    {
      "group": 58.7512,
      "sum": 60194.8994,
      "pdf": 0.0037,
      "cumsum": 15956858.886,
      "cdf": 0.9772
    },
    {
      "group": 60.5862,
      "sum": 48842.2768,
      "pdf": 0.003,
      "cumsum": 16005701.1628,
      "cdf": 0.9802
    },
    {
      "group": 62.4211,
      "sum": 44013.139,
      "pdf": 0.0027,
      "cumsum": 16049714.3018,
      "cdf": 0.9829
    },
    {
      "group": 64.2561,
      "sum": 39201.8348,
      "pdf": 0.0024,
      "cumsum": 16088916.1366,
      "cdf": 0.9853
    },
    {
      "group": 66.091,
      "sum": 34083.2517,
      "pdf": 0.0021,
      "cumsum": 16122999.3883,
      "cdf": 0.9874
    },
    {
      "group": 67.926,
      "sum": 31279.53,
      "pdf": 0.0019,
      "cumsum": 16154278.9183,
      "cdf": 0.9893
    },
    {
      "group": 69.7609,
      "sum": 27111.1729,
      "pdf": 0.0017,
      "cumsum": 16181390.0913,
      "cdf": 0.991
    },
    {
      "group": 71.5959,
      "sum": 25922.8066,
      "pdf": 0.0016,
      "cumsum": 16207312.8978,
      "cdf": 0.9926
    },
    {
      "group": 73.4309,
      "sum": 20884.8442,
      "pdf": 0.0013,
      "cumsum": 16228197.742,
      "cdf": 0.9938
    },
    {
      "group": 75.2658,
      "sum": 16355.0002,
      "pdf": 0.001,
      "cumsum": 16244552.7422,
      "cdf": 0.9948
    },
    {
      "group": 77.1008,
      "sum": 15391.8398,
      "pdf": 0.0009,
      "cumsum": 16259944.582,
      "cdf": 0.9958
    },
    {
      "group": 78.9357,
      "sum": 13979.6289,
      "pdf": 0.0009,
      "cumsum": 16273924.2109,
      "cdf": 0.9966
    },
    {
      "group": 80.7707,
      "sum": 12059.6804,
      "pdf": 0.0007,
      "cumsum": 16285983.8913,
      "cdf": 0.9974
    },
    {
      "group": 82.6056,
      "sum": 10293.9824,
      "pdf": 0.0006,
      "cumsum": 16296277.8737,
      "cdf": 0.998
    },
    {
      "group": 84.4406,
      "sum": 10690.4938,
      "pdf": 0.0007,
      "cumsum": 16306968.3675,
      "cdf": 0.9987
    },
    {
      "group": 86.2755,
      "sum": 8275.9133,
      "pdf": 0.0005,
      "cumsum": 16315244.2808,
      "cdf": 0.9992
    },
    {
      "group": 88.1105,
      "sum": 7924.1446,
      "pdf": 0.0005,
      "cumsum": 16323168.4254,
      "cdf": 0.9997
    },
    {
      "group": 89.9455,
      "sum": 5517.2132,
      "pdf": 0.0003,
      "cumsum": 16328685.6386,
      "cdf": 1
    }
  ]

