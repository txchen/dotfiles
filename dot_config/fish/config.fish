###################################
# Interactive mode configurations #
###################################
status is-interactive; or return

# suppress the default login message
set -g fish_greeting

abbr --add l 'ls -al'
abbr --add gt 'git tree'
abbr --add gst 'git status'
abbr --add gd 'git diff'
alias http='xh'
alias nv='nvim'

set -gx EDITOR vim
set -gx VISUAL $EDITOR

# if mise is installed
if type -q mise
    mise activate fish | source
end

# if zoxide is installed
if type -q zoxide
    zoxide init fish | source

    # Alt+c: open zoxide interactive directory jump
    bind \ec __tx_zi_jump
    bind -M insert \ec __tx_zi_jump
end
