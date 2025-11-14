import { render, screen } from "@testing-library/react"
import EventCard from "./index"

describe("EventCard component", () => {
    beforeEach(() => {
        render(
            <EventCard
                src="/mon-image.png"
                alt="Mon image"
                label="Mon label"
                title="Mon titre"
                date={new Date("2022-04-01")}
                small
            />
        )
    })

    it("should display an image with an alt value", () => {
        const image = screen.getByAltText("Mon image")
        expect(image).toHaveAttribute("src", "/mon-image.png")
    })

    it("should display a label, a title and a formatted date", () => {
		const card = screen.getByTestId("event-card")
		expect(card).toHaveTextContent(/Mon label/)
		expect(card).toHaveTextContent(/Mon titre/)
		expect(card).toHaveTextContent(/avril/)
	})

    describe("when has the 'small' prop", () => {
        it("should add the modifier 'small' to the class name", () => {
            const card = screen.getByTestId("event-card")
            expect(card.className.includes("EventCard--small")).toBe(true)
        })
    })
})