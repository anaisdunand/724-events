import { render, screen } from "@testing-library/react";
import ServiceCard from "./index";

describe("ServiceCard component", () => {
	beforeEach(() => {
		render(
			<ServiceCard src="/mon-image.png" alt="Mon image">
				Voici le contenu de ma carte
			</ServiceCard>
		)
	})

    it("should display an image with an alt value", () => {
        const image = screen.getByAltText("Mon image")
        expect(image).toHaveAttribute("src", "/mon-image.png")
    })

    it("should display the card content", () => {
        const card = screen.getByTestId("service-card")
        expect(card).toHaveTextContent("Voici le contenu de ma carte")
    })
})