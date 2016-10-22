#!/usr/bin/expect -f
spawn certutil -d $HOME/.pki/nssdb -N
expect "Enter new password:"
send "\r"
