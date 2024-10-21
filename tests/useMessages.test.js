import { renderHook, act } from "@testing-library/react";
import { useMessages } from "../src/components/Sidebar/useMessages";
import { getStorageItem, setStorageItem } from "../src/storageHelper";
import messagesData from "../src/assets/messages.json";

jest.mock("../src/storageHelper", () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));

describe("useMessages Hook", () => {
  it("should load messages from storage", async () => {
    getStorageItem.mockResolvedValueOnce(messagesData.messages);

    const { result } = renderHook(() => useMessages(null));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.messages.length).toBeGreaterThan(0);
    expect(getStorageItem).toHaveBeenCalledWith("messages");
  });

  it("should reset messages when resetTrigger changes", async () => {
    const { result, rerender } = renderHook(
      ({ resetTrigger }) => useMessages(resetTrigger),
      {
        initialProps: { resetTrigger: false },
      }
    );

    await act(async () => {
      rerender({ resetTrigger: true });
    });

    expect(result.current.messages).toEqual([]);
    expect(setStorageItem).toHaveBeenCalledWith("messages", []);
  });
});
