
class UrlState {
    constructor(private readonly onHashChange: Function) {
        window.addEventListener('popstate', this.handlePopState.bind(this))
    }

    setLevel(level: number) {
        history.pushState({}, '', `#${level}`)
    }

    private handlePopState(): void
    {
        const hash = window.location.hash
        const matches = hash.match(/#(\d+)/) as RegExpMatchArray | null
        if (matches === null) {
            return
        }

        const id = parseInt(matches[1], 10)
        this.onHashChange(id)
    }
}

export default UrlState