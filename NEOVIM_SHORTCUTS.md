# Neovim Shortcuts (LazyVim)

This reference matches the Neovim config tracked in this repo (`dot_config/nvim`) with minimal overrides.

- Leader key: `Space`
- Default picker/explorer in this setup: `Snacks` (`snacks_picker` + `snacks_explorer` extras)

## 1) Discover Keymaps Quickly

- `<leader>?`: show buffer-local keymaps (which-key)
- `<leader>sk`: search all keymaps in picker
- `<leader>l`: open Lazy plugin manager
- `<leader>cm`: open Mason (LSP/tool installer)
- `<leader>cl`: LSP info

## 2) Files, Buffers, Search

- `<leader><space>`: find files (project root)
- `<leader>ff` / `<leader>fF`: find files (root / cwd)
- `<leader>fr`: recent files
- `<leader>fc`: open Neovim config files
- `<leader>fp`: project picker
- `<leader>,`: buffer list
- `<S-h>` / `<S-l>`: previous / next buffer (fast buffer switch)
- `<leader>bd`: delete current buffer
- `<leader>bo`: delete other buffers
- `<leader>/` or `<leader>sg`: grep in project
- `<leader>sw`: grep current word / visual selection
- `<leader>fe` or `<leader>e`: file explorer (project root)
- `<leader>fE` or `<leader>E`: file explorer (cwd)

## 3) Windows and Editing

- `<C-h> <C-j> <C-k> <C-l>`: move between windows
- `<leader>-` / `<leader>|`: split below / split right
- `<leader>wd`: close current window
- `<leader>wm`: toggle zoom for current window
- `<C-j>` / `<C-k>`: next/previous split in Neovim; if only one split, jump to next/previous tmux pane
- `<C-s>`: save file (normal/insert/visual)
- `<C-s>` then `<C-s>` quickly (within mapping timeout): save and quit (`:wq`)
- `<C-q>` then `<C-q>` quickly (within mapping timeout): quit (`:q`)
- `<esc>`: clear search highlight
- `yy` / `dd` / `p`: use Neovim internal registers (do not sync to system clipboard)
- `<leader>y` (normal/visual): yank selection to system clipboard
- `<leader>Y` (normal): yank current line to system clipboard
- `"+p`: paste from system clipboard explicitly
- `<C-v>` in insert mode: paste from system clipboard via terminal keybind

## 4) LSP (Code Intelligence)

- `gd`: goto definition
- `gr`: references
- `gI`: goto implementation
- `gy`: goto type definition
- `gD`: goto declaration
- `K` / `gK`: hover / signature help
- `<leader>ca`: code action
- `<leader>cr`: rename symbol
- `<leader>cf`: format file or selection
- `<leader>ss` / `<leader>sS`: document/workspace symbols

## 5) Diagnostics and Lists

- `<leader>cd`: line diagnostics (float)
- `]d` / `[d`: next / previous diagnostic
- `]e` / `[e`: next / previous error
- `]w` / `[w`: next / previous warning
- `<leader>xx`: open diagnostics list (Trouble)
- `<leader>xq` / `<leader>xl`: toggle quickfix / location list
- `]q` / `[q`: next / previous quickfix/trouble item

## 6) Git

- `<leader>gg` / `<leader>gG`: lazygit (root / cwd)
- `<leader>gl`: git log (repo)
- `<leader>gL`: git log (cwd)
- `<leader>gb`: blame current line
- `<leader>gf`: current file history
- `]h` / `[h`: next / previous git hunk
- `<leader>ghs` / `<leader>ghr`: stage / reset hunk
- `<leader>ghp`: preview hunk

## 7) Terminal and Session

- `<leader>ft` / `<leader>fT`: terminal (root / cwd)
- `<C-/>`: toggle floating terminal
- `<leader>qs`: restore session
- `<leader>ql`: restore last session
- `<leader>qq`: quit all

## 8) Useful Toggles (`<leader>u`)

- `<leader>uf`: toggle auto format
- `<leader>us`: toggle spell
- `<leader>uw`: toggle wrap
- `<leader>ud`: toggle diagnostics
- `<leader>uh`: toggle inlay hints (when available)
- `<leader>ub`: toggle light/dark background

## Notes

- For anything not listed here, use `<leader>?` and `<leader>sk` first.
- This file is intentionally focused on commonly used keys, not every mapping.
