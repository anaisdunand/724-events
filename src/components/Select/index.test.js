import { fireEvent, render, screen } from "@testing-library/react"
import Select from "./index"

describe("Select component", () => {
    it("should display default label and collapse button", () => {
        render(<Select selection={["Option 1", "Option 2"]} />)

        const button = screen.getByTestId("collapse-button")
        expect(button).toBeInTheDocument()

        const select = screen.getByTestId("select")
        expect(select).toHaveTextContent("Toutes")
    })

    describe("when label is defined", () => {
        it("should display defined label", () => {
            render(<Select label="Mon label" selection={["Option 1", "Option 2"]} />)
            const select = screen.getByTestId("select")
            expect(select).toHaveTextContent("Mon label")
        })
    })

    describe("when collapse button is clicked", () => {
        it("should display a list of options", () => {
            render(<Select selection={["Option 1", "Option 2"]} />)

            const button = screen.getByTestId("collapse-button")
            fireEvent.click(button)

            const options = screen.getAllByRole("radio")
            expect(options).toHaveLength(3)
        })

        describe("and an option is selected", () => {
            it("should execute the onChange event handler", () => {
                const onChange = jest.fn()
                render(<Select selection={["Option 1", "Option 2"]} onChange={onChange} />)

                const button = screen.getByTestId("collapse-button")
                fireEvent.click(button)

                const options = screen.getAllByRole("radio")
                fireEvent.click(options[1])

                const select = screen.getByTestId("select")
                expect(select).toHaveTextContent("Option 1")
                expect(onChange).toHaveBeenCalled()
            })
        })
    })
})