import LevelManager from '../LevelManager';

class Menu {
    private readonly menuToggle: HTMLInputElement;
    private readonly levelSelect: HTMLInputElement;
    private readonly levelSelectForm: HTMLFormElement;
    private readonly nextLevelElement: HTMLButtonElement;

    constructor(
        private readonly element: HTMLMenuElement,
        private onLevelChange: Function,
        private readonly levelManager: LevelManager,
    ) {
        this.menuToggle = this.element.querySelector('#menu-toggle') as HTMLInputElement
        this.levelSelect = this.element.querySelector('#level-select') as HTMLInputElement
        this.levelSelectForm = this.element.querySelector('#level-select-form') as HTMLFormElement
        this.nextLevelElement = this.element.querySelector('#next-level') as HTMLButtonElement

        this.update()

        this.registerEventListeners()
    }

    public close(): void
    {
        this.menuToggle.checked = false
        this.levelSelect.value = this.levelManager.current()
    }

    private handleLevelChange(event: Event): void {
        event.preventDefault()

        this.onLevelChange(this.levelSelect.value)
    }

    private async handleNextLevel(): Promise<void>
    {
        const level = await this.levelManager.next(this.levelManager.current())
        if (level !== null) {
            this.onLevelChange(level)
        }
    }


    private registerEventListeners(): void {
        this.levelSelectForm.addEventListener('submit', this.handleLevelChange.bind(this))
        this.nextLevelElement.addEventListener('click', this.handleNextLevel.bind(this))
    }

    private update(): void {
        this.levelSelect.value = this.levelManager.current()
    }
}

export default Menu