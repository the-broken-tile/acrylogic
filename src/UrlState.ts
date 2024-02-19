
class UrlState {
    constructor(private readonly onHashChange: Function)
    {
        window.addEventListener('popstate', this.handlePopState.bind(this))
    }

    setLevel(level: string)
    {
        history.pushState({}, '', `#${level}`)
    }

    private handlePopState(): void
    {
        const hash = window.location.hash
        const matches = hash.match(/#((o3|o4|tbt)-\d+)/) as RegExpMatchArray | null
        if (matches === null) {
            return
        }

        const id = matches[1]
        this.onHashChange(id)
    }
}

export default UrlState