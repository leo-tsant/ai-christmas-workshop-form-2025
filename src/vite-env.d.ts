/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL: string
  readonly VITE_ALLOWED_EMAILS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
