const KEY = 'gameId';

class Store {
    public constructor(private storage: Storage) {
    }
    setId(id: number): void {
        this.storage.setItem(KEY, JSON.stringify(id));
    }

    getId() : number | null {
        const current = this.storage.getItem(KEY) as string | null;
        if (current === null) {
            return null;
        }

        return JSON.parse(current) as number | null;
    }
}

export default Store