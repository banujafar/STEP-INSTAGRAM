import "whatwg-fetch";
import React from "react";
import {
  fireEvent,
  render as rtlRender,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { apiSlice } from "../../store/api/apiSlice";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";
import {
  useDeletePostMutation,
  useLikePostMutation,
} from "../../store/api/postApiSlice";
import PostActions from "../../components/site/PostActions/PostActions";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ username: "banu123" }), // Mock useParams
}));
// Mock the custom hook
jest.mock("../../store/api/postApiSlice");
jest.mock("../../store/api/userApiSlice");

const middlewares = [thunk, apiSlice.middleware];
const mockStore = configureMockStore(middlewares);

let deletePostMock;
let likePostMock;

const render = (component, mockStore) =>
  rtlRender(<Provider store={mockStore || store}>{component}</Provider>);

describe("render post actions component", () => {
  let userData = {
    username: "banu123",
    firstName: "Banu",
    lastName: "Ceferli",
    posts: [
      {
        authorUsername: "alexbird",
        caption: "Photo was made from scanned 35mm film",
        postId: "02c6f4fdefff4409b12b793cfb5e0eeb",
        timestamp: 1693024855,
        likes: [
          { authorUsername: "kate_oliver" },
          { authorUsername: "banu123" },
        ],
      },
    ],
  };

  beforeEach(() => {
    const refetchFunction = jest.fn(async () => {
      userData = {
        ...userData,
        posts: [
          {
            authorUsername: "alexbird",
            caption: "Photo was made from scanned 35mm film",
            postId: "02c6f4fdefff4409b12b793cfb5e0eeb",
            timestamp: 1693024855,
            likes: [{ authorUsername: "kate_oliver" }],
          },
        ],
      };
      return userData;
    });

    deletePostMock = jest.fn(async () => ({ data: userData }));
    likePostMock = jest.fn(async () => ({ data: userData }));

    useGetCurrentUserQuery.mockReturnValue({
      data: { data: userData },
      refetch: refetchFunction,
    });

    useLikePostMutation.mockReturnValue([likePostMock, {}]);
    useDeletePostMutation.mockReturnValue([deletePostMock, {}]);
  });

  it("when click like button if it is liked delete else like mutation is called", async () => {
    const initialState = {
      [apiSlice.reducerPath]: apiSlice.reducer(undefined, {}),
      auth: {
        username: "banu123",
      },
    };

    const store = mockStore(initialState);

    render(
      <PostActions
        likes={userData.posts[0].likes}
        comments={userData.posts[0].comments}
        authorUsername={userData.posts[0].authorUsername}
        caption={userData.posts[0].caption}
        postId={userData.posts[0].postId}
      />,
      store
    );

    await waitFor(() => {
      const likeBtn = screen.getByTestId("toggle-like");
      fireEvent.click(likeBtn);

      expect(userData).toEqual({
        username: "banu123",
        firstName: "Banu",
        lastName: "Ceferli",
        posts: [
          {
            authorUsername: "alexbird",
            caption: "Photo was made from scanned 35mm film",
            postId: "02c6f4fdefff4409b12b793cfb5e0eeb",
            timestamp: 1693024855,
            likes: [{ authorUsername: "kate_oliver" }],
          },
        ],
      });
    });

    expect(deletePostMock).toHaveBeenCalledWith({
      postId: "02c6f4fdefff4409b12b793cfb5e0eeb",
    });
  });
});
