import { render, screen } from "@testing-library/react"
import Field, { FIELD_TYPES } from "./index"

describe("Field component", () => {
	it("should include a name, a placeholder and a label", () => {
		render(<Field name="Mon nom" placeholder="Mon placeholder" label="Mon label" />)
		const field = screen.getByTestId("field")
		const label = screen.getByText("Mon label")
		expect(field).toHaveAttribute("name", "Mon nom")
		expect(field).toHaveAttribute("placeholder", "Mon placeholder")
		expect(label).toBeInTheDocument()
	})

	describe("when its type is set to FIELD_TYPES.INPUT_TEXT", () => {
		it("should render an input type text", () => {
			render(<Field type={FIELD_TYPES.INPUT_TEXT} />)
			const field = screen.getByTestId("field")
			expect(field.tagName).toBe("INPUT")
			expect(field).toHaveAttribute("type", "text")
		})
	})

	describe("when its type is set to FIELD_TYPES.TEXTAREA", () => {
		it("should render a textarea", () => {
			render(<Field type={FIELD_TYPES.TEXTAREA} />)
			const field = screen.getByTestId("field")
			expect(field.tagName).toBe("TEXTAREA")
		})
	})

	describe("when its type is set to a wrong value", () => {
		it("should render an input type text", () => {
			render(<Field type="wrong-type" />)
			const field = screen.getByTestId("field")
			expect(field.tagName).toBe("INPUT")
			expect(field).toHaveAttribute("type", "text")
		})
	})
})