import { render, screen } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";
import { EditableSongList } from "../src/components/EditableSongList";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("Movie can be marked as watch/unwatched", () => {
        render(<App />);

        const initialWatchedButtons = screen.getAllByRole("button", {
            name: /mark as watched/i,
        });
        expect(initialWatchedButtons).toHaveLength(6);

        expect(
            screen.queryAllByRole("button", { name: /mark as unwatched/i }),
        ).toHaveLength(0);

        userEvent.click(initialWatchedButtons[0]);

        const markAsUnwatchedButton = screen.getByRole("button", {
            name: /mark as unwatched/i,
        });
        expect(markAsUnwatchedButton).toBeInTheDocument();

        userEvent.click(markAsUnwatchedButton);

        expect(
            screen.queryAllByRole("button", { name: /mark as unwatched/i }),
        ).toHaveLength(0);
    });

    test("should update list with a new empty song when Add Song is clicked", async () => {
        const initialSongs = ["Song A", "Song B"];
        const mockSetSongs = jest.fn();

        render(
            <EditableSongList songs={initialSongs} setSongs={mockSetSongs} />,
        );

        const addSongButton = screen.getByRole("button", { name: /Add Song/i });

        userEvent.click(addSongButton);

        expect(mockSetSongs).toHaveBeenCalledWith(["Song A", "Song B", ""]);
    });
});
