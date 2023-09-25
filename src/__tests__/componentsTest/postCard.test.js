import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostCard from "../../components/site/PostCard";
import { Provider } from "react-redux";
import store from "../../store";

describe("render post card component", () => {
  const post = {
    authorUsername: "alexbird",
    caption: "Photo was made from scanned 35mm film",
    postId: "02c6f4fdefff4409b12b793cfb5e0eeb",
    timestamp: 1693024855,
    likes: [{ authorUsername: "kate_oliver" }],
  };

  it("when click post open Modal", async () => {
    render(
      <Provider store={store}>
        <PostCard post={post} />
      </Provider>
    );

    const openModalBtn = screen.getByTestId("post-modal");
    fireEvent.click(openModalBtn);

    const expectedAction = {
      modalName: "post modal",
      data: {
        postId: "02c6f4fdefff4409b12b793cfb5e0eeb",
      },
    };

    expect(store.getState().modal.modals[0]).toEqual(expectedAction);
  });

  it("snapshot testing", () => {
    const tree = render(<PostCard post={post} />);
    expect(tree).toMatchSnapshot();
  });
});
