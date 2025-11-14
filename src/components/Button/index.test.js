import { render, screen, fireEvent } from "@testing-library/react"
import Button, { BUTTON_TYPES } from "./index"

describe("Button component", () => {
    it("should include a title and a label", () => {
        render(<Button title="Cliquez ici !">Mon bouton</Button>)
        const button = screen.getByTestId("button")
        expect(button).toHaveAttribute("title", "Cliquez ici !")
        expect(button).toHaveTextContent("Mon bouton")
    })

    describe("when its type is set to BUTTON_TYPES.SUBMIT", () => {
        it("should render an input type submit", () => {
            render(<Button type={BUTTON_TYPES.SUBMIT}>Mon bouton</Button>)
            const button = screen.getByTestId("button")
            expect(button.tagName).toBe("INPUT")
            expect(button).toHaveAttribute("type", "submit")
        })
    })

    describe("when is clicked", () => {
        it("should execute the onClick event handler", () => {
            const onClick = jest.fn()
            render(<Button onClick={onClick} />)
            const button = screen.getByTestId("button")
            fireEvent(
                button,
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true
                })
            )
            expect(onClick).toHaveBeenCalled()
        })
    })
})