export class ArtifactPool {
    constructor() {
        this.items = [];
    }

    addArtifact(artifact) {
        this.items.push(artifact);
    }

    replaceArtifact(art, index) {
        if (this.items.length < index) {
            return;
        }

        if (this.items[index]) {
            this.items[index].replace(art);
            return true;
        }

        return false;
    }

    getList() {
        return this.items;
    }

    empty() {
        this.items = [];
    }
}
