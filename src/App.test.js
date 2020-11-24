/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders without crashing", () => {
  render(<App />)
  const linkElement = screen.getByText(/eReuse Reports Platform/i)
  expect(linkElement).toBeInTheDocument()
})
