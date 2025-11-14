import { render, screen } from "@testing-library/react"
import md5 from "md5"
import Icon from "."

describe("Icon component", () => {
    describe("when its name is twitch", () => {
        it("should have the right path hash value", () => {
            render(<Icon name="twitch" />)
            const path = screen.getByTestId("icon-path")
            expect(md5(path.getAttribute("d"))).toEqual("327fbc38c8e878259c3ec35ef231517a")
        })
    })

    describe("when its name is facebook", () => {
        it("should have the right path hash value", () => {
            render(<Icon name="facebook" />)
            const path = screen.getByTestId("icon-path")
            expect(md5(path.getAttribute("d"))).toEqual("bbea4c9e40773b969fdb6e406059f853")
        })
    })

    describe("when its name is twitter", () => {
        it("should have the right path hash value", () => {
            render(<Icon name="twitter" />)
            const path = screen.getByTestId("icon-path")
            expect(md5(path.getAttribute("d"))).toEqual("82f5be4a5c07199cb75dacec50b90b2a")
        })
    })

    describe("when its name is youtube", () => {
        it("should have rights paths hash values", () => {
            render(<Icon name="youtube" />)
            const paths = screen.getAllByTestId("icon-path")
            expect(md5(paths[0].getAttribute("d"))).toEqual("43342876c2fc40e5b2afe621443ff95b")
            expect(md5(paths[1].getAttribute("d"))).toEqual("0af3bfe3ff95607efaf2b66ed8df1253")
        })
    })

    describe("when its name is close", () => {
        it("should have the right path hash value", () => {
            render(<Icon name="close" />)
            const path = screen.getByTestId("icon-path")
            expect(md5(path.getAttribute("d"))).toEqual("fe53fa5bf815b6d5983fcadf9a15d3d1")
        })
    })

    describe("when it has an invalid name", () => {
        it("shouldn't have any children", () => {
            render(<Icon name="wrong-name" />)
            const icon = screen.getByTestId("icon")
            expect(icon.children.length).toBe(0)
        })
    })
})