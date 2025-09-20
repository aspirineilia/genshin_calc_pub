const DRIVE_CLIENT_ID = '23514418281-hnsnrvdaiu6loi8rob1ttuned773n7iq.apps.googleusercontent.com' // prod
// const DRIVE_CLIENT_ID = '212641732900-mhmqk2643a60b0t2qmpadmu0ermht4cq.apps.googleusercontent.com' // dev
const DRIVE_API_KEY = 'AIzaSyBiK_Y9LXJMzYxGt_p2qJ2dnMGtxOXHoU8' // prod
// const DRIVE_API_KEY = 'AIzaSyCKO7h7FTs4TWfNU41T2YZQEezoumA6D7c' // dev
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata'
const DRIVE_DISCOVERY = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

export class GoogleDrive {
    init(loginCallback, manual, token) {
        if (!this.client) {
            let params = {
                client_id: DRIVE_CLIENT_ID,
                scope: DRIVE_SCOPE,
                callback: (response) => {
                    this.setToken(response);
                    loginCallback();
                }
            };

            if (!manual) {
                params.prompt = '';
            }

            gapi.load('client', () => {
                this.client = google.accounts.oauth2.initTokenClient(params);

                gapi.client.setApiKey(DRIVE_API_KEY);
                gapi.client.load(DRIVE_DISCOVERY).then(() => {
                    if (token) {
                        this.setToken(token);
                        loginCallback();
                    } else {
                        this.requestLogin(manual);
                    }
                });
            });
        } else {
            if (token) {
                loginCallback();
            } else {
                this.requestLogin(manual);
            }
        }
    }

    setToken(response) {
        if (response && response.access_token) {
            this.response = response;
            gapi.client.setToken(response);
        }
    }

    checkLogin(response, callback) {
        if (response && response.access_token) {
            this.response = response;
            gapi.client.setApiKey(DRIVE_API_KEY);
            gapi.client.setToken(response);
            gapi.client.load(DRIVE_DISCOVERY).then(() => {
                if (this.isLogged()) {
                    callback()
                }
            });
        }
    }

    isLogged() {
        if (this.hasAccess()) {
            return true
        }
        return false;
    }

    hasAccess() {
        return google.accounts.oauth2.hasGrantedAnyScope(this.response, DRIVE_SCOPE)
    }

    requestLogin(manual, hint) {
        this.response = null;
        if (manual) {
            this.client.requestAccessToken({prompt: 'select_account'})
        } else {
            this.client.requestAccessToken({
                prompt: '',
                hint: hint,
            })
        }
    }

    revoke() {
        if (this.response) {
            this.response = undefined;
            google.accounts.oauth2.revoke(this.response.access_token)
        }
    }

    async getFileId(fileName, dontCreate) {
        let fileId;

        let response = await gapi.client.drive.files.list({
            spaces: 'appDataFolder',
        });

        for (let file of response.result.files) {
            if (file.name == fileName && !fileId) {
                fileId = file.id
            } else {
                this.delete(file.id)
            }
        }

        if (!fileId && !dontCreate) {
            let response = await gapi.client.drive.files.create({
                name: fileName,
                mimeType: 'application/json',
                parents: ['appDataFolder'],
            });

            if (response && response.result) {
                fileId = response.result.id;
            }
        }

        return fileId;
    }

    async download(fileId) {
        let file = await gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        })

        return file.body;
    }

    async upload(fileId, content) {
        let response = await gapi.client.request({
            path: `/upload/drive/v3/files/${fileId}`,
            method: 'PATCH',
            params: {uploadType: 'media'},
            body: content,
        });

        return response.result.id;
    }

    async delete(fileId) {
        await gapi.client.drive.files.delete({fileId: fileId});
    }

    isGapiLoaded() {
        return gapi && gapi.auth2
    }

    logout() {
        if (this.isGapiLoaded()) {
            gapi.auth2.getAuthInstance().signOut();
        }
    }
}
