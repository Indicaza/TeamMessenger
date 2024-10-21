import React from "react";
import { render, screen, act } from "@testing-library/react";
import ChatList from "../src/components/Sidebar/ChatList";
import { getStorageItem } from "../src/storageHelper";
import messagesData from "../src/assets/messages.json";

jest.mock("../src/storageHelper", () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));

describe("ChatList Component", () => {
  it("should render chat list from storage", async () => {
    getStorageItem.mockResolvedValueOnce(messagesData.messages);

    await act(async () => {
      render(<ChatList />);
    });

    const firstMessage = screen.getByText(/Center the Div/);
    expect(firstMessage).toBeInTheDocument();
  });
});
