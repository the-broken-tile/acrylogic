import request from './request';
import Store from './Store';

const groupOrder: Array<string> = [
    'o3',
    'o4',
    'o5',
    'tbt',
]

class LevelManager {
    constructor(private readonly store: Store)
    {
    }

    public setLevel(level: string): void
    {
        this.store.setId(level)
    }

    public current(): string
    {
        return this.store.getId() ?? 'o3-1'
    }

    public async next(level: string): Promise<string | null>
    {
        const groupMatch = level.match(/^(o3|o4|o5|tbt)/)
        if (groupMatch === null) {
            throw new Error(`Invalid level: ${level}`)
        }

        const group = groupMatch[1] as string
        const nextLevel = level.replace(/(\d+)$/, (match: string, p1: string): string => {
            return `${parseInt(p1, 10) + 1}`
        })

        let validLevel = true
        await request(`./api/game/${nextLevel}.json`).catch(() => {
            validLevel = false
        })
        if (validLevel) {
            return nextLevel
        }

        const nextGroupIndex = groupOrder.indexOf(group) + 1
        if (nextGroupIndex === groupOrder.length) {
            return null
        }

        return `${groupOrder[nextGroupIndex]}-1`
    }
}

export default LevelManager;