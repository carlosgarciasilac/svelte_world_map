export const FLAP_CHARS =
  " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";

export const BOARD_ROWS = 6;
export const BOARD_COLS = 22;

export const BASE_COL_DELAY = 30;
export const BASE_ROW_DELAY = 20;
export const BASE_STEP_MS = 55;
export const BASE_FLIP_S = 0.35;
export const BASE_TOTAL_S = ((BOARD_COLS - 1) * BASE_COL_DELAY +
  (BOARD_ROWS - 1) * BASE_ROW_DELAY +
  8 * BASE_STEP_MS) /
  1000;

export type AccentColor = {
  top: string;
  bottom: string;
  text: string;
};

export const ACCENT_COLORS: AccentColor[] = [
  { top: "#dc2626", bottom: "#b91c1c", text: "#ffffff" },
  { top: "#f97316", bottom: "#ea580c", text: "#ffffff" },
  { top: "#facc15", bottom: "#eab308", text: "#171717" },
  { top: "#16a34a", bottom: "#15803d", text: "#ffffff" },
  { top: "#2563eb", bottom: "#1d4ed8", text: "#ffffff" },
  { top: "#7c3aed", bottom: "#6d28d9", text: "#ffffff" },
  { top: "#ffffff", bottom: "#f5f5f5", text: "#171717" },
];

export const COLOR_MAP: Record<string, string> = {
  "{R}": "#D32F2F",
  "{O}": "#F57C00",
  "{Y}": "#FBC02D",
  "{G}": "#43A047",
  "{B}": "#1E88E5",
  "{V}": "#8E24AA",
  "{W}": "#FAFAFA",
};

export type ParsedCell =
  | { type: "char"; value: string }
  | { type: "color"; hex: string };

export function normalizeChar(ch: string): string {
  const upper = ch.toUpperCase();
  return FLAP_CHARS.includes(upper) ? upper : " ";
}

export function randomFlapChar(): string {
  return FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];
}

export function randomAccent(): AccentColor | null {
  return Math.random() < 0.2
    ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
    : null;
}

export function parseRow(row: string): ParsedCell[] {
  const cells: ParsedCell[] = [];
  let i = 0;
  while (i < row.length) {
    if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
      const code = row.substring(i, i + 3);
      if (COLOR_MAP[code]) {
        cells.push({ type: "color", hex: COLOR_MAP[code] });
        i += 3;
        continue;
      }
    }
    cells.push({ type: "char", value: row[i] });
    i++;
  }
  return cells;
}

export function wrapParagraph(paragraph: string, maxCols: number): string[] {
  const lines: string[] = [];
  const words = paragraph.split(/[ \t]+/).filter(Boolean);
  let currentLine = "";

  for (const word of words) {
    if (word.length > maxCols) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, maxCols));
      continue;
    }

    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxCols) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

export function wrapText(input: string, maxCols: number): string[] {
  return input
    .split("\n")
    .flatMap((paragraph) =>
      paragraph.trim() === "" ? [""] : wrapParagraph(paragraph, maxCols)
    );
}

export function buildBoard(text?: string, rows?: string[]): ParsedCell[][] {
  const grid: ParsedCell[][] = Array.from(
    { length: BOARD_ROWS },
    () =>
      Array.from(
        { length: BOARD_COLS },
        () => ({ type: "char" as const, value: " " }),
      ),
  );

  if (text) {
    const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
    const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
    lines.forEach((line, i) => {
      const row = startRow + i;
      if (row >= BOARD_ROWS) return;
      const parsed = parseRow(line);
      const startCol = Math.max(
        0,
        Math.floor((BOARD_COLS - parsed.length) / 2),
      );
      parsed.forEach((cell, c) => {
        if (startCol + c < BOARD_COLS) {
          grid[row][startCol + c] = cell;
        }
      });
    });
  } else if (rows) {
    rows.forEach((row, r) => {
      if (r >= BOARD_ROWS) return;
      const parsed = parseRow(row);
      parsed.forEach((cell, c) => {
        if (c < BOARD_COLS) {
          grid[r][c] = cell;
        }
      });
    });
  }

  return grid;
}
