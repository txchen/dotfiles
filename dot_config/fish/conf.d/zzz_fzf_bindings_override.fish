# Override fzf.fish key bindings after plugin init.
# Keep git/variables bindings disabled, but enable directory search shortcut.
if functions -q fzf_configure_bindings
    fzf_configure_bindings --git_log= --git_status= --variables=
end
