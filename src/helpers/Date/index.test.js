import { getMonth } from "./index"

describe("Date helper", () => {
    describe("when getMonth is called", () => {
        it("should return janvier for 2022-01-01 as date", () => {
            const month = getMonth(new Date("2022-01-01"))
            expect(month).toBe("janvier")
        })
        it("should return juillet for 2022-07-08 as date", () => {
            const month = getMonth(new Date("2022-07-08"))
            expect(month).toBe("juillet")
        })
    })
})