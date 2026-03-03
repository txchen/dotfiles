# Set PATH, MANPATH, etc., for Homebrew (Apple Silicon and Intel macOS)
set -l brew_prefix
if test -x /opt/homebrew/bin/brew
    set brew_prefix /opt/homebrew
else if test -x /usr/local/bin/brew
    set brew_prefix /usr/local
end

if test -n "$brew_prefix"
    set -gx HOMEBREW_PREFIX $brew_prefix
    set -gx HOMEBREW_CELLAR $brew_prefix/Cellar
    set -gx HOMEBREW_REPOSITORY $brew_prefix

    fish_add_path --path $brew_prefix/bin $brew_prefix/sbin

    if test -d $brew_prefix/share/man
        set -q MANPATH; or set MANPATH ''
        contains -- $brew_prefix/share/man $MANPATH; or set -gx MANPATH $brew_prefix/share/man $MANPATH
    end

    if test -d $brew_prefix/share/info
        set -q INFOPATH; or set INFOPATH ''
        contains -- $brew_prefix/share/info $INFOPATH; or set -gx INFOPATH $brew_prefix/share/info $INFOPATH
    end
end

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

# if zoxide is installed
if type -q zoxide
    zoxide init fish | source

    # Alt+c: open zoxide interactive directory jump
    bind \ec __tx_zi_jump
    bind -M insert \ec __tx_zi_jump
end
