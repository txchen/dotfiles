function fish_title
    set -l host (prompt_hostname)
    set -l dir (prompt_pwd)

    if set -q SSH_TTY
        echo "ssh:$host $dir"
    else
        echo "$host $dir"
    end
end
