import { GoogleDrive } from "../API/GoogleDrive";
import { Backup } from "../Backup";

const BACKUP_FILE_NAME = 'backup.json';
const PENDING_DELAY_SEC = 10000;

export class Syncronize {
    constructor(app) {
        this.app = app;
        this.api = new GoogleDrive();
        this.scripts = {
            'https://apis.google.com/js/api.js': false,
            'https://accounts.google.com/gsi/client': false,
        };
    }

    init() {
        for (let name of Object.keys(this.scripts)) {
            var newScript = document.createElement("script");
            newScript.onload = () => {this.scriptLoaded(name)};
            newScript.onerror = () => {this.scriptError(name)};
            document.head.appendChild(newScript);
            newScript.src = name;
        }
    }

    isEnabled() {
        return this.app.getSetting('storage_sync_enabled');
    }

    scriptLoaded(name) {
        this.scripts[name] = true;
        if (this.isScriptsLoaded()) {
            this.apiLoaded();
        }
    }

    scriptError(name) {
        if (this.isEnabled()) {
            UI.Sync.enable();
            this.setError('load_failed');
        }
    }

    isScriptsLoaded() {
        let result = true;
        for (let name of Object.keys(this.scripts)) {
            result &&= this.scripts[name];
        }
        return result;
    }

    apiLoaded() {
        this.setStatus('disabled');
        if (this.isEnabled()) {
            UI.Sync.enable()
            this.driveInitApp();
        }
    }

    driveInitApp(manual) {
        this.setStatus(manual ? 'auth' : 'init');
        this.api.init(() => {this.apiIsLoaded()}, manual, manual ? '' : this.getSavedToken());
    }

    getSavedToken() {
        try {
            let data = JSON.parse(this.app.getSetting('token_response'));
            if (data.access_token) {
                return data;
            }
        } catch {}
    }

    saveToken() {
        let data = this.api.response;
        if (data) {
            this.app.setSetting('token_response', JSON.stringify(data));
        } else {
            this.app.setSetting('token_response', '');
        }
    }

    apiIsLoaded() {
        if (this.api.isLogged()) {
            this.authFail = 0;
            this.app.setSetting('storage_sync_enabled', 1);
            this.app.refresh();
            this.saveToken();
            this.storageSync();
        } else {
            this.setError('not_logged');
        }
    }

    setStatus(status) {
        // console.log(status);
        UI.Sync.setStatus(status);
    }

    setError(error) {
        // TODO
        this.setStatus('error');
    }

    async backupFileId(dontCreate) {
        let fileId = this.app.getSetting('storage_backup_file');

        if (!fileId) {
            fileId = await this.api.getFileId(BACKUP_FILE_NAME, dontCreate);
        }

        return fileId;
    }

    async storageSync() {
        this.setStatus('check');

        try {
            let fileId = await this.backupFileId();
            let data = await this.api.download(fileId)
            let remoteData = Backup.fromString(data);

            let lastModified = this.app.getSetting('storage_last_modified') || 0;
            let backupLastModified = remoteData ? remoteData.getLastModified() : 0;

            if (lastModified > backupLastModified) {
                this.storageSyncUpload();
            } else if (lastModified < backupLastModified) {
                this.storageSyncDownload(remoteData);
            } else {
                this.setStatus('ok');
            }
        } catch(e) {
            this.processError(e);
        }
    }

    async storageSyncUpload() {
        this.setStatus('sync');

        try {
            let fileId = await this.backupFileId();
            let localBackup = this.app.storage.createBackup();

            await this.api.upload(fileId, localBackup.stringify());
        } catch(e) {
            this.processError(e);
        }

        this.setStatus('ok');
    }

    async storageSyncDownload(backup) {
        this.setStatus('sync');
        this.app.storage.loadBackup(backup);

        this.setStatus('ok');
        this.app.refresh();
    }

    async deleteBackupFiles() {
        try {
            let fileId = await this.backupFileId(true);
            await this.api.delete(fileId);
        } catch(e) {}
    }

    processError(e) {
        this.app.setSetting('storage_sync_enabled', 0);

        if (e.status == 401) {
            if (this.authFail) {
                this.setError('unknown');
                return;
            }

            this.setStatus('auth');
            this.authFail = 1;
            this.api.requestLogin(false, this.app.getSetting('storage_hint_email'));
            return;
        }

        this.setError('unknown');
    }

    async disable(deleteFile) {
        this.app.setSetting('storage_sync_enabled', 0);
        this.app.setSetting('token_response', '');

        if (deleteFile) {
            await this.deleteBackupFiles();
            this.api.revoke();
            this.saveToken();
        }

        UI.Sync.disable();
    }

    queue() {
        this.setStatus('pending');
        this.app.setSetting('storage_last_modified', Date.now());

        if (this.syncTimeout) {
            clearTimeout(this.syncTimeout);
        }

        this.syncTimeout = setTimeout(() => { this.storageSyncUpload() }, PENDING_DELAY_SEC);
    }
}
