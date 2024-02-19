import GameEvent from './Models/GameEvent';

class GameHistory {
    private gameEvents: Array<GameEvent> = []
    private redoStack: Array<GameEvent> = []

    private onUndo: Function = () => {}

    constructor()
    {
        this.registerEvents()
    }

    public addEvent(event: GameEvent): void
    {
        if (this.redoStack.length > 0) {
            // Clear the redo stack as new history just happened.
            this.redoStack = []
        }

        this.gameEvents.push(event)
    }

    public registerUndo(onUndo: Function): void
    {
        this.onUndo = onUndo
    }

    private registerEvents(): void
    {
        window.addEventListener('keyup', this.handleKeyUp.bind(this))
    }

    private handleKeyUp(event: KeyboardEvent): void {
        const keyPressed = event.key;
        if (!event.ctrlKey && !event.metaKey) {
            return
        }

        // Undo
        if (keyPressed === 'z' && this.gameEvents.length > 0) {
            const event = this.gameEvents.pop() as GameEvent
            this.redoStack.push(event)
            this.onUndo(event.before)
        }

        // Redo
        if (keyPressed === 'y' && this.redoStack.length > 0) {
            const event = this.redoStack.pop() as GameEvent
            this.gameEvents.push(event)
            this.onUndo(event.after)
        }
    }
}

export default GameHistory