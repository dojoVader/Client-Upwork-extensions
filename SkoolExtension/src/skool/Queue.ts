export class QueueMap<T> {

    //We will store the elements of Nodes to be processed in the map
    public list: Map<string, T> = new Map<string, T>()


    public enqueue(token: string, payload: T) {
        this.list.set(token, payload);
    }

    public dequeue(token: string) {
        // you can pass token for removing specific item
        if (token) {
            const itemShouldRemove = this.list.has(token) ? this.list.get(token) : null;
            if (itemShouldRemove) {
                this.list.delete(token); // Remove from the Queue
            }
            return itemShouldRemove;
        }
    }

    public inList(token: string) {
        return this.list.has(token);
    }


    public isEmpty() {
        return this.list.size <= 0;
    }
    public clear() {
        this.list.clear();
    }


    public getList() {
        return (Array.of(...this.list.entries()))
    }

}