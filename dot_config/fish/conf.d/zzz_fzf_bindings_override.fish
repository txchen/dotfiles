# Override fzf.fish key bindings after plugin init.
# Keep git/variables bindings disabled, but keep directory search shortcut.
if functions -q fzf_configure_bindings
    fzf_configure_bindings --git_log= --git_status= --variables=
end

# Enforce Ctrl+Alt+F for directory search even if plugin defaults change.
if functions -q _fzf_search_directory
    bind ctrl-alt-f _fzf_search_directory
    bind -M insert ctrl-alt-f _fzf_search_directory
end
