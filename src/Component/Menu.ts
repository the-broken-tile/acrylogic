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
        this.element.innerHTML = this.render()
        this.menuToggle = this.element.querySelector('#menu-toggle') as HTMLInputElement
        this.levelSelect = this.element.querySelector('#level-select') as HTMLInputElement
        this.levelSelectForm = this.element.querySelector('#level-select-form') as HTMLFormElement
        this.nextLevelElement = this.element.querySelector('#next-level') as HTMLButtonElement

        this.update()

        this.registerEventListeners()
    }

    private render = (): string => `
        <div class="nav-container">
            <input class="checkbox" type="checkbox" id="menu-toggle">
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul class="menu-items">
                <li>
                    <form id="level-select-form">
                        <input id="level-select" pattern="(o3|o4|tbt)-\\d+"><br>
                        <input type="submit" value="Go to level"><br>
                        <button id="next-level">Next level</button>
                    </form>
                </li>
            </ul>
        </div>`;

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