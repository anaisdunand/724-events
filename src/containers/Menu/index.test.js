import { fireEvent, render, screen } from "@testing-library/react"
import Menu from "./index"

describe("Menu component", () => {
    it("should display logo and nav links", () => {
        render(<Menu />)

        const logo = screen.getByRole("img")
        expect(logo).toBeInTheDocument()

        const menu = screen.getByTestId("menu")
        const contactLink = screen.getByTestId("button")

        const links = Array.from(menu.querySelectorAll("li"))
        links.push(contactLink)
        expect(links).toHaveLength(4)
    })

    describe("when a link is clicked", () => {
        it("should change document location href", () => {
            render(<Menu />)
            const contactLink = screen.getByTestId("button")
            fireEvent.click(contactLink)
            expect(window.document.location.hash).toEqual("#contact")
        })
    })
})