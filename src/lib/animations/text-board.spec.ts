import { describe, expect, it } from "vitest";
import {
  BOARD_COLS,
  BOARD_ROWS,
  buildBoard,
  COLOR_MAP,
  parseRow,
  wrapText,
} from "./text-board";

describe("wrapText", () => {
  it("wraps words at the column limit", () => {
    expect(wrapText("THE QUICK BROWN FOX", 9)).toEqual([
      "THE QUICK",
      "BROWN FOX",
    ]);
  });

  it("truncates words longer than the column limit", () => {
    expect(wrapText("ABCDEFGHIJ XY", 4)).toEqual(["ABCD", "XY"]);
  });

  it("keeps blank lines between paragraphs", () => {
    expect(wrapText("A\n\nB", 10)).toEqual(["A", "", "B"]);
  });
});

describe("parseRow", () => {
  it("turns known color codes into color cells", () => {
    expect(parseRow("A{G}")).toEqual([
      { type: "char", value: "A" },
      { type: "color", hex: COLOR_MAP["{G}"] },
    ]);
  });

  it("leaves unknown codes as characters", () => {
    expect(parseRow("{X}").map((cell) => cell.type)).toEqual([
      "char",
      "char",
      "char",
    ]);
  });
});

describe("buildBoard", () => {
  it("always returns a full grid", () => {
    const board = buildBoard();
    expect(board).toHaveLength(BOARD_ROWS);
    for (const row of board) expect(row).toHaveLength(BOARD_COLS);
  });

  it("centres text horizontally and vertically", () => {
    const board = buildBoard("HI");
    const row = Math.floor((BOARD_ROWS - 1) / 2);
    const col = Math.floor((BOARD_COLS - 2) / 2);
    expect(board[row][col]).toEqual({ type: "char", value: "H" });
    expect(board[row][col + 1]).toEqual({ type: "char", value: "I" });
  });

  it("places explicit rows from the top-left", () => {
    const board = buildBoard(undefined, ["AB"]);
    expect(board[0][0]).toEqual({ type: "char", value: "A" });
    expect(board[0][1]).toEqual({ type: "char", value: "B" });
  });
});
