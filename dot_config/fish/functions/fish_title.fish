function fish_title
    set -l host (prompt_hostname)

    if set -q SSH_TTY
        echo "[$host]"
    else
        echo "$host "(prompt_pwd)
    end
end
