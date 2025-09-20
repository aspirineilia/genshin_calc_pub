import React from 'react';
import ReactDOM from 'react-dom/client'
import 'simplebar/dist/simplebar.min.css';

import "./app.css"
import "../css/generated/icons_chars.css";
import "../css/generated/icons_enemies_abyss.css";
import "../css/generated/icons_enemies_automatons.css";
import "../css/generated/icons_enemies_boss.css";
import "../css/generated/icons_enemies_elemental.css";
import "../css/generated/icons_enemies_fatui.css";
import "../css/generated/icons_enemies_hilichurls.css";
import "../css/generated/icons_enemies_human.css";
import "../css/generated/icons_enemies_magical.css";
import "../css/generated/icons_weapons_bow.css";
import "../css/generated/icons_weapons_catalyst.css";
import "../css/generated/icons_weapons_claymore.css";
import "../css/generated/icons_weapons_polearm.css";
import "../css/generated/icons_weapons_sword.css";
import "../css/icons/domains.css";
import "../css/app.css";
import "../css/ui/Layout.css";


import { Lang } from '../js/ui/Lang';
import { Casino } from './Components/Casino';

document.addEventListener("DOMContentLoaded", function() {
    let root = document.querySelector('#app');
    ReactDOM.createRoot(root).render(<App />)
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.loadChars();
        this.loadWeapons();
        this.loadBosses();
        this.loadDomains();
    }

    loadChars() {
        this.charItems = [];

        for (let charId of DB.Chars.getKeysSorted(this.lang)) {
            let char = DB.Chars.get(charId);
            let item = {
                id: charId,
                title: this.lang.get(char.getName()),
                padding: 10,
                height: 100,
                iconClass1: `char-icon border-rarity-${char.getRarity()} background-element-${char.getElement()}`,
                iconClass2: char.getIcon(),
            };
            this.charItems.push(item);
        }
    }

    loadWeapons() {
        this.weaponItems = [];

        for (let weaponType of DB.Weapons.getKeys()) {
            let data = DB.Weapons.get(weaponType);
            let weapons = data.getKeysSorted(this.lang);

            for (let rarity = 4; rarity <=5; ++rarity) {
                for (let weaponName of weapons) {
                    let weapon = data.get(weaponName);

                    if (weapon.getRarity() != rarity) {
                        continue;
                    }

                    this.weaponItems.push({
                        id: weapon.getId(),
                        title: this.lang.get(weapon.getName()),
                        padding: 10,
                        height: 100,
                        iconClass1: `char-icon border-rarity-${weapon.getRarity()} background-element-none`,
                        iconClass2: weapon.getIcon(),
                    });
                }
            }
        }
    }

    loadBosses() {
        this.bossItems = [];

        let ids = [
            33, 34, 35, 88, 90, 109, 164, 36, 110, 118, 75, 76, 68, 223, 89, 91, 129, 156, 152, 170,
            69, 70, 71, 78, 108, 126, 163,
        ];

        for (let enemyId of ids) {
            let enemy = DB.Enemies.getById(enemyId);
            let icon = enemyId == 223 ? 'type-magical enemy-icon-drake-deepsea-twinbossfight' : enemy.getIcon();

            let item = {
                id: enemyId,
                // title: this.lang.get(enemy.getName()),
                padding: 10,
                height: 100,
                iconClass1: 'enemy-icon border-rarity-1 '+ icon,
                iconClass2: '',
            };
            this.bossItems.push(item);
        }
    }

    loadDomains() {
        this.domainItems = [];

        for (let i = 1; i <= 12; ++i) {
            let num = String(i).padStart(2, '0')
            this.domainItems.push({
                id: 'artifact'+ num,
                padding: 10,
                height: 100,
                iconClass1: 'domain-icon domain-icon-artifact-'+ num,
                iconClass2: '',
            });
        }

        for (let type of ['talent', 'resource']) {
            for (let i = 1; i <= 4; ++i) {
                let num = String(i).padStart(2, '0')
                this.domainItems.push({
                    id: type + num,
                    padding: 10,
                    height: 100,
                    iconClass1: 'domain-icon domain-icon-'+ type +'-'+ num,
                    iconClass2: '',
                });
            }
        }
    }

    render() {
        return (
            <div>
                <Casino
                    wrapperClass="char-list-wrapper"
                    items={this.charItems}
                    storageName="casino_chars"
                    number={4}
                />
                <Casino
                    wrapperClass="enemy-list-wrapper"
                    items={this.weaponItems}
                    storageName="casino_weapons"
                    number={4}
                />
                <Casino
                    wrapperClass="enemy-list-wrapper"
                    items={this.bossItems}
                    storageName="casino_bosses"
                    number={1}
                />
                <Casino
                    wrapperClass="enemy-list-wrapper"
                    items={this.domainItems}
                    storageName="casino_domains"
                    number={1}
                />
            </div>
        );
    }
}
