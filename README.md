# Dotfiles (chezmoi)

## Index

- [Installation](#installation)
- [Chezmoi Workflow](#chezmoi-workflow)
- [Shortcut Summary](#shortcut-summary)
- [Tmux Shortcuts](#tmux-shortcuts)
- [Vim Shortcuts](#vim-shortcuts)
- [Karabiner Shortcuts (macOS)](#karabiner-shortcuts-macos)
- [Ghostty Shortcuts](#ghostty-shortcuts)
- [Fish Shortcuts and Abbreviations](#fish-shortcuts-and-abbreviations)
- [Karabiner Workflow (macOS)](#karabiner-workflow-macos)
- [Repo Layout](#repo-layout)

## Installation

### macOS

- Install: `brew install chezmoi fish`
- Initialize and apply: `chezmoi init --apply txchen`
- Add fish shell path to `/etc/shells`: `/opt/homebrew/bin/fish` (Apple Silicon) or `/usr/local/bin/fish` (Intel)
- Set default shell: `chsh -s $(which fish)`

### Arch Linux

- Install: `sudo pacman -S chezmoi fish`
- Initialize and apply: `chezmoi init --apply txchen`
- Set default shell: `chsh -s /usr/bin/fish`

### Fedora

- Install: `sudo dnf install chezmoi fish`
- Initialize and apply: `chezmoi init --apply txchen`
- Set default shell: `chsh -s /usr/bin/fish`

## Chezmoi Workflow

- Enter source directory: `chezmoi cd`
- Track a new file: `chezmoi add <path>`
- Edit an existing file: `chezmoi edit <path>`
- Preview changes: `chezmoi diff`
- Apply changes to `$HOME`: `chezmoi apply`
- Check status: `chezmoi status`
- Pull latest and apply: `chezmoi update`
- Verify setup: `chezmoi doctor`
- Add a new dotfile flow: `chezmoi add ~/.vimrc` -> `chezmoi diff` -> `chezmoi apply`
- Update existing config flow: `chezmoi edit ~/.config/fish/config.fish` -> `chezmoi diff` -> `chezmoi apply`

## Shortcut Summary

- tmux: Alt-based pane/window navigation, path-preserving splits, fast copy-mode actions.
- Vim: Ctrl+S save flow, F2/F3 toggles, fast split/buffer movement, FZF and ripgrep mappings.
- Karabiner (macOS): Hyper layer on Caps Lock, browser navigation keys, PC-to-mac shortcut remaps.
- Ghostty: global quick terminal toggle and Shift+Enter newline.
- fish: fzf/zoxide shortcuts plus practical git/navigation abbreviations.

## Tmux Shortcuts

- Prefix key: `Ctrl+b`
- Switch pane: `Alt+j` / `Alt+k`
- Switch window: `Alt+h` / `Alt+l`
- Zoom current pane: `Alt+z`
- Rotate panes: `Alt+o`
- Split pane horizontally: `Ctrl+b %` or `Ctrl+b |` (inherits current pane path)
- Split pane vertically: `Ctrl+b "` or `Ctrl+b -` (inherits current pane path)
- Enter copy mode: `Ctrl+b Ctrl+k`
- Paste tmux buffer: `Ctrl+b Ctrl+p`
- Copy mode (vi): `v` start selection, `y` copy and exit, `Ctrl+a` line start, `Ctrl+e` line end
- Status bar markers: active window shows `▶`, windows with activity show `!`

## Vim Shortcuts

- Leader key: `Space`
- Toggle paste mode: `F2`
- Toggle wrap: `F3`
- Save file: `Ctrl+s` (normal/insert/visual)
- Save and quit: `Ctrl+s Ctrl+s`
- Quit without saving: `Ctrl+q Ctrl+q`
- Select all: `Ctrl+a` or `<Leader>sa`
- Move across splits: `Ctrl+j` / `Ctrl+k`
- Next/previous buffer: `Ctrl+l` / `Ctrl+h`
- Open FZF: `Ctrl+p`
- Ripgrep current word: `grg` or `?`
- Enter visual block mode: `<Leader>vb`
- Easymotion jump down/up: `Alt+n` / `Alt+p`
- Easymotion word jump: `Alt+f`
- Toggle comment: `Ctrl+/` (`Ctrl+_` in Vim notation)
- Visual mode line move: `J` / `K`
- Visual mode keep selection while indenting: `<` / `>`

## Karabiner Shortcuts (macOS)

- Caps Lock: hold as Hyper (`Shift+Cmd+Ctrl+Option`), tap as `F19`
- Hyper navigation: `Hyper+h/j/k/l` arrows, `Hyper+a/e` home/end, `Hyper+u/d` page up/down
- Hyper edits: `Hyper+Backspace` delete forward, `Hyper+Tab` to Caps Lock
- Browser navigation: `F5` refresh, `Option+h` back, `Option+l` forward
- Tab operations: `Ctrl+Alt+h/l` previous/next tab, `Ctrl+Alt+t` new tab, `Ctrl+Alt+w` close tab
- Plain paste: `Ctrl+Alt+Shift+v`
- Delete previous word: `Ctrl+Backspace`
- Quit guard: disable `Cmd+q`, use `Option+F4` to send `Cmd+q`
- Modifier tweaks: left `Cmd`/`Option` swapped on Apple keyboards, right `Cmd` -> `Esc`, right `Option` -> `F17`, right `Shift` tap -> `F18`
- PC-style remaps: `Ctrl+a/b/c/f/g/i/s/t/u/v/x/y/z` and `Ctrl+F3`, `F3` to mac equivalents
- PC-style remaps are disabled in selected apps: Microsoft Remote Desktop, VSCode, Ghostty, Zed, cmuxterm, Moonlight

## Ghostty Shortcuts

- Toggle quick terminal (global): `Cmd+grave` (Cmd+`)
- Insert newline without submitting: `Shift+Enter`

## Fish Shortcuts and Abbreviations

- History search (fzf): `Ctrl+r`
- File/folder search in current directory (fzf): `Ctrl+Alt+f`
- Process search (fzf): `Ctrl+Alt+p`
- Interactive directory jump (zoxide): `Alt+c`
- Directory jump commands: `z <query>` and `zi`

- `l` -> `ls -al`
- `gt` -> `git tree`
- `gst` -> `git status`
- `gd` -> `git diff`
- `http` -> `xh`

## Karabiner Workflow (macOS)

- Source of truth: `~/.config/karabiner/konfig.source.mjs`
- Generated output: `~/.config/karabiner/karabiner.json` (not tracked in this repo)
- Auto-generation: `chezmoi apply` runs `run_after_darwin-generate-karabiner.sh.tmpl`
- Manual regenerate: `cd ~/.config/karabiner && node konfig.source.mjs`
- Sync source updates back into chezmoi source: `chezmoi add ~/.config/karabiner/konfig.source.mjs`
- Linux behavior: Karabiner files are ignored via `.chezmoiignore`

## Repo Layout

- `dot_config/fish/`: fish shell configuration and plugins
- `dot_config/ghostty/`: Ghostty terminal configuration
- `dot_config/karabiner/`: Karabiner source configuration (macOS only)
- `dot_tmux.conf`: tmux configuration
- `dot_vimrc`: Vim configuration
- Template-backed dotfiles live alongside destination paths, for example `dot_gitconfig.tmpl`
