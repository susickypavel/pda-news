# PDA - News

# 1. Installation

## 1.1 Prerequisites

### 1.1.1 Application development

-   [**Expo account**](https://expo.dev/)
-   [**Expo GO**](https://expo.dev/client) installed on your iOS/Android device (SDK >48)
-   [**Node.js LTS Runtime**](https://nodejs.org/en/) installed on your development machine
-   [**Watchman**](https://formulae.brew.sh/formula/watchman) installed on your MacOS development machine

### 1.1.2 Back-end development

-   [**Python**](https://www.python.org/) installed on your development machine (>3.10)

## 1.2 Running the application for the first time

```sh
# If you're a Windows user, you need to allow connection from node.exe process in firewall.
# If you're a MacOS user, you need `watchman` installed on your machine.

# Install dependencies.
npm install

# Check whether you're logged in with your expo account on your machine.
npm run expo whoami

# Login if you're not.
npm run expo login

# ! Fill required env vars from .env.example into .env (See 1.3)

# Run development server.
npm run start

# Scan QR code in the terminal with your iOS/Android device.
```

## 1.3 Environment variables

| Name                  | Purpose                                                                      |
| --------------------- | ---------------------------------------------------------------------------- |
| SUPABASE_URL          | URL of [supabase](https://supabase.com) server                               |
| SUPABASE_PUBLIC_ANON  | Public key for [supabase](https://supabase.com) server                       |
| SUPABASE_SERVICE_ROLE | Private key with high privilages for [supabase](https://supabase.com) server |
| NEWSDATA_API_KEY      | API key for [newsdata](https://newsdata.io)                                  |

## 1.4 Code climate

-   Install all recommended extensions (if you're using VSCode), recommended extensions are in `.vscode/extensions.json`
