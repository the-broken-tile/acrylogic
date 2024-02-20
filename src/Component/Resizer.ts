
class Resizer {
    constructor(private readonly window: Window, private root: HTMLElement) {
        this.registerListeners()
        this.onResize()
    }

    onResize(): void
    {
        const { innerWidth, innerHeight } = this.window
        const min = Math.min(innerWidth, innerHeight)
        this.root.style.height = `${min}px`
        this.root.style.width = `${min}px`
    }

    private registerListeners(): void
    {
        this.window.addEventListener('resize', this.onResize.bind(this))
    }

}

export default Resizer