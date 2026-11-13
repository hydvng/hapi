import { describe, expect, it } from 'vitest'
import { parseCodexHeartbeat } from './codex-heartbeat'

const notification = '<heartbeat> <automation_id>60gib-23</automation_id> <decision>NOTIFY</decision> <message>第5份校验通过。\n第6份回读超时，已停止。</message> </heartbeat>'

describe('parseCodexHeartbeat', () => {
    it('extracts notification fields without modifying its body', () => {
        expect(parseCodexHeartbeat(notification)).toEqual({
            automationId: '60gib-23', decision: 'NOTIFY', message: '第5份校验通过。\n第6份回读超时，已停止。',
        })
    })

    it.each([
        `为什么显示 ${notification}`,
        `\`\`\`xml\n${notification}\n\`\`\``,
        notification.slice(0, -12),
        notification + notification,
        notification.replace('60gib-23', ''),
        notification.replace('<decision>NOTIFY</decision>', '<other>NOTIFY</other>'),
    ])('leaves examples, incomplete and unrecognized messages untouched', (text) => {
        expect(parseCodexHeartbeat(text)).toBeNull()
    })
})
