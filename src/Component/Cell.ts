import Model from '../Models/Cell'

class Cell {
    constructor(private readonly cell: Model) {}

    public toString(): string
    {
        const className = `cell${this.cell.getColorGuess() !== undefined ? ` color-${this.cell.getColorGuess()}` : ''}`

        return `
            <div
                class="${className}"
                data-x="${this.cell.coordinate.x}"
                data-y="${this.cell.coordinate.y}"
            >
                ${this.cell.getNumberGuess() ?? ''}
                <div class="candidates">${this.renderCandidates()}</div>
            </div>
        `
    }

    private renderCandidates(): string
    {
        return `
            <ul>${this.cell.getColorCandidates().map(color => `<li class="color-${color} color-candidate">&nbsp;</li>`).join('')}</ul>
            <ul>${this.cell.getNumberCandidates().map(number => `<li>${number}</li>`).join('')}</ul>
        `
    }
}

export default Cell