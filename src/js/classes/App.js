import { CalcSet } from "./CalcSet";
import { Rotation } from "./Rotation";
import { Serializer } from "./Serializer";
import { Storage } from "./Storage";

const DEFAULT_CHAR_BUILD = 'bbbaabbbabbabaaabcbabrabadaaa'

export class App {
    constructor(version) {
        this.version = version;
        this.storage = new Storage(this);
        this.settings = {};
        this.current = new CalcSet();

        this.loadDefault();

        window.addEventListener('hashchange', () =>{ this.checkHash() });
    }

    loadDefault() {
        let char = DB.Chars.getFirst();
        this.current.setChar(char);
        this.current.setWeapon(DB.Weapons.get(char.weapon).getFirst())
        this.current.setEnemy(DB.Enemies.getFirst().getFirst())
    }

    checkHash() {
        let hash = document.location.hash || '';
        hash = hash.substring(1);
        let loadedRotation;

        if (/^r/.exec(hash)) {
            let input = Serializer.unpack(hash.substring(1));
            loadedRotation = Rotation.deserialize(input);
        } else {
            let match = /^uid(\d{9})$/.exec(hash);
            if (match) {
                UI.EnkaImport.show(match[1]);
            }

            match = /^profile_(\w+)$/.exec(hash);
            if (match) {
                UI.EnkaImport.show(match[1]);
            }
        }

        let hashContainChar = false;
        if (hash) {
            let input = Serializer.unpack(hash);
            if (input) {
                let build = CalcSet.deserialize(input);
                if (build) {
                    let isBeta = build.hasBetaContent();
                    if (isBeta && !this.showBetaContent()) {
                        // dont load
                    } else {
                        hashContainChar = true;
                        this.replaceSet(build);
                    }
                }
            }
        }

        if (!hashContainChar) {
            let input = Serializer.unpack(this.getSetting('last_build'));
            if (input) {
                let build = CalcSet.deserialize(input);
                if (build) {
                    let isBeta = build.hasBetaContent();
                    if (!isBeta || this.showBetaContent()) {
                        this.replaceSet(build);
                    }
                }
            }
        }

        if (loadedRotation) {
            this.setRotation(loadedRotation);
            setTimeout(() => {UI.Layout.showTab('rotation')}, 500);
        }
    }

    getVersion() {
        return this.version;
    }

    resetBuild(charId) {
        this.current = new CalcSet;
        let char;
        if (charId) {
            char = DB.Chars.getById(charId);
        }
        if (!char) {
            char = DB.Chars.getFirst();
        }
        this.setChar(char);
        this.setWeapon(DB.Weapons.get(char.weapon).getFirst())
        this.setEnemy(DB.Enemies.getFirst().getFirst())
        document.location.hash = ''
    }

    replaceSet(set) {
        this.current = set;
        this.refresh();
    }

    currentSet() {
        return this.current;
    }

    getFeatures(data) {
        return this.currentSet().getFeatures(data, 1);
    }

    setChar(char) {
        this.currentSet().setChar(char);
        this.refresh();
    }

    setCharLevels(data) {
        this.currentSet().setCharLevels(data);
        this.refresh();
    }

    setCharSkills(data) {
        this.currentSet().setCharSkills(data);
        this.refresh();
    }

    setCharSettings(data) {
        this.currentSet().setCharSettings(data);
        this.refresh();
    }

    getChar() {
        return this.currentSet().getChar();
    }

    setWeapon(data) {
        this.currentSet().setWeapon(data);
        this.refresh();
    }

    setWeaponLevels(data) {
        this.currentSet().setWeaponLevels(data);
        this.refresh();
    }

    setWeaponSettings(data) {
        this.currentSet().setWeaponSettings(data);
        this.refresh();
    }

    setArtifact(data, noRefresh) {
        this.currentSet().setArtifact(data);
        if (!noRefresh) {
            this.refresh();
        }
    }

    getWeapon() {
        return this.currentSet().getWeapon();
    }

    setEnemy(data) {
        this.currentSet().setEnemy(data);
        this.refresh();
    }

