declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string
            NODE_ENV: 'development' | 'production'
            PORT?: string
            PWD: string
            DEBUG: 'true' | 'false'
            NOTIFY: 'true' | 'false'
            TELEGRAM_CHAT_ID: string
            TELEGRAM_TOKEN: string
            USERNAME: string
            PASSWORD: string
        }
    }
}

export {}