import { fireEvent, render, screen } from "@testing-library/react"
import { api, DataProvider } from "../../contexts/DataContext"
import Events from "./index"

const data = {
    events: [
        {
            id: 1,
            type: "soirée d'entreprise",
            date: "2022-04-29T20:28:45.744Z",
            title: "Conférence #productCON",
            cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
            description: "Présentation des outils analytics aux professionnels du secteur",
            nb_guesses: 1300,
            periode: "24-25-26 Février",
            prestations: [
                "1 espace d’exposition",
                "1 scène principale",
                "2 espaces de restauration",
                "1 site web dédié"
            ]
        },
        {
            id: 2,
            type: "forum",
            date: "2022-04-29T20:28:45.744Z",
            title: "Forum #productCON",
            cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
            description: "Présentation des outils analytics aux professionnels du secteur",
            nb_guesses: 1300,
            periode: "24-25-26 Février",
            prestations: [
                "1 espace d’exposition",
                "1 scène principale"
            ]
        }
    ]
}

describe("EventList component", () => {
    afterEach(() => {
		jest.clearAllMocks()
	})

    it("should display list of cards", async () => {
        api.loadData = jest.fn().mockResolvedValue(data)
		render(
            <DataProvider>
                <Events />
            </DataProvider>
        )
        const cards = await screen.findAllByTestId("event-card")
        expect(cards).toHaveLength(2)
    })

    describe("when error occured", () => {
        it("should display error message", async () => {
            api.loadData = jest.fn().mockRejectedValue(new Error)
            render(
                <DataProvider>
                    <Events />
                </DataProvider>
            )
            const message = await screen.findByText("An error occured")
            expect(message).toBeInTheDocument()
        })
    })

    describe("when a category is selected", () => {
        it("should display filtered list of cards", async () => {
            api.loadData = jest.fn().mockResolvedValue(data)
            render(
                <DataProvider>
                    <Events />
                </DataProvider>
            )

            const button = await screen.findByTestId("collapse-button")
            fireEvent.click(button)

            const categories = await screen.findAllByRole("radio")
            expect(categories).toHaveLength(3)
            fireEvent.click(categories[1])

            const filteredCards = await screen.findAllByTestId("event-card")
            expect(filteredCards).toHaveLength(1)
        })
    })

    describe("when a card is clicked", () => {
        it("should display card details in a modal", async () => {
            api.loadData = jest.fn().mockResolvedValue(data)
            render(
                <DataProvider>
                    <Events />
                </DataProvider>
            )

            const cards = await screen.findAllByTestId("event-card")
            expect(cards[0]).toHaveTextContent("Conférence #productCON")
            fireEvent.click(cards[0])

            const modal = await screen.findByTestId("event-modal")
            expect(modal).toHaveTextContent("1 site web dédié")
        })
    })
})