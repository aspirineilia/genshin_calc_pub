function getResult(elem) {
    let rows = getData(elem);
    let stats = {
        'HP': 'hp_base',
        'Atk': 'atk_base',
        'Atk%': 'atk_percent',
        'Def': 'def_base',
        'HP%': 'hp_percent',
        'CritRate%': 'crit_rate_base',
        'CritDMG%': 'crit_dmg_base',
        'Elemental Mastery': 'mastery_base',
    }

    let str = '';

    for (let stat in rows) {
        str += "new StatTableAscensionChar('"+ (stats[stat] || stat) +"', ";
        let line = getStatTable(rows[stat]);
        str += '['+ line[0].join(', ') +'], ['+ line[1].join(', ') +']),';

        str = str.replace(/\[0(, 0)+\]/, '[0]');
        str = str.replace(/\[5(, 5)+\]/, '[5]');
        str = str.replace(/\[50(, 50)+\]/, '[50]');

        str += "\n";
    }

    console.log(str)
}

function getData(elem) {
    let headers = [];
    let result = {};
    jQuery(elem).find('tr').each(function() {
        if (headers.length == 0) {
            jQuery(this).find('td').each(function() {
                let val = jQuery(this).text();
                headers.push(val);
                result[val] = [];
            });
        } else {
            let cols = jQuery(this).find('td');
            for (let i = 0 ; i < cols.length; ++i) {
                let name = headers[i];
                let value = jQuery(cols[i]).text();
                value = value.replace(/\%/, '');

                if (value.match(/^[\d\+]+$/)) {
                    result[name].push(parseInt(value))
                } else if (value.match(/^[\d\.]+$/)) {
                    result[name].push(parseFloat(value))
                }
            }
        }
    });

    delete result['Lv'];
    delete result['Ascension'];

    return result;
}

function getStatTable(values) {
    let bonus = 0;
    let base = [];
    let ascension = [];

    base.push(values.shift());

    while (values.length >= 2) {
        let b = values.shift();
        let a = values.shift();

        let new_b = b - bonus;
        if (new_b < 0.001) new_b = 0;

        base.push(new_b);
        bonus = bonus + a - b;

        let new_a = bonus;
        if (Math.round(bonus) != bonus) new_a = bonus.toFixed(1);

        ascension.push(new_a);
    }

    if (values.length) {
        let new_b = values.shift() - bonus;
        if (new_b < 0.001) new_b = 0;

        base.push(new_b);
    }

    return [base, ascension];
}

function getSkills() {
    let result = '';

    jQuery('.skill_dmg_table').each(function() {
        jQuery(this).find('tr').each(function() {
            let row = jQuery(this);

            let title = row.find('td').first().text();
            if (!title) {
                return;
            }

            if (title.match(/(Duration|CD|Energy Cost|Stamina Cost)/)) {
                return;
            }

            let split_str = '';
            if (title.match('/')) {
                split_str = '/';
            } else if (title.match('Regeneration')) {
                split_str = '+';
            }

            if (split_str) {
                let levels = row.find('td').map(function(i, el) {
                    let values = jQuery(el).text().split(split_str);
                    for (let i in values) {
                        values[i] = values[i].replace(/[^\d\+\.]/g, '');
                    }
                    return [values];
                }).get();
                levels.shift();

                let values = [];
                for (let i = 0; i < levels[0].length; ++i) {
                    for (let j = 0; j < levels.length; ++j) {
                        if (!values[i]) values[i] = [];
                        values[i].push(levels[j][i]);
                    }
                }

                for (let vals of values) {
                    result += "new StatTable('" + title +"', ["+ vals.join(', ') +']),' + "\n";
                }
            } else {
                let levels = row.find('td').map(function(i, el) {
                    let value = jQuery(el).text();
                    value = value.replace(/[^\d\+\.]/g, '');
                    return value;
                }).get();
                levels.shift();

                result += "new StatTable('" + title +"', ["+ levels.join(', ') +']),' + "\n";
            }
        });
        result += "----\n"
    })
    console.log(result);
}

getResult(jQuery('.stat_table')[0]);
getSkills();
