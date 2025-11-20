import { render, screen, fireEvent } from "@testing-library/react"
import { api, DataProvider } from "../../contexts/DataContext"
import data from "../../../public/events.json"

import Home from "./index"

describe("Homepage", () => {
    beforeEach(() => {
		jest.clearAllMocks()
		api.loadData = jest.fn().mockResolvedValue(data)

		render(
			<DataProvider>
				<Home />
			</DataProvider>
		)
	})

	describe("Services", () => {
		it("should display a list of services in Services section", () => {
			const services = screen.getAllByTestId("service-card")
            expect(services).toHaveLength(3)
		})
	})

	describe("Events", () => {
		it("should display a list of events in Events section", async () => {
			const events = await screen.findAllByTestId("event-card")
      		expect(events.length).toBeGreaterThan(0)
		})

		it("should display the last event in footer", async () => {
			const event = await screen.findByTestId("last-event-card")
			const last = data.events.reduce((prev, curr) =>
                new Date(curr.date) > new Date(prev.date) ? curr : prev
            )
			expect(event).toHaveTextContent(last.title)
			expect(event).toHaveTextContent(last.type)
		})
	})

	describe("People", () => {
		it("should display a list of people in People section", () => {
			const people = screen.getAllByTestId("people-card")
            expect(people).toHaveLength(6)
		})
	})

	describe("Form", () => {
		it("should display a list of fields and a submit button in Contact section", () => {
			const fields = screen.getAllByTestId("field")
			expect(fields).toHaveLength(4)

			const select = screen.getByText("Personnel / Entreprise")
			expect(select).toBeInTheDocument()

			const button = screen.getByTestId("submit-button")
			expect(button).toBeInTheDocument()
		})

		describe("when submit button is clicked", () => {
			it("should display a success message", async () => {
				const button = screen.getByTestId("submit-button")
				fireEvent.click(button)

				expect(button).toHaveAttribute("value", "En cours...")
				const success = await screen.findByTestId("modal")
				expect(success).toHaveTextContent("Message envoyé !")
				expect(button).toHaveAttribute("value", "Envoyer")
			})
		})
	})
})