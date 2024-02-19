const KEY = 'gameID';

class Store {
    public constructor(private storage: Storage) {}

    setId(id: string): void
    {
        this.storage.setItem(KEY, JSON.stringify(id));
    }

    getId() : string | null
    {
        const current = this.storage.getItem(KEY) as string | null;
        if (current === null) {
            return null;
        }

        return JSON.parse(current) as string | null;
    }
}

export default Store