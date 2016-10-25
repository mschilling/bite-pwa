#!/usr/bin/expect -f
spawn certutil -d $env(HOME)/.pki/nssdb -N
expect "Enter new password:"
send "\r"
expect "Re-enter password:"
send "\r"
expect eof