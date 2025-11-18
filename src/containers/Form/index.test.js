import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Form from "./index"

describe("Form component", () => {
	it("should display form fields and submit button", () => {
		render(<Form />)

		const fields = screen.getAllByTestId("field")
		expect(fields).toHaveLength(4)

		const select = screen.getByText("Personnel / Entreprise")
		expect(select).toBeInTheDocument()

		const button = screen.getByTestId("button")
		expect(button).toBeInTheDocument()
	})

	describe("when submit button is clicked", () => {
		it("should execute the onSuccess event handler", async () => {
			const onSuccess = jest.fn()
			render(<Form onSuccess={onSuccess} />)

			const button = screen.getByTestId("button")
			fireEvent.click(button)
			expect(button).toHaveAttribute("value", "En cours...")

			await waitFor(() => {
				expect(onSuccess).toHaveBeenCalled()
				expect(button).toHaveAttribute("value", "Envoyer")
			})
		})
	})
})