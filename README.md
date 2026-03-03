## Installation

### macOS

- Install: `brew install chezmoi fish`
- Initialize and apply: `chezmoi init --apply txchen`
- Set default shell to fish:
  - Add `/opt/homebrew/bin/fish` (Apple Silicon) or `/usr/local/bin/fish` (Intel) to `/etc/shells`.
  - Run `chsh -s $(which fish)`.

### Arch Linux

- Install: `sudo pacman -S chezmoi fish`
- Initialize and apply: `chezmoi init --apply txchen`
- Set default shell: `chsh -s /usr/bin/fish`

### Fedora

- Install: `sudo dnf install chezmoi fish`
- Initialize and apply: `chezmoi init --apply txchen`
- Set default shell: `chsh -s /usr/bin/fish`

## Managing dotfiles with chezmoi

- Enter source directory: `chezmoi cd`
- Track a new file: `chezmoi add <path>`
- Edit an existing file: `chezmoi edit <path>`
- Preview changes: `chezmoi diff`
- Apply changes to `$HOME`: `chezmoi apply`
- Check status: `chezmoi status`
- Pull latest and apply: `chezmoi update`
- Verify setup: `chezmoi doctor`

### Typical workflows

- Add a new dotfile: `chezmoi add ~/.vimrc` → `chezmoi diff` → `chezmoi apply`
- Update an existing config: `chezmoi edit ~/.config/fish/config.fish` → `chezmoi diff` → `chezmoi apply`
- Sync remote changes: `chezmoi update` to fetch and apply updates.

## Other files

- `dot_config/fish/`: fish shell configuration and plugins.
- `dot_config/ghostty/`: Ghostty terminal configuration.
- `dot_config/karabiner/`: Karabiner-Elements key remapping (macOS only).
- Template-backed dotfiles live alongside their destination paths (e.g., `dot_gitconfig.tmpl`).

## Karabiner workflow (macOS only)

- Source of truth: `~/.config/karabiner/konfig.source.mjs`
- Generated output: `~/.config/karabiner/karabiner.json` (not tracked in this repo)
- Auto-generation: `chezmoi apply` runs `run_after_darwin-generate-karabiner.sh.tmpl` to regenerate `karabiner.json`.
- Manual regenerate:
  - `cd ~/.config/karabiner && node konfig.source.mjs`
- Sync source updates back into chezmoi source:
  - `chezmoi add ~/.config/karabiner/konfig.source.mjs`

On Linux, Karabiner files are ignored via `.chezmoiignore`.
