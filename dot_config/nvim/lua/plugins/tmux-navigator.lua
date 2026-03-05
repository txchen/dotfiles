return {
  {
    "christoomey/vim-tmux-navigator",
    cmd = {
      "TmuxNavigateLeft",
      "TmuxNavigateDown",
      "TmuxNavigateUp",
      "TmuxNavigateRight",
      "TmuxNavigatePrevious",
    },
    keys = {
      {
        "<C-j>",
        function()
          local total = vim.fn.winnr("$")
          local current = vim.fn.winnr()
          if total > 1 then
            -- Inside Neovim: cycle to next split.
            -- If we wrap past the last split, also hop to next tmux pane.
            vim.cmd("wincmd w")
            if current == total and vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.+" })
            end
          else
            if vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.+" })
            end
          end
        end,
        desc = "Next split/pane (cyclic)",
      },
      {
        "<C-k>",
        function()
          local total = vim.fn.winnr("$")
          local current = vim.fn.winnr()
          if total > 1 then
            -- Inside Neovim: cycle to previous split.
            -- If we wrap before the first split, also hop to previous tmux pane.
            vim.cmd("wincmd W")
            if current == 1 and vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.-" })
            end
          else
            if vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.-" })
            end
          end
        end,
        desc = "Previous split/pane (cyclic)",
      },
      {
        "<A-j>",
        function()
          local total = vim.fn.winnr("$")
          local current = vim.fn.winnr()
          if total > 1 then
            vim.cmd("wincmd w")
            if current == total and vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.+" })
            end
          else
            if vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.+" })
            end
          end
        end,
        desc = "Next split/pane (Alt+j)",
      },
      {
        "<A-k>",
        function()
          local total = vim.fn.winnr("$")
          local current = vim.fn.winnr()
          if total > 1 then
            vim.cmd("wincmd W")
            if current == 1 and vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.-" })
            end
          else
            if vim.env.TMUX and vim.env.TMUX ~= "" then
              vim.fn.system({ "tmux", "select-pane", "-t", ":.-" })
            end
          end
        end,
        desc = "Previous split/pane (Alt+k)",
      },
    },
    init = function()
      vim.g.tmux_navigator_no_mappings = 1
    end,
  },
}
