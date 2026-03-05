function fish_title
    set -l host (prompt_hostname)
    set -l dir (prompt_pwd)

    if set -q SSH_TTY
        echo "[$host] $dir"
    else
        echo "$dir"
    end
end
