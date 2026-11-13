import { detectInitialLocale, type Locale } from '@/lib/i18n-context'
import { en, zhCN, ru } from '@/lib/locales'

export function formatCodexStartupError(message: string, locale: Locale = detectInitialLocale()): string {
    const translations = { en, 'zh-CN': zhCN, ru }[locale]
    if (/thread\s+\S+\s+already has an active writer/i.test(message)) {
        return translations['session.codex.activeWriter']
    }
    if (message.includes('Codex resume startup is still unconfirmed')) {
        return translations['session.codex.resumeUnconfirmed']
    }
    return message
}
