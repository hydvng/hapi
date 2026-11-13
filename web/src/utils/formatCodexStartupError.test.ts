import { describe, expect, it } from 'vitest'
import { formatCodexStartupError } from './formatCodexStartupError'

describe('formatCodexStartupError', () => {
    it('explains real writer contention, including a wrapped API error', () => {
        const message = 'HTTP 500: {"error":"Error: thread 01a07fc4-0c76-7561-9f0d-a3625827e924 already has an active writer"}'
        expect(formatCodexStartupError(message, 'zh-CN')).toContain('完全退出')
        expect(formatCodexStartupError(message, 'en')).toContain('fully quit')
    })
    it('does not claim an unconfirmed resume always means writer contention', () => {
        const message = formatCodexStartupError('Codex resume startup is still unconfirmed', 'zh-CN')
        expect(message).toContain('尚未确认')
        expect(message).toContain('如果提示聊天被占用')
    })
    it('preserves unrelated errors for diagnosis', () => {
        const message = 'HTTP 500: permission denied opening file'
        expect(formatCodexStartupError(message, 'zh-CN')).toBe(message)
    })
})
