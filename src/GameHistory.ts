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

        if (keyPressed === 'z') {
            this.undo()
        }

        if (keyPressed === 'y') {
            this.redo()
        }
    }

    public undo(): void
    {
        if (this.gameEvents.length === 0) {
            return
        }
        const event = this.gameEvents.pop() as GameEvent
        this.redoStack.push(event)
        this.onUndo(event.before)
    }

    public redo(): void
    {
        if (this.redoStack.length === 0) {
            return
        }
        const event = this.redoStack.pop() as GameEvent
        this.gameEvents.push(event)
        this.onUndo(event.after)

    }

    public hasUndo(): boolean
    {
        return this.gameEvents.length > 0
    }

    public hasRedo(): boolean
    {
        return this.redoStack.length > 0
    }

}

export default GameHistory