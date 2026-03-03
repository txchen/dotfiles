# Chezmoi Quick Reference

Source: <https://www.chezmoi.io/user-guide/command-overview/>  
Reviewed: 2026-03-03

## Getting Started

- `chezmoi doctor`: check for common setup problems.
- `chezmoi init`: create chezmoi source directory and initialize git on a new machine.

## Daily Commands

- `chezmoi add <file>`: add a file from `$HOME` into chezmoi source state.
- `chezmoi edit <file>`: edit the source file corresponding to a target file.
- `chezmoi status`: show what would change if you apply.
- `chezmoi diff`: show full diff of pending changes in your home directory.
- `chezmoi apply`: apply source state to your home directory.
- `chezmoi edit --apply <file>`: edit and immediately apply that file.
- `chezmoi cd`: open a shell in the chezmoi source directory.

## Multi-Machine Workflow

- `chezmoi init <github-username>`: clone dotfiles from GitHub into source dir.
- `chezmoi init --apply <github-username>`: clone and immediately apply.
- `chezmoi update`: pull latest remote changes and apply.
- Use normal git for sharing changes: `git add`, `git commit`, `git push`.

## Templates

- `chezmoi data`: print available template data.
- `chezmoi add --template <file>`: add file as a template.
- `chezmoi chattr +template <file>`: convert existing file to template mode.
- `chezmoi cat <file>`: render target contents without writing to disk.
- `chezmoi execute-template`: test/debug template rendering.

## Practical Habit

- Before applying broad changes, run `chezmoi status`, then `chezmoi diff`, then `chezmoi apply`.
