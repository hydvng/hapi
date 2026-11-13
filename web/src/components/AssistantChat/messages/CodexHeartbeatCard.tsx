import type { CodexHeartbeat } from '@/lib/codex-heartbeat'
import { useTranslation } from '@/lib/use-translation'

export function CodexHeartbeatCard({ notification, raw }: { notification: CodexHeartbeat; raw: string }) {
    const { t } = useTranslation()
    return (
        <section aria-label={t('message.heartbeat.title')} className="min-w-0 space-y-2" data-testid="codex-heartbeat">
            <div className="text-xs font-medium text-[var(--app-hint)]">{t('message.heartbeat.title')}</div>
            <div className="whitespace-pre-wrap break-words">{notification.message}</div>
            <details className="text-xs text-[var(--app-hint)]">
                <summary className="cursor-pointer">{t('message.heartbeat.details')}</summary>
                <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1">
                    <dt>{t('message.heartbeat.automation')}</dt><dd className="break-all">{notification.automationId}</dd>
                    <dt>{t('message.heartbeat.decision')}</dt><dd>{notification.decision}</dd>
                </dl>
                <p className="mt-2">{t('message.heartbeat.historical')}</p>
                <pre className="mt-2 whitespace-pre-wrap break-words font-mono">{raw}</pre>
            </details>
        </section>
    )
}
