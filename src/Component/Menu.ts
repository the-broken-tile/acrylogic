
class Menu {
    constructor(private element: HTMLMenuElement) {
        this.element.classList.add('menu')
        this.element.innerHTML = 'Menu'
    }
}

export default Menu