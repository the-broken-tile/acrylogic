import Model from '../Models/Cell'

class Cell {
    constructor(private readonly cell: Model) {}

    public toString = (): string => `
        <div
            class="${this.getClassName()}"
            data-x="${this.cell.coordinate.x}"
            data-y="${this.cell.coordinate.y}"
        >
            <span class="cell-content">${this.cell.getNumberGuess() ?? ''}</span>
            <div class="candidates">${this.renderCandidates()}</div>
        </div>
    `;

    private renderCandidates(): string
    {
        return `
            <ul>${this.cell.getColorCandidates().map(color => `<li class="color color-${color} color-candidate">&nbsp;</li>`).join('')}</ul>
            <ul>${this.cell.getNumberCandidates().map(number => `<li>${number}</li>`).join('')}</ul>
        `
    }

    private getClassName(): string
    {
        let classNames: Array<string> = ['cell']
        const colorGuess = this.cell.getColorGuess()

        if (colorGuess !== undefined) {
            classNames.push('color')
            classNames.push(`color-${colorGuess}`)
        }

        return classNames.join(' ')
    }
}

export default Cell