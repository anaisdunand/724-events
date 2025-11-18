import { render, screen } from "@testing-library/react"
import ModalEvent from "./index"

const data = {
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
}

describe("ModalEvent component", () => {
    it("should display an image", () => {
        render(<ModalEvent event={data} />)
        const image = screen.getByAltText("Conférence #productCON")
        expect(image).toHaveAttribute("src", "/images/stem-list-EVgsAbL51Rk-unsplash.png")
    })

    it("should display text content", () => {
        render(<ModalEvent event={data} />)

        const modal = screen.getByTestId("event-modal")
		expect(modal).toHaveTextContent(/Conférence #productCON/)
		expect(modal).toHaveTextContent(/Présentation des outils analytics aux professionnels du secteur/)
		expect(modal).toHaveTextContent(/24-25-26 Février/)
	})
})