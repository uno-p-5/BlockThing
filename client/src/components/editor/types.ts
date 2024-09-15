export type ViewMode = "split" | "block" | "text";

export type EditorConfiguration = {
  container: HTMLElement;
  blocklyMediaPath?: string;
  readOnly?: boolean;
  height?: string;
  viewMode: ViewMode;
  skipSkulpt?: boolean;
  blockDelay?: number | null;
};

export interface Editor {
  /**
   * Updates the current code in both the blocks and the text.
   * @param code - The code to set.
   */
  setCode(code: string): void;

  /**
   * Gets the current code from the model, which is kept consistent
   * between the blocks and the text.
   * @returns The current code as a string.
   */
  getCode(): string;

  /**
   * Attach a function to be called when the code changes.
   * @param listener - A function to call when the code changes.
   */
  addChangeListener(listener: (event: any) => void): void;

  /**
   * Sets the current view of the environment.
   * @param mode - One of 'split', 'block', 'text'.
   */
  setMode(mode: "split" | "block" | "text"): void;

  /**
   * Gets the current view of the environment.
   * @returns The current mode as a string.
   */
  getMode(): "split" | "block" | "text";
}