    setEnemyLevels(data) {
        this.currentSet().setEnemyLevels(data);
        this.refresh();
    }

    setEnemyResistances(data) {
        this.currentSet().setEnemyResistances(data);
        this.refresh();
    }

    setEnemySettings(data) {
        this.currentSet().setEnemySettings(data);
        this.refresh();
    }

    getEnemy() {
        return this.currentSet().getEnemy();
    }

    getArtifacts() {
        return this.currentSet().getArtifacts();
    }

    removeArtifact(data) {
        this.currentSet().removeArtifact(data);
        this.refresh();
    }

    setArtifactsSettings(data) {
        this.currentSet().setArtifactsSettings(data);
        this.refresh();
    }

    isEquipped(data) {
        return this.currentSet().isEquipped(data);
    }

    setFood(type, food, level) {
        this.currentSet().setFood(type, food, level);
        this.refresh();
    }

    getFood(type) {
        return this.currentSet().getFood(type);
    }

    getFoodLevel(type) {
        return this.currentSet().getFoodLevel(type);
    }

    getBuffs() {
        return this.currentSet().getBuffs();
    }

    setBuffsSettings(data) {
        this.currentSet().setBuffsSettings(data);
        this.refresh();
    }

    modifyBuffsSettings(data) {
        this.currentSet().modifyBuffsSettings(data);
        this.refresh();
    }

    setRotation(data) {
        this.currentSet().setRotation(data);
    }

    getRotation() {
        return this.currentSet().getRotation();
    }

    getSettings() {
        let settings = this.currentSet().getSettings();
        return settings;
    }

    getConditions(options) {
        return this.currentSet().getConditions(options);
    }

    getStats() {
        return this.currentSet().getStats();
    }

    setPartyChars(ids) {
        this.currentSet().setPartyChars(ids);
        this.refresh();
    }

    getPartyChars() {
        return this.currentSet().getPartyChars();
    }

    setSetting(name, value) {
        return this.storage.settings.set(name, value);
    }

    showBetaContent() {
        return this.storage.settings.showBetaContent()
    }

    getSetting(name) {
        return this.storage.settings.get(name);
    }

    setFeature(value) {
        this.setSetting('suggester_feature_name', value);
    }

    getFeature() {
        let features = this.currentSet().calcFeatures(1);
        let keys = Object.keys(features);
        let featureName = this.getSetting('suggester_feature_name');

        if (! keys.includes(featureName)) {
            featureName = keys[0];
        }

        return featureName;
    }

    getDisplayMode() {
        return this.getSetting('suggester_display_mode') || 'percent';
    }

    setDisplayMode(value) {
        this.setSetting('suggester_display_mode', value);
    }

    queueUpdate() {
        if (this.getSetting('storage_sync_enabled')) {
            this.storage.sync.queue();
        }
    }

    initSync(manual) {
        this.storage.sync.init(manual);
    }

    enableSync() {
        UI.Sync.enable();
        this.storage.sync.driveInitApp(true);
    }

    disableSync(deleteFile) {
        this.storage.sync.disable(deleteFile);
        this.refresh();
    }

    refresh(opts) {
        opts = Object.assign({}, opts);
        this.currentSet().refreshCommonSettings();
        this.saveLastBuild();

        let updateStorage = false;
        if (Array.isArray(opts.objects)) {
            for (let obj of opts.objects) {
                let parts = obj.split('.');
                let category = parts[0];
                if (category == 'storage') {
                    updateStorage = true;
                    break;
                }
            }
        }

        if (updateStorage) {
            this.queueUpdate();
        }

        UI.Layout.refresh();
    }

    saveLastBuild() {
        let build = Serializer.pack(this.currentSet());
        if (build != DEFAULT_CHAR_BUILD) {
            this.setSetting('last_build', build)
        } else {
            this.setSetting('last_build', '')
        }
    }

    addCharactersToStorage(chars) {
        this.storage.char.addChars(chars);
        this.refresh({objects: ['storage.artifacts']});
    }

    addArtifactsToStorage(arts) {
        this.storage.artifacts.addArtifacts(arts);
        this.refresh({objects: ['storage.artifacts']});
    }
}
