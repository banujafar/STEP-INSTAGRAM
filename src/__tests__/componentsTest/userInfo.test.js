import "whatwg-fetch";
import React from "react";
import {
  fireEvent,
  render as rtlRender,
  screen,
  waitFor,
} from "@testing-library/react";
import UserInfo from "../../components/site/UserInfo";
import { Provider } from "react-redux";
import store from "../../store";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { apiSlice } from "../../store/api/apiSlice";
import {
  useGetCurrentUserQuery,
  useSubscribeMutation,
  useUnsubcribeMutation,
} from "../../store/api/userApiSlice";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ username: "banu123" }), // Mock useParams
}));
jest.mock("../../store/api/userApiSlice"); // Mock the custom hook

const middlewares = [thunk, apiSlice.middleware];
const mockStore = configureMockStore(middlewares);
let subscribeMock, unSubscribeMock;

const render = (component, mockStore) =>
  rtlRender(<Provider store={mockStore || store}>{component}</Provider>);

describe("render user page", () => {
  let userData = {
    username: "banu123",
    firstName: "Banu",
    lastName: "Ceferli",
    posts: [],
    subscriptions: [
      { username: "alexbird", firstName: "Alex", lastName: "Kite" },
    ],
    subscribers: [
      { username: "alexbird", firstName: "Alex", lastName: "Bird" },
      { username: "banu123", firstName: "Banu", lastName: "Jafar" },
      { username: "SyuSun", firstName: "Syusan", lastName: "Sunny" },
      { username: "kate_oliver", firstName: "Kate", lastName: "Oliver" },
    ],
  };

  const initialState = {
    [apiSlice.reducerPath]: apiSlice.reducer(undefined, {}),
    auth: {
      username: "kate_oliver",
    },
    user: {
      userData: {
        username: "kate_oliver",
        firstName: "Kate",
        lastName: "Oliver",
        posts: [],
        subscriptions: [
          { username: "kate_oliver", firstName: "Kate", lastName: "Oliver" },
          { username: "alexbird", firstName: "Alex", lastName: "Kite" },
          { username: "banu123", firstName: "Banu", lastName: "Jafar" },
        ],
        subscribers: [
          { username: "alexbird", firstName: "Alex", lastName: "Bird" },
          { username: "banu123", firstName: "Banu", lastName: "Jafar" },
          { username: "SyuSun", firstName: "Syusan", lastName: "Sunny" },
        ],
      },
    },
  };

  beforeEach(() => {
    const refetchFunction = jest.fn(async () => {
      userData = {
        ...userData,
        subscribers: [
          { username: "alexbird", firstName: "Alex", lastName: "Kite" },
        ],
      };
      return userData;
    });

    useGetCurrentUserQuery.mockReturnValue({
      data: { data: userData },
      refetch: refetchFunction,
    });

    subscribeMock = jest.fn(async () => ({ data: userData }));
    unSubscribeMock = jest.fn(async () => ({ data: userData }));

    useSubscribeMutation.mockReturnValue([subscribeMock, {}]);
    useUnsubcribeMutation.mockReturnValue([unSubscribeMock, {}]);
  });

  it("render user info when currentUser exists", async () => {
    const initialState = {
      [apiSlice.reducerPath]: apiSlice.reducer(undefined, {}),
      auth: {
        username: "banu123",
      },
    };

    const store = mockStore(initialState);

    render(<UserInfo userData={userData} />, store);

    const editProfile = screen.getByTestId("edit-profile");
    expect(editProfile).toBeInTheDocument();
  });

  it("render user info when currentUser doesn't exist", async () => {
    const store = mockStore(initialState);
    render(<UserInfo userData={userData} />, store);

    const toggleSubBtn = screen.getByText("Unsubscribe");
    expect(toggleSubBtn).toBeInTheDocument();

    fireEvent.click(toggleSubBtn);
    
    await waitFor(() => {
      const clickedBtn = screen.getByText("Subscribe");
      expect(clickedBtn).toBeInTheDocument();
      expect(userData).toEqual({
        username: "banu123",
        firstName: "Banu",
        lastName: "Ceferli",
        posts: [],
        subscriptions: [
          { username: "alexbird", firstName: "Alex", lastName: "Kite" },
        ],
        subscribers: [
          { username: "alexbird", firstName: "Alex", lastName: "Kite" },
        ],
      });

      expect(screen.getByText(/Subscribed by/i).textContent).toBe(
        "Subscribed by alexbird "
      );
    });

    expect(unSubscribeMock).toHaveBeenCalledWith({ username: "banu123" });
  });
});
