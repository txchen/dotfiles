# Set PATH, MANPATH, etc., for Homebrew
set -gx HOMEBREW_PREFIX /opt/homebrew
set -gx HOMEBREW_CELLAR /opt/homebrew/Cellar
set -gx HOMEBREW_REPOSITORY /opt/homebrew
set -gx PATH /opt/homebrew/bin /opt/homebrew/sbin $PATH
set -q MANPATH; or set MANPATH ''
set -gx MANPATH /opt/homebrew/share/man $MANPATH
set -q INFOPATH; or set INFOPATH ''
set -gx INFOPATH /opt/homebrew/share/info $INFOPATH

###################################
# Interactive mode configurations #
###################################
status is-interactive || exit

# suppress the default login message
set -g fish_greeting

alias l='ls -al'
alias gt='git tree'
alias gst='git status'
alias gd='git diff'
alias http='xh'

set -x EDITOR vim

# if zoxide is installed
if type -q zoxide
    zoxide init fish | source
end
