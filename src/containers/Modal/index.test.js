import { fireEvent, render, screen } from "@testing-library/react"
import Modal from "./index"

describe("Modal component", () => {
    it("should be closed by default", () => {
        render(
            <Modal Content={<div>Contenu de la modale</div>}>
                {() => null}
            </Modal>
        )
        const modal = screen.queryByTestId("modal")
        expect(modal).not.toBeInTheDocument()
    })

    describe("when a click opens modal", () => {
        it("should display modal content", async () => {
            render(
                <Modal Content={<div>Contenu de la modale</div>}>
                    {({ setIsOpened }) =>
                        <button
                            data-testid="open-button"
                            type="button"
                            label="Ouvrir"
                            onClick={() => setIsOpened(true)}
                        >
                            Ouvrir
                        </button>
                    }
                </Modal>
            )

            const button = screen.getByTestId("open-button")
            fireEvent.click(button)

            const modal = await screen.findByTestId("modal")
            expect(modal).toBeInTheDocument()
            expect(modal).toHaveTextContent("Contenu de la modale")
        })
    })

    describe("when close button is clicked", () => {
        it("should hide modal content", () => {
            render(
                <Modal Content={<div>Contenu de la modale</div>} opened>
                    {() => null}
                </Modal>
            )
            const button = screen.getByTestId("close-button")
            fireEvent.click(button)

            const modal = screen.queryByTestId("modal")
            expect(modal).not.toBeInTheDocument()
        })
    })
})