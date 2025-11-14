import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";

describe("PeopleCard component", () => {
    beforeEach(() => {
        render(
            <PeopleCard
                src="/mon-image.png"
                alt="Mon image"
                name="Mon nom"
                position="Mon travail"
            />
        )
    })
    
    it("should display an image with an alt value", () => {
        const image = screen.getByAltText("Mon image")
        expect(image).toHaveAttribute("src", "/mon-image.png")
    })
    
    it("should display a name and a position", () => {
        const card = screen.getByTestId("people-card")
        expect(card).toHaveTextContent(/Mon nom/)
        expect(card).toHaveTextContent(/Mon travail/)
    })
})