import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import AmountPicker from "../components/modal/amount-picker";
import { addToCart, deleteFromCart } from "../redux/cartSlice";

//doğrudan mock'luyoruz
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// aksiyon oluşturucularını mock'lıyoruz
jest.mock("../redux/cartSlice", () => ({
  addToCart: jest.fn(),
  deleteFromCart: jest.fn(),
}));

describe("AmountPicker", () => {
  let mockDispatch;

  // kullanılacak örnek item
  const item = { id: 1, amount: 3, type: "regular" };

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("bileşen item.amount değerini doğru şekilde render ediyor", () => {
    render(<AmountPicker item={item} />);
    expect(screen.getByText(item.amount.toString())).toBeInTheDocument();
  });

  test("sol butona tıklanınca deleteFromCart aksiyonu dispatch ediliyor", () => {
    const mockDeleteAction = { type: "cart/delete", payload: item };
    deleteFromCart.mockReturnValue(mockDeleteAction);

    render(<AmountPicker item={item} />);
    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    // dispatch ın doğru aksiyonu aldığı kontrol ediliir
    expect(deleteFromCart).toHaveBeenCalledWith(item);
    expect(mockDispatch).toHaveBeenCalledWith(mockDeleteAction);
  });

  test("sağ butona tıklanınca addToCart aksiyonu dispatch ediliyor", () => {
    // Aksiyon oluşturucusuna mock dönüş değeri atıyor
    const expectedPayload = { item, selectedType: item.type };
    const mockAddAction = { type: "cart/add", payload: expectedPayload };
    addToCart.mockReturnValue(mockAddAction);

    render(<AmountPicker item={item} />);
    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    // Doğru aksiyonu aldığı kontrol edilir
    expect(addToCart).toHaveBeenCalledWith(expectedPayload);
    expect(mockDispatch).toHaveBeenCalledWith(mockAddAction);
  });
});
