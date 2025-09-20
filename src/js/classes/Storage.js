import { Artifact } from "./Artifact";
import { Backup } from "./Backup";
import { Serializer } from "./Serializer";
import { StorageItemArtifacts } from "./StorageItem/Artifacts";
import { StorageItemChar } from "./StorageItem/Char";
import { StorageItemRotation } from "./StorageItem/Rotation";
import { StorageItemSettings } from "./StorageItem/Settings";
import { Syncronize } from "./StorageItem/Syncronize";

export class Storage {
    constructor(app) {
        this.app = app;
        this.char = new StorageItemChar();
        this.rotation = new StorageItemRotation();
        this.artifacts = new StorageItemArtifacts();
        this.settings = new StorageItemSettings();
        this.sync = new Syncronize(app);
    }

    createBackup(opts) {
        let backup = Backup.fromStorage(this, opts);
        backup.setLastModified(this.app.getSetting('storage_last_modified') || Date.now());
        return backup;
    }

    loadBackup(backup, opts) {
        if (!backup) return;

        opts = Object.assign({}, opts);

        this.char.fromBackup(backup.getChars(), opts.addChars);
        this.rotation.fromBackup(backup.getRotations(), opts.addRotations);

        // FIXME
        let artifacts = backup.getArtifacts();
        if (artifacts) {
            let storage = this.app.storage.artifacts;

            if (!opts.addArts) {
                storage.clear();
            }

            let toAdd = [];
            for (const item of artifacts) {
                let art = Artifact.deserialize( Serializer.unpack(item.data) );
                if (art) {
                    art.setLocked(item.locked)
                    art.setGroups(item.group)
                    toAdd.push(art);
                }
            }

            storage.addArtifacts(toAdd);
            this.app.refresh();
        }

        return 1;
    }
}
