import "whatwg-fetch";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PostList from "../../components/site/PostList";
describe("render Posts List component", () => {
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
          { authorUsername: "diasik" },
        ],
      },
      {
        authorUsername: "alexbird",
        caption: "",
        postId: "d87711dd37004d88af06dee100d9c20a",
        timestamp: 1693038987,
        likes: [
          { authorUsername: "kate_oliver" },
          { authorUsername: "diasik" },
        ],
      },
    ],
    subscriptions: [],
    subscribers: [],
  };

  it("when click list change header", async () => {
    render(<PostList userData={userData} />);
    expect(screen.getAllByText(2)).toHaveLength(2);
    fireEvent.click(screen.getByText(/TAGGED/i));
    expect(screen.getByText("No Photos")).toBeInTheDocument();
  });
  
  it("snapshot testing for PostList component", () => {
    const tree = render(<PostList userData={userData} />);
    expect(tree).toMatchSnapshot();
  });
});
