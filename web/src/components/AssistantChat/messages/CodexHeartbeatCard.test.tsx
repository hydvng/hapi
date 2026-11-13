import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { I18nProvider } from '@/lib/i18n-context'
import { UserBubbleContent } from './user-bubble'

describe('Codex heartbeat in a user message', () => {
    it('shows the body, keeps metadata collapsed and preserves literal markup safely', () => {
        localStorage.setItem('hapi-lang', 'zh-CN')
        const body = '第6份回读超时。<img src=x onerror="alert(1)">'
        const raw = `<heartbeat><automation_id>60gib-23</automation_id><decision>NOTIFY</decision><message>${body}</message></heartbeat>`
        const { container } = render(<I18nProvider><UserBubbleContent text={raw} /></I18nProvider>)
        expect(screen.getByText('自动化通知')).toBeVisible()
        expect(screen.getByText(body)).toBeVisible()
        const details = container.querySelector('details')!
        expect(details.open).toBe(false)
        expect(screen.getByText('60gib-23')).not.toBeVisible()
        expect(container.querySelector('img')).toBeNull()
        fireEvent.click(screen.getByText('详情与原始消息'))
        expect(details.open).toBe(true)
        expect(screen.getByText('60gib-23')).toBeVisible()
        expect(container.querySelector('pre')?.textContent).toBe(raw)
        localStorage.removeItem('hapi-lang')
    })
})
