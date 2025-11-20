import { render, screen } from "@testing-library/react"
import { DataProvider, api, useData } from "./index"

describe("Data context", () => {
    afterEach(() => {
        jest.restoreAllMocks()

    })

    it("should call the events.json file", async () => {
        jest.spyOn(api, "loadData").mockResolvedValue({ result: "ok" })
        const Component = () => {
            const { data } = useData()
            return <div>{data?.result}</div>
        }
        render(
            <DataProvider>
                <Component />
            </DataProvider>
        )
        const dataDisplayed = await screen.findByText("ok")
        expect(dataDisplayed).toBeInTheDocument()
    })

    it("should load and parse events.json correctly", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: () => Promise.resolve({ events: [{ id: 1, title: "Mon titre" }] }),
        })
        const data = await api.loadData()
        expect(global.fetch).toHaveBeenCalledWith("/events.json")
        expect(data).toEqual({ events: [{ id: 1, title: "Mon titre" }] })
    })

    describe("if the call failed", () => {
        it("should dispatch an error", async () => {
            window.console.error = jest.fn()
            api.loadData = jest.fn().mockRejectedValue("error on calling events")
            const Component = () => {
                const { error } = useData()
                return <div>{error}</div>
            }
            render(
                <DataProvider>
                    <Component />
                </DataProvider>
            )
            const dataDisplayed = await screen.findByText("error on calling events")
            expect(dataDisplayed).toBeInTheDocument()
        })
    })
})