#!/usr/bin/env expect -f
set timeout -1
spawn certutil -d $HOME/.pki/nssdb -N
expect "Enter new password:"
send "\r"
