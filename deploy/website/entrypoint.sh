#!/usr/bin/env bash

set -e
set -o pipefail

# Script configuration

APP_KEY_FILE="/app/tmp/.app_key"

# Internal printing functions

_INDENT_STACK=""
_INDENT_CURRENT=""
_LOG_FILE="$(mktemp)"

print() {
    echo "$_INDENT_CURRENT$@"
}

print_file() {
    file="$1"
    content="$(cat "$file" | sed -E "s/^/$_INDENT_CURRENT/gm")"
    echo "$content"
}

run_command() {
    command="$@"

    echo
    print "# $command"

    trap "print_file $_LOG_FILE" EXIT

    # Strip any ANSI escape sequences from the output
    eval "$command" 2>&1 | sed "s/\x1B\[[0-9;]*[a-zA-Z]//g" > "$_LOG_FILE"

    trap - EXIT

    print_file "$_LOG_FILE"
    echo
}

update_current_indent() {
    _INDENT_CURRENT="$(echo "$_INDENT_STACK" | sed 's/,//g')"
}

push_indent() {
    _INDENT_STACK="$_INDENT_STACK,$1"
    update_current_indent

    echo
}

pop_indent() {
    _INDENT_STACK="${_INDENT_STACK%,*}"
    update_current_indent
}

# Main script

generate_app_key() {
    node ace generate:key --show | sed -E "s/APP_KEY = (.*)/\1/"
}

## Environment variables

print ">> Environment variables"
push_indent "   "

if [ -z "$INERTIA_PUBLIC_APP_URL" ]; then
    print ">> INERTIA_PUBLIC_APP_URL is not set"
    push_indent "   "

    if [ -n "$COOLIFY_URL" ]; then
        print "Falling back to COOLIFY_URL..."
        export INERTIA_PUBLIC_APP_URL="$COOLIFY_URL"

        print "! INERTIA_PUBLIC_APP_URL = $INERTIA_PUBLIC_APP_URL"
        print
    fi

    pop_indent
fi

if [ -z "$APP_KEY" ]; then
    print ">> APP_KEY is not set"
    push_indent "   "

    if [ "$ON_STARTUP_ENSURE_APP_KEY" = "true" ]; then
        if [ -e "$APP_KEY_FILE" ]; then
            print "Found $APP_KEY_FILE..."

            if [ -s "$APP_KEY_FILE" ]; then
                print "Loading APP_KEY from $APP_KEY_FILE..."
                export APP_KEY="$(cat $APP_KEY_FILE)"
            else
                print "$APP_KEY_FILE is empty, possibly corrupted..."
            fi

            print
        fi

        if [ -z "$APP_KEY" ]; then
            print "Generating a new APP_KEY..."
            export APP_KEY="$(generate_app_key)"

            print "Saving APP_KEY to $APP_KEY_FILE..."
            echo -n "$APP_KEY" > "$APP_KEY_FILE"

            print
        fi

        print "! APP_KEY = $APP_KEY"
        print
    fi

    pop_indent
fi

pop_indent

## Application preparation

print ">> Application preparation"
push_indent "   "

if [ "$ON_STARTUP_MIGRATE" = "true" ]; then
    mode="${ON_STARTUP_MIGRATE_MODE:-run}"

    print ">> ON_STARTUP_MIGRATE is enabled [mode: $mode]"
    push_indent "   "

    print "Migrating database..."
    run_command node ace migration:$mode --force

    pop_indent
fi

pop_indent

## Sanity check

print ">> Sanity check"
push_indent "   "

print "Ensuring environment variables are valid..."
run_command node ace list:routes

pop_indent

## Starting application

print ">> Starting application"
print

eval "$@"
