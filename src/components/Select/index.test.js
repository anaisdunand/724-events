import { fireEvent, render, screen } from "@testing-library/react"
import Select from "./index"

// describe("When a select is created", () => {
//     it("a list of choices is displayed", () => {
//         render(<Select selection={["value1", "value2"]} />);
//         const selectElement = screen.getByTestId("select-testid");
//         const selectDefault = screen.getByText("Toutes");
//         expect(selectElement).toBeInTheDocument();
//         expect(selectDefault).toBeInTheDocument();
//     });
//     it("a collapse action button is displayed", () => {
//         render(<Select selection={["value1", "value2"]} />);
//         const collapseButtonElement = screen.getByTestId("collapse-button-testid");
//         expect(collapseButtonElement).toBeInTheDocument();
//     });

//     describe("with a label", () => {
//         it("a label is displayed", () => {
//             render(<Select label="label" selection={["value1", "value2"]} />);
//             const labelDefault = screen.getByText("label");
//             expect(labelDefault).toBeInTheDocument();
//         });
//     });

//     describe("and a click is triggered on collapse button", () => {
//         it("a list of values is displayed", () => {
//             render(<Select selection={["value1", "value2"]} />);
//             const collapseButtonElement = screen.getByTestId("collapse-button-testid");
//             fireEvent(
//                 collapseButtonElement,
//                 new MouseEvent("click", {
//                     bubbles: true,
//                     cancelable: true,
//                 })
//             );
//             const choice1 = screen.getByText("value1");
//             const choice2 = screen.getByText("value2");
//             expect(choice1).toBeInTheDocument();
//             expect(choice2).toBeInTheDocument();
//         });
//         describe("and a click is triggered on a choice item", () => {
//             it("a onChange callback is called", () => {
//                 const onChange = jest.fn();
//                 render(<Select selection={["value1", "value2"]} onChange={onChange} />);
//                 const collapseButtonElement = screen.getByTestId("collapse-button-testid");
//                 fireEvent(
//                     collapseButtonElement,
//                     new MouseEvent("click", {
//                         bubbles: true,
//                         cancelable: true,
//                     })
//                 );
//                 const choice1 = screen.getByText("value1");
//                 fireEvent(
//                     choice1,
//                     new MouseEvent("click", {
//                         bubbles: true,
//                         cancelable: true,
//                     })
//                 );
//                 expect(onChange.mock.calls.length).toBeGreaterThan(0);
//                 fireEvent(
//                     collapseButtonElement,
//                     new MouseEvent("click", {
//                         bubbles: true,
//                         cancelable: true,
//                     })
//                 );
//                 const choiceAll = screen.getByText("Toutes");
//                 fireEvent(
//                     choiceAll,
//                     new MouseEvent("click", {
//                         bubbles: true,
//                         cancelable: true,
//                     })
//                 );
//                 expect(onChange.mock.calls.length).toBeGreaterThan(1);
//             });
//         });
//     });
// });

describe("Select component", () => {
    it("should display collapse button", () => {
        render(<Select selection={["Option 1", "Option 2"]} />)
        const button = screen.getByTestId("collapse-button")
        expect(button).toBeInTheDocument()
    })

    it("should display default label", () => {
        render(<Select selection={["Option 1", "Option 2"]} />)
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
            fireEvent(
                button,
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true
                })
            )
            const option1 = screen.getByText("Option 1")
            const option2 = screen.getByText("Option 2")
            expect(option1).toBeInTheDocument()
            expect(option2).toBeInTheDocument()
        })

        describe("and an option is selected", () => {
            it("should execute the onChange event handler", () => {
                const onChange = jest.fn()
                render(<Select selection={["Option 1", "Option 2"]} onChange={onChange} />)
                const button = screen.getByTestId("collapse-button")
                fireEvent(
                    button,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true
                    })
                )
                const option1 = screen.getByText("Option 1")
                fireEvent(
                    option1,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true
                    })
                )
                expect(onChange).toHaveBeenCalledTimes(1)
                fireEvent(
                    button,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true
                    })
                )
                const defaultOption = screen.getByText("Toutes")
                fireEvent(
                    defaultOption,
                    new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true
                    })
                )
                expect(onChange).toHaveBeenCalledTimes(2)
            })
        })
    })
})