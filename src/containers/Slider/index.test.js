import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { api, DataProvider } from "../../contexts/DataContext"
import { getMonth } from "../../helpers/Date"

import Slider from "./index"

const data = {
	focus: [
		{
			title: "World economic forum",
			description: "Oeuvre à la coopération entre le secteur public et le privé",
			date: "2022-02-28T20:28:45.744Z",
			cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
		},
		{
			title: "World gaming day",
			description: "Évènement mondial autour du gaming",
			date: "2022-03-29T20:28:45.744Z",
			cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
		},
		{
			title: "World farming day",
			description: "Évènement mondial autour de la ferme",
			date: "2022-01-29T20:28:45.744Z",
			cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
		}
	]
}

describe("Slider component", () => {
	beforeEach(async () => {
		jest.clearAllMocks()
		api.loadData = jest.fn().mockResolvedValue(data)

		render(
			<DataProvider>
				<Slider />
			</DataProvider>
		)
	})

	it("should fetch and render data correctly", async () => {
		expect(api.loadData).toHaveBeenCalledTimes(1)

		const cards = await screen.findAllByTestId("slide-card")
		expect(cards).toHaveLength(3)

		cards.forEach((card, i) => {
			const event = data.focus[i]

			expect(card).toHaveTextContent(event.title)
			expect(card).toHaveTextContent(event.description)
			expect(card.querySelector("img")).toHaveAttribute("src", event.cover)
			expect(card).toHaveTextContent(getMonth(new Date(event.date)))
		})
	})

	it("should display cards sorted by descending date", async () => {
		const cards = await screen.findAllByTestId("slide-card")
		const months = cards.map(card =>
			card.querySelector(".SlideCard__description div").textContent.trim()
		)
		expect(months).toEqual(["mars", "février", "janvier"])
	})

	it("should only have one visible card at a time", async () => {
		const cards = await screen.findAllByTestId("slide-card")
		const visible = cards.filter(card =>
			card.classList.contains("SlideCard--display")
		)
		const hidden = cards.filter(card =>
			card.classList.contains("SlideCard--hide")
		)
		expect(visible).toHaveLength(1)
		expect(hidden).toHaveLength(2)
	})

	describe("when a radio button is clicked", () => {
		it("should change visible card", async () => {
			const cards = await screen.findAllByTestId("slide-card")
			const buttons = await screen.findAllByRole("radio")
			expect(buttons).toHaveLength(3)

			fireEvent.click(buttons[1])
			expect(cards[1].classList).toContain("SlideCard--display")
		})
	})

	describe("when Spacekey is pressed", () => {
		it("should toggle play/pause state", async () => {
			async function getSliderState() {
				const cards = await screen.findAllByTestId("slide-card")
				const currentCard = cards.findIndex(card =>
					card.classList.contains("SlideCard--display")
				)
				return currentCard
			}

			let currentCard = await getSliderState()
			expect(currentCard).toBe(0)

			fireEvent.keyDown(window, { code: "Space" })

			currentCard = await getSliderState()
			expect(currentCard).toBe(0)

			fireEvent.keyDown(window, { code: "Space" })

			await waitFor(async () => {
				currentCard = await getSliderState()
				expect(currentCard).toBe(1)
			}, { timeout: 5000 })
		})

		it("should show popup", async () => {
			let popup = screen.queryByTestId("popup")
			expect(popup).toBeNull()

			fireEvent.keyDown(window, { code: "Space" })

			popup = await screen.findByTestId("popup")
			expect(popup).toHaveTextContent("I I")
			await waitForElementToBeRemoved(() => screen.getByTestId("popup"), { timeout: 1100 })

			fireEvent.keyDown(window, { code: "Space" })
			
			popup = await screen.findByTestId("popup")
			expect(popup).toHaveTextContent("⯈")
			await waitForElementToBeRemoved(() => screen.getByTestId("popup"), { timeout: 1100 })
		})
	})
})