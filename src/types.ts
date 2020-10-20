type Key = Extract<
  "up" | "right" | "down" | "left",
  keyof Phaser.Types.Input.Keyboard.CursorKeys
>;

export type CursorKey = Record<Key, Phaser.Input.Keyboard.Key>;
