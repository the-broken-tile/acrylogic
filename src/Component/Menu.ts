import Store from '../Store';

class Menu {
    private readonly menuToggle: HTMLInputElement;
    private readonly levelSelect: HTMLInputElement;
    private readonly levelSelectForm: HTMLFormElement;

    constructor(private readonly element: HTMLMenuElement, private store: Store, private onLevelChange: Function) {
        this.element.classList.add('menu')
        this.element.innerHTML = this.render()
        this.menuToggle = this.element.querySelector('#menu-toggle') as HTMLInputElement
        this.levelSelect = this.element.querySelector('#level-select') as HTMLInputElement
        this.levelSelectForm = this.element.querySelector('#level-select-form') as HTMLFormElement

        this.levelSelect.value = `${this.store.getId() ?? 1}`

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
                        <input type="number" id="level-select"><br>
                        <input type="submit" value="Go to level">
                    </form>
                </li>
            </ul>
        </div>`;

    public close(): void
    {
        this.menuToggle.checked = false
        this.levelSelect.value = `${this.store.getId() ?? 1}`
    }

    private handleLevelChange(event: Event): void {
        event.preventDefault()

        this.onLevelChange(parseInt(this.levelSelect.value, 10))
    }

    private registerEventListeners(): void {
        this.levelSelectForm.addEventListener('submit', this.handleLevelChange.bind(this))
    }
}

export default Menu