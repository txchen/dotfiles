-- User keymaps loaded by LazyVim.
-- Keep these minimal and focused on personal workflow.

-- Double-tap Ctrl+S: save + quit current window.
-- Single Ctrl+S remains LazyVim default save.
vim.keymap.set({ "n", "i", "v" }, "<C-s><C-s>", "<Esc><Cmd>wq<CR>", {
  desc = "Save and quit",
  silent = true,
})

-- Double-tap Ctrl+Q: quit current window.
vim.keymap.set({ "n", "i", "v" }, "<C-q><C-q>", "<Esc><Cmd>q<CR>", {
  desc = "Quit",
  silent = true,
})
