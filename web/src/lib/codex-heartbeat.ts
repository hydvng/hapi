export type CodexHeartbeat = {
    automationId: string
    decision: string
    message: string
}

// Only recognize a complete notification envelope. Quoted examples, code fences,
// malformed messages and other XML remain ordinary chat text.
const HEARTBEAT = /^\s*<heartbeat>\s*<automation_id>([^<>]+)<\/automation_id>\s*<decision>([A-Z_]+)<\/decision>\s*<message>([\s\S]*?)<\/message>\s*<\/heartbeat>\s*$/

export function parseCodexHeartbeat(text: string): CodexHeartbeat | null {
    const match = HEARTBEAT.exec(text)
    if (!match || !match[1].trim() || !match[3].trim()) return null
    // Do not silently consume concatenated/nested envelopes.
    if (/<\/?(?:heartbeat|automation_id|decision|message)\b/.test(match[3])) return null
    return {
        automationId: match[1].trim(),
        decision: match[2],
        message: match[3].trim(),
    }
}
