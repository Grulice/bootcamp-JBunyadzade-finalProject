const fetcher = require("./fetcher")
// @ponicode
describe("fetcher.getUserToken", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getUserToken(123, "!ush3r")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getUserToken("user-name", "!Lov3MyPianoPony")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getUserToken("user_name", "!ush3r")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getUserToken(123, ".Matrix53")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getUserToken("username", ".Matrix53")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getUserToken(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getCountries", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getCountries()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getMetals", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getMetals()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getCategories", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getCategories()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getDict", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getDict("supply_item_alt")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getDict("gis_location_name_alt")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getDict("pg_attribute")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getDict("supply_item_entity")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getDict("dump_")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getDict(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.postToDict", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.postToDict("supply_catalog", "not in", "foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.postToDict("supply_item_pack", "TheToken", "This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.postToDict("dump027_", "else", "This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.postToDict("supply_item", "b'false'", "This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.postToDict("dump_", "keyword", "Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.postToDict(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getSearchResults", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getSearchResults("UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getSearchResults("DELETE FROM Projects WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getSearchResults("UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getSearchResults("DROP TABLE tmp;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getSearchResults("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getSearchResults(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getCoinInfo", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getCoinInfo("MPZf3hhgRxurYDDVsHhDc23nDi")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getCoinInfo("3cBk3sCzB58vfDGAznLJK9KPSnW1")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getCoinInfo("LKinAN1FRfbjJXYAEWCbx1H443wbjHip")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getCoinInfo("3pxicLBUuEs8qDUKmTABBcWrxzf")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getCoinInfo("Lq8wLspXaJraZSs3CwiCTF85mkvp")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getCoinInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getMultipleCoinInfo", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getMultipleCoinInfo(["LKinAN1FRfbjJXYAEWCbx1H443wbjHip", "Lq8wLspXaJraZSs3CwiCTF85mkvp", "3pxicLBUuEs8qDUKmTABBcWrxzf", "3pxicLBUuEs8qDUKmTABBcWrxzf", "Lq8wLspXaJraZSs3CwiCTF85mkvp"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getMultipleCoinInfo(["3cBk3sCzB58vfDGAznLJK9KPSnW1", "3cBk3sCzB58vfDGAznLJK9KPSnW1", "3cBk3sCzB58vfDGAznLJK9KPSnW1", "3pxicLBUuEs8qDUKmTABBcWrxzf", "3pxicLBUuEs8qDUKmTABBcWrxzf"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getMultipleCoinInfo(["3cBk3sCzB58vfDGAznLJK9KPSnW1", "3cBk3sCzB58vfDGAznLJK9KPSnW1", "LKinAN1FRfbjJXYAEWCbx1H443wbjHip", "3pxicLBUuEs8qDUKmTABBcWrxzf", "3pxicLBUuEs8qDUKmTABBcWrxzf"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getMultipleCoinInfo(["LKinAN1FRfbjJXYAEWCbx1H443wbjHip", "LKinAN1FRfbjJXYAEWCbx1H443wbjHip", "Lq8wLspXaJraZSs3CwiCTF85mkvp", "MPZf3hhgRxurYDDVsHhDc23nDi", "3cBk3sCzB58vfDGAznLJK9KPSnW1"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getMultipleCoinInfo(["LKinAN1FRfbjJXYAEWCbx1H443wbjHip", "MPZf3hhgRxurYDDVsHhDc23nDi", "MPZf3hhgRxurYDDVsHhDc23nDi", "MPZf3hhgRxurYDDVsHhDc23nDi", "3pxicLBUuEs8qDUKmTABBcWrxzf"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getMultipleCoinInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.createCoin", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.createCoin("Bearer ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.createCoin("/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.createCoin(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.createCoin("access")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.createCoin("is not")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.createCoin(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.putCoin", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.putCoin("Token ", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "Lq8wLspXaJraZSs3CwiCTF85mkvp")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.putCoin("@", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "Lq8wLspXaJraZSs3CwiCTF85mkvp")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.putCoin("/reset/", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "Lq8wLspXaJraZSs3CwiCTF85mkvp")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.putCoin("c", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "LKinAN1FRfbjJXYAEWCbx1H443wbjHip")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.putCoin("not in", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "3pxicLBUuEs8qDUKmTABBcWrxzf")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.putCoin("", undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.deleteCoin", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.deleteCoin("7289708e-b17a-477c-8a77-9ab575c4b4d8", "include")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.deleteCoin("03ea49f8-1d96-4cd0-b279-0684e3eec3a9", "vindex-slice-")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.deleteCoin("7289708e-b17a-477c-8a77-9ab575c4b4d8", "if")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.deleteCoin("a85a8e6b-348b-4011-a1ec-1e78e9620782", "string")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.deleteCoin("a85a8e6b-348b-4011-a1ec-1e78e9620782", "=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.deleteCoin(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getSimilarCoins", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getSimilarCoins("fake_project_id")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getSimilarCoins("proj_")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getSimilarCoins(2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getSimilarCoins("projectId-1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getSimilarCoins("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getSimilarCoins(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.sendOrder", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.sendOrder("user_name", "import", "projects/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.sendOrder("user_name", true, "fake_project_id")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.sendOrder(123, "WORD_", "project_secret_")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.sendOrder("user-name", "ENDMULTILINESTRING", 12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.sendOrder("username", "{%", "projects/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.sendOrder(undefined, undefined, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getOrders", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getOrders("user name", "...")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getOrders("user-name", "test")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getOrders("user name", "B ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getOrders(123, "access")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getOrders("user_name", "pragma")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getOrders(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getAllOrders", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getAllOrders("as")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getAllOrders("token")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getAllOrders("lambda")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getAllOrders("__future__")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getAllOrders("(")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getAllOrders(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.putOrderStatus", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.putOrderStatus("value", "projects/", "ValueError exception should be raised")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.putOrderStatus("b'false'", 12, "Could not find a submission object for message from xqueue")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.putOrderStatus("not", "fake_project_id", "New Error ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.putOrderStatus("linestatement_begin", "project_secret_", "Top level object in 'override.yml' needs to be an object")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.putOrderStatus("linestatement_begin", "fake_project_id", "Missing FileUri configuration")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.putOrderStatus("", undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.postCoinView", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.postCoinView("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.postCoinView("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.postCoinView("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.postCoinView(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.postHistoryView", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.postHistoryView("user name", "token", "LKinAN1FRfbjJXYAEWCbx1H443wbjHip")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.postHistoryView("user-name", "url", "3cBk3sCzB58vfDGAznLJK9KPSnW1")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.postHistoryView("user123", "DEFAULT", "3pxicLBUuEs8qDUKmTABBcWrxzf")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.postHistoryView("user_name", "is not", "MPZf3hhgRxurYDDVsHhDc23nDi")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.postHistoryView("user123", "keyword", "MPZf3hhgRxurYDDVsHhDc23nDi")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.postHistoryView(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetcher.getHistoryViews", () => {
    test("0", () => {
        let callFunction = () => {
            fetcher.getHistoryViews(123, "if")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetcher.getHistoryViews("user-name", "if")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetcher.getHistoryViews("user-name", "refresh_token")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetcher.getHistoryViews("user_name", "undef")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetcher.getHistoryViews("username", "GOTOPYTHON")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetcher.getHistoryViews(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
