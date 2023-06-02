const plus = document.createElement('i');
plus.classList.add('fa-solid');
plus.classList.add('fa-plus');
const minus = document.createElement('i');
minus.classList.add('fa-solid');
minus.classList.add('fa-minus');
let tribute = null;

const BOARDS = ['mainboard', 'sideboard'];

function makeItem(id) {
    const div = document.createElement('div');
    div.setAttribute('id', 'deck-' + id);
    div.classList.add('accordion-item');

    const header = document.createElement('h2');
    header.setAttribute('id', 'heading-' + id);
    header.classList.add('accordion-header');

    const headerButton = document.createElement('button');
    headerButton.classList.add('accordion-button');
    headerButton.setAttribute('type', 'button');
    headerButton.setAttribute('data-bs-toggle', 'collapse');
    headerButton.setAttribute('data-bs-target', '#collapse-' + id);
    headerButton.setAttribute('aria-expanded', 'true');
    headerButton.setAttribute('aria-controls', 'collapse-' + id);

    const headerRemove = document.createElement('button');
    headerRemove.classList.add('btn');
    headerRemove.classList.add('btn-danger');
    headerRemove.setAttribute('type', 'button');
    headerRemove.setAttribute('title', 'Remove this deck');
    headerRemove.setAttribute('onclick', `removeDeck('${id}');`);

    const headerName = document.createElement('input');
    headerName.classList.add('form-control');
    headerName.setAttribute('type', 'text');
    headerName.setAttribute('placeholder', 'Deck ' + id);
    headerName.setAttribute('style', 'margin: 0 20px;');

    headerRemove.append(minus.cloneNode());
    headerButton.append(headerRemove);
    headerButton.append(headerName);
    header.append(headerButton);

    const content = document.createElement('div');
    content.setAttribute('id', 'collapse-' + id);
    content.classList.add('accordion-collapse');
    content.classList.add('collapse');
    content.setAttribute('aria-labelledby', 'heading-' + id);

    const contentBody = document.createElement('div');
    contentBody.classList.add('accordion-body');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('container');
    contentContainer.setAttribute('style', 'padding: 0;');

    const contentRow = document.createElement('div');
    contentRow.classList.add('row');
    contentRow.classList.add('justify-content-center');

    const contentMainBoard = document.createElement('div');
    contentMainBoard.classList.add('col-6');

    const contentSideBoard = document.createElement('div');
    contentSideBoard.classList.add('col-6');
    contentSideBoard.setAttribute('style', 'border-left: 1px solid #ddd;');

    const contentCards = document.createElement('div');
    contentCards.setAttribute('id', 'cards-' + id);

    const contentNewCards = document.createElement('textarea');
    contentNewCards.setAttribute('id', 'newCards-' + id);
    contentNewCards.classList.add('form-control');
    contentNewCards.setAttribute('rows', 5);
    contentNewCards.setAttribute('placeholder', '2 Jace, the Mind Sculptor');
    if(tribute) tribute.attach(contentNewCards);

    const contentAddCards = document.createElement('button');
    contentAddCards.classList.add('btn');
    contentAddCards.classList.add('btn-primary');
    contentAddCards.setAttribute('type', 'button');
    contentAddCards.setAttribute('title', 'Add these cards');
    contentAddCards.setAttribute('onclick', `addNewCards('${id}');`);

    const contentCardsSide = document.createElement('div');
    contentCardsSide.setAttribute('id', 'cardsSide-' + id);

    const contentNewCardsSide = document.createElement('textarea');
    contentNewCardsSide.setAttribute('id', 'newCardsSide-' + id);
    contentNewCardsSide.classList.add('form-control');
    contentNewCardsSide.setAttribute('rows', 5);
    contentNewCardsSide.setAttribute('placeholder', '2 Rest in Peace');
    if(tribute) tribute.attach(contentNewCardsSide);

    const contentAddCardsSide = document.createElement('button');
    contentAddCardsSide.classList.add('btn');
    contentAddCardsSide.classList.add('btn-primary');
    contentAddCardsSide.setAttribute('type', 'button');
    contentAddCardsSide.setAttribute('title', 'Add these cards');
    contentAddCardsSide.setAttribute('onclick', `addNewCards('${id}', true);`);

    const mainBoard = document.createElement('h4');
    mainBoard.innerHTML = 'Mainboard';
    const sideBoard = document.createElement('h4');
    sideBoard.innerHTML = 'Sideboard';

    contentAddCards.append(plus.cloneNode());
    contentMainBoard.append(mainBoard);
    contentMainBoard.append(contentCards);
    contentMainBoard.append(contentNewCards);
    contentMainBoard.append(contentAddCards);

    contentAddCardsSide.append(plus.cloneNode());
    contentSideBoard.append(sideBoard);
    contentSideBoard.append(contentCardsSide);
    contentSideBoard.append(contentNewCardsSide);
    contentSideBoard.append(contentAddCardsSide);

    contentRow.append(contentMainBoard);
    contentRow.append(contentSideBoard);
    contentContainer.append(contentRow);
    contentBody.append(contentContainer);
    content.append(contentBody);

    div.append(header);
    div.append(content);
    return div;
}

deckId = 0
function addDeck() {
    return document.querySelector('#decks').appendChild(
        makeItem((++deckId).toString().padStart(2, "0"))
    );
}

function removeDeck(id) {
    document.querySelector('#deck-' + id).remove();
    if(document.querySelector('#decks').childElementCount == 0) {
        addDeck();
    }
}

function addCard(id, amount, name, sideboard=false) {
    const side = sideboard ? 'Side' : '';
    cardList = document.querySelector(`#cards${side}-` + id);

    let notFound = true;
    [...cardList.children].forEach(function(card) {
        if(card.childNodes[2].innerText == name) {
            card.childNodes[1].value = parseInt(card.childNodes[1].value) + amount;
            notFound = false;
        }
    });
    if(!notFound) return;

    const card = document.createElement('div');
    card.classList.add('deckCard');
    card.classList.add('input-group');
    card.classList.add('mb3');

    const cardRemove = document.createElement('button');
    cardRemove.classList.add('btn');
    cardRemove.classList.add('btn-danger');
    cardRemove.setAttribute('type', 'button');
    cardRemove.setAttribute('title', 'Remove this card');
    cardRemove.setAttribute('onclick', `removeCard('${id}', '${name}', ${sideboard});`);

    const cardAmount = document.createElement('input');
    cardAmount.classList.add('form-control');
    cardAmount.setAttribute('type', 'number');
    cardAmount.setAttribute('min', '0');
    cardAmount.setAttribute('max', '99');
    cardAmount.setAttribute('style', 'width: 55px; flex: initial; text-align: right; padding-right: 5px; padding-left: 5px;');
    cardAmount.setAttribute('aria-describedby', "basic-addon2");
    cardAmount.value = amount;

    const cardName = document.createElement('span');
    cardName.innerText = name;
    cardName.setAttribute('style', 'flex: auto; overflow: auto; max-width: calc(100% - 55px - 40px);');
    cardName.classList.add('input-group-text');
    cardName.setAttribute('id', 'basic-addon2');

    cardRemove.append(minus.cloneNode());
    card.append(cardRemove);
    card.append(cardAmount);
    card.append(cardName);
    cardList.append(card);
}

function removeCard(id, name, sideboard=false) {
    const side = sideboard ? 'Side' : '';
    [...document.querySelector(`#cards${side}-` + id).children].forEach(function(card) {
        if(card.childNodes[2].innerText == name) {
            card.remove();
        }
    });
}

function addNewCards(id, sideboard=false) {
    const side = sideboard ? 'Side' : '';
    cards = document.querySelector(`#newCards${side}-` + id).value.trim().split('\n');
    leftover = '';
    if(cardData == null) {
        alert("The card data didn't finish loading");
        return;
    }
    cards.forEach(function(card) {
        const tmp = card.split(/ (.*)/s);
        let amount = parseInt(tmp[0]);
        let name = tmp[1];
        if('0' > card[0] || card[0] > '9') {
            amount = 1;
            name = card;
        }
        if(isNaN(amount) || !(name in cardData)) {
            leftover += card + '\n';
            return;
        }
        addCard(id, amount, name, sideboard);
    });
    document.querySelector(`#newCards${side}-` + id).value = leftover.trim();
}

function makeJSON() {
    const gauntlet = {};
    [...document.querySelector(`#decks`).children].forEach(function(deck) {
        let name = deck.firstChild.firstChild.childNodes[1].value.trim();
        if(name == "") {
            name = deck.firstChild.firstChild.childNodes[1].placeholder.trim();
        }
        const tmp = {
            mainboard: [],
            sideboard: []
        };
        for(let i = 0; i < BOARDS.length; ++i) {
            [...deck.childNodes[1].firstChild.firstChild.firstChild.childNodes[i]
                    .childNodes[1].children].forEach(function(card) {
                tmp[BOARDS[i]].push({
                    amount: card.childNodes[1].value,
                    name: card.childNodes[2].innerText
                });
            });
        }
        gauntlet[name] = tmp;
    });

    return gauntlet;
}

function downloadJSON(json, name='gauntlet') {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(
        new Blob([JSON.stringify(json)], {type:'application/json'})
    )
    a.download = name + '.json'
    a.click()
}

function importJSON(json) {
    [...document.querySelector('#decks').children].forEach((deck) => deck.remove());
    deckId = 0;
    Object.keys(json).forEach(function(deck) {
        const htmlDeck = addDeck();
        const id = deckId.toString().padStart(2, "0");
        htmlDeck.firstChild.firstChild.childNodes[1].value = deck;
        BOARDS.forEach((board) =>
            json[deck][board].forEach(function(card) {
                addCard(id, parseInt(card.amount), card.name, board == 'sideboard');
            })
        );
    });
}
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(_ => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
waitForElm('#getFile').then((fileSelector) => {
    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        fileList[0].text().then((response) => importJSON(JSON.parse(response)));
    });
});

function makeTitleCard(titles) {
    const card = document.createElement('div');
    card.classList.add('mtgCard');

    const table = document.createElement('table');

    for(let i = 0; i < titles.length; ++i) {
        const tbody = document.createElement('tbody');
        tbody.classList.add('mtgCard' + i);

        const title = document.createElement('tr');
        title.classList.add('mtgCardTitleRow');
        title.classList.add('mtgCard' + i);

        const _title = document.createElement('td');

        const name = document.createElement('span');
        name.classList.add('mtgCardTitle');
        name.innerText = titles[i];

        _title.append(name);
        title.append(_title);
        tbody.append(title);
        table.append(tbody);
    }

    card.append(table);

    return card;
}

function symbolPath(symbol) {
    return `<img src="${dataPath}/symbols/${symbol}.svg" width="10" height="10" />`;
}

function prettyText(cost) {
    cost = cost.replaceAll('{0}', symbolPath('mana-0'));
    cost = cost.replaceAll('{1}', symbolPath('mana-1'));
    cost = cost.replaceAll('{2}', symbolPath('mana-2'));
    cost = cost.replaceAll('{3}', symbolPath('mana-3'));
    cost = cost.replaceAll('{4}', symbolPath('mana-4'));
    cost = cost.replaceAll('{5}', symbolPath('mana-5'));
    cost = cost.replaceAll('{6}', symbolPath('mana-6'));
    cost = cost.replaceAll('{7}', symbolPath('mana-7'));
    cost = cost.replaceAll('{8}', symbolPath('mana-8'));
    cost = cost.replaceAll('{9}', symbolPath('mana-9'));
    cost = cost.replaceAll('{10}', symbolPath('mana-10'));
    cost = cost.replaceAll('{11}', symbolPath('mana-11'));
    cost = cost.replaceAll('{12}', symbolPath('mana-12'));
    cost = cost.replaceAll('{13}', symbolPath('mana-13'));
    cost = cost.replaceAll('{14}', symbolPath('mana-14'));
    cost = cost.replaceAll('{15}', symbolPath('mana-15'));
    cost = cost.replaceAll('{16}', symbolPath('mana-16'));
    cost = cost.replaceAll('{17}', symbolPath('mana-17'));
    cost = cost.replaceAll('{18}', symbolPath('mana-18'));
    cost = cost.replaceAll('{19}', symbolPath('mana-19'));
    cost = cost.replaceAll('{20}', symbolPath('mana-20'));
    cost = cost.replaceAll('{X}', symbolPath('mana-x'));
    cost = cost.replaceAll('{Y}', symbolPath('mana-y'));
    cost = cost.replaceAll('{Z}', symbolPath('mana-z'));
    cost = cost.replaceAll('{W}', symbolPath('mana-w'));
    cost = cost.replaceAll('{U}', symbolPath('mana-u'));
    cost = cost.replaceAll('{B}', symbolPath('mana-b'));
    cost = cost.replaceAll('{R}', symbolPath('mana-r'));
    cost = cost.replaceAll('{G}', symbolPath('mana-g'));
    cost = cost.replaceAll('{2/W}', symbolPath('mana-2w'));
    cost = cost.replaceAll('{2/U}', symbolPath('mana-2u'));
    cost = cost.replaceAll('{2/B}', symbolPath('mana-2b'));
    cost = cost.replaceAll('{2/R}', symbolPath('mana-2r'));
    cost = cost.replaceAll('{2/G}', symbolPath('mana-2g'));
    cost = cost.replaceAll('{W/P}', symbolPath('mana-pw'));
    cost = cost.replaceAll('{U/P}', symbolPath('mana-pu'));
    cost = cost.replaceAll('{B/P}', symbolPath('mana-pb'));
    cost = cost.replaceAll('{R/P}', symbolPath('mana-pr'));
    cost = cost.replaceAll('{G/P}', symbolPath('mana-pg'));
    cost = cost.replaceAll('{W/U}', symbolPath('mana-wu'));
    cost = cost.replaceAll('{W/B}', symbolPath('mana-wb'));
    cost = cost.replaceAll('{U/B}', symbolPath('mana-ub'));
    cost = cost.replaceAll('{U/R}', symbolPath('mana-ur'));
    cost = cost.replaceAll('{B/R}', symbolPath('mana-br'));
    cost = cost.replaceAll('{B/G}', symbolPath('mana-bg'));
    cost = cost.replaceAll('{R/W}', symbolPath('mana-rw'));
    cost = cost.replaceAll('{R/G}', symbolPath('mana-rg'));
    cost = cost.replaceAll('{G/W}', symbolPath('mana-gw'));
    cost = cost.replaceAll('{G/U}', symbolPath('mana-gu'));
    cost = cost.replaceAll('{T}', symbolPath('tap'));
    cost = cost.replaceAll('{Q}', symbolPath('untap'));
    cost = cost.replaceAll('{+1/+1}', symbolPath('counter-plus'));
    cost = cost.replaceAll('{-1/-1}', symbolPath('counter-minus'));
    cost = cost.replaceAll('{charge}', symbolPath('counter-charge'));
    cost = cost.replaceAll('{any}', symbolPath('mana-any'));
    return cost;
}

function shortenText(text) {
    // Remove reminder text
    text = text.replace(/\([^()]*\)/g, '');

    // Simple rules (stolen from https://github.com/mzabsky/gauntletprinter )
    const rules = [
        ["—", "-"],
        ["−", "-"],
        ["•", "&#9679;"],
        ["‘", "'"],
        ["less than or equal to", "<="],
        ["less than", "<"],
        ["greater than or equal to", ">="],
        ["greater than", ">"],
        [" plus ", " + "],
        ["equals to", "="],
        ["is equal to", "="],
        ["are equal to", "="],
        ["are each equal to", "="],
        ["equal to", "="],
        ["can't be 0", "&ne; 0"],
        ["\n", "; "],
        ["enters the battlefield", "ETB"],
        ["enter the battlefield", "ETB"],
        ["graveyard", "GY"],
        ["mana pool", "MP"],
        ["counters on it", "counters"],
        ["+1/+1 counters", "{+1/+1}"],
        ["+1/+1 counter", "{+1/+1}"],
        ["-1/-1 counters", "{-1/-1}"],
        ["-1/-1 counter", "{-1/-1}"],
        ["charge counters", "{charge}"],
        ["charge counter", "{charge}"],
        ["opponent", "opp"],
        ["damage", "dmg"],
        ["Target", "Tgt"],
        ["target", "tgt"],
        ["converted mana cost", "CMC"],
        ["mana value", "CMC"],
        ["end of turn", "EOT"],
        [" one ", " 1 "],
        [" two ", " 2 "],
        [" three ", " 3 "],
        [" four ", " 4 "],
        [" five ", " 5 "],
        [" six ", " 6 "],
        [" seven ", " 7 "],
        [" eight ", " 8 "],
        [" nine ", " 9 "],
        [" ten ", " 10 "],
        [" eleven ", " 11 "],
        [" twelve ", " 12 "],
        [" thirteen ", " 13 "],
        [" fourteen ", " 14 "],
        [" fiveteen ", " 15 "],
        [" sixteen ", " 16 "],
        [" seventeen ", " 17 "],
        [" eighteen ", " 18 "],
        [" nineteen ", " 19 "],
        [" twenty ", " 20 "],
        [" one.", " 1."],
        [" two.", " 2."],
        [" three.", " 3."],
        [" four.", " 4."],
        [" five.", " 5."],
        [" six.", " 6."],
        [" seven.", " 7."],
        [" eight.", " 8."],
        [" nine.", " 9."],
        [" ten.", " 10."],
        [" eleven.", " 11."],
        [" twelve.", " 12."],
        [" thirteen.", " 13."],
        [" fourteen.", " 14."],
        [" fiveteen.", " 15."],
        [" sixteen.", " 16."],
        [" seventeen.", " 17."],
        [" eighteen.", " 18."],
        [" nineteen.", " 19."],
        [" twenty.", " 20."],
        [" one,", " 1,"],
        [" two,", " 2,"],
        [" three,", " 3,"],
        [" four,", " 4,"],
        [" five,", " 5,"],
        [" six,", " 6,"],
        [" seven,", " 7,"],
        [" eight,", " 8,"],
        [" nine,", " 9,"],
        [" ten,", " 10,"],
        [" eleven,", " 11,"],
        [" twelve,", " 12,"],
        [" thirteen,", " 13,"],
        [" fourteen,", " 14,"],
        [" fiveteen,", " 15,"],
        [" sixteen,", " 16,"],
        [" seventeen,", " 17,"],
        [" eighteen,", " 18,"],
        [" nineteen,", " 19,"],
        [" twenty,", " 20,"],
        ["First", "1st"],
        ["first", "1st"],
        ["second", "2nd"],
        ["third", "3rd"],
        ["fourth", "4th"],
        [" times ", "&#215; "],
        [" times.", "&#215;."],
        ["1 mana of any color", "{any}"],
        ["mana of any color", "{any}"],
        ["Draw a card, then discard a card", "Loot"],
        ["draw a card, then discard a card", "loot"],
        ["may draw a card. If you do, discard a card", "may loot"],
        ["may discard a card. If you do, draw a card", "may rummage"],
        ["sacrificed creature", "victim"],
        ["Sacrifice", "Sac"],
        ["sacrificed", "saced"],
        ["sacrifice", "sac"],
        ["draw a card", "draw 1"],
        ["Draw a card", "Draw 1"],
        ["Discard a card", "Discard 1"],
        ["discard a card", "discard 1"],
        ["discards a card", "discards 1"],
        ["countered by spells or abilities", "countered"],
        ["Activate this ability only any time you could cast a sorcery.", "Sorcery speed."],
        ["Activate this ability", "Activate this"],
        ["shuffles his or her library", "shuffles"],
        ["shuffle your library", "shuffle"],
        ["Shuffle your library", "Shuffle"],
        ["Search your library", "Tutor"],
        ["search your library", "tutor"],
        ["search a library", "tutor"],
        ["search his or her library", "tutor"],
        ["At the beginning of your upkeep", "At your upkeep"],
        ["at the beginning of your upkeep", "at your upkeep"],
        ["At the beginning of each upkeep", "At each upkeep"],
        ["at the beginning of each upkeep", "at each upkeep"],
        ["At the beginning of each player's upkeep", "At each upkeep"],
        ["at the beginning of each player's upkeep", "at each upkeep"],
        ["upkeep", "UPK"],
        ["creature cards", "creatures"],
        ["creature card", "creature"],
        ["instant cards", "instants"],
        ["instant card", "instant"],
        ["sorcery cards", "sorceries"],
        ["sorcery card", "sorcery"],
        ["enchantment cards", "enchantments"],
        ["enchantment card", "enchantment"],
        ["artifact cards", "artifacts"],
        ["artifact card", "artifact"],
        ["planeswalker cards", "planeswalkers"],
        ["planeswalker card", "planeswalker"],
        ["land cards", "lands"],
        ["land card", "land"],
        ["nonland cards", "nonlands"],
        ["nonland card", "nonland"],
        ["basic land", "basic"],
        ["nonbasic land", "nonbasic"],
        ["creature spells", "creatures"],
        ["creature spell", "creature"],
        ["instant spells", "instants"],
        ["instant spell", "instant"],
        ["sorcery spells", "sorceries"],
        ["sorcery spell", "sorcery"],
        ["enchantment spells", "enchantments"],
        ["enchantment spell", "enchantment"],
        ["artifact spells", "artifacts"],
        ["artifact spell", "artifact"],
        ["planeswalker spells", "planeswalkers"],
        ["planeswalker spell", "planeswalker"],
        ["land spells", "lands"],
        ["land spell", "land"],
        ["nonland spells", "nonlands"],
        ["nonland spell", "nonland"],
        ["that card", "it"],
        ["onto the battlefield", "into play"],
        ["on the battlefield", "in play"],
        ["leaves the battlefield", "leaves play"],
        ["token", "tkn"],
        ["As an additional cost to cast ~", "As an additional cost"],
        ["his or her", "his"],
        ["power and toughness", "P/T"],
        [" power ", " P "],
        [" toughness ", " T "],
        [" ;", ";"],
        [/^;/g, ""],
        [/^ ;/g, ""],
        [".;", ";"],
        ["Soulbond; As long as ~ is paired with another creature, both creatures have ", "Soulbond - "],
        ["Soulbond; As long as ~ is paired with another creature, both creatures get ", "Soulbond - "],
        ["Soulbond; As long as ~ is paired with another creature, each of those creatures gets ", "Soulbond - "],
        ["Soulbond; As long as ~ is paired with another creature, each of those creatures has ", "Soulbond - "],

        // Ability words
        ["Ferocious - ", ""],
        ["you control a creature with P 4 or greater", "ferocious"],
        ["Battalion - Whenever ~ and at least two other creatures attack, ", "Battalion - "],
        ["Channel - ", ""],
        ["Chroma - ", ""],
        ["Constellation - Whenever ~ or another enchantment ETB under your control, ", "Constellation - "],
        ["Domain - ", ""],
        ["to the number of basic land types among lands you control", "your domain"],
        ["Fateful hour - If you have 5 or less life, ", "Fateful hour - "],
        ["Grandeur - Discard another card named ~: ", "Grandeur - "],
        ["Hellbent - ", ""],
        ["you have no cards in hand", "hellbent"],
        ["Heroic - Whenever you cast a spell that targets ~, ", "Heroic - "],
        ["Imprint - ", ""],
        ["Inspired - Whenever ~ becomes untapped, ", "Inspired - "],
        ["Join forces - ", ""],
        ["Kinship - At the beginning of your upkeep, you may look at the top card of your library. If it shares a creature type with ~, you may reveal it. If you do, ", "Kinship - "],
        ["Landfall - Whenever a land ETB under your control, ", "Landfall - "],
        ["Landfall - If you had a land ETB under your control this turn, ", "Landfall - "],
        ["Lieutenant - As long as you control your commander, ", "Lieutenant - "],
        ["Metalcraft - ", ""],
        ["you control 3 or more artifacts", "metalcraft"],
        ["Morbid - ", ""],
        ["a creature died this turn", "morbid"],
        ["Radiance - ", ""],
        ["Raid - When ~ ETB, if you attacked with a creature this turn, ", "Raid - "],
        ["Raid - If you attacked with a creature this turn, ", "Raid - "],
        ["Sweep - Return any number of .* you control to their owner's hand. ", "Sweep - "],
        ["Threshold - ", ""],
        ["7 or more cards are in your graveyard", "threshold"],
        ["Will of the council - ", ""],
        ["Rally - Whenever ~ or another Ally ETB under your control, ", "Rally - "],
        ["Spell mastery - If there are >= 2 instant and/or sorcery cards in your GY, ", "Spell mastery - "],
        ["Formidable - ", ""],
        ["Converge - ", ""],
    ];

    const allSubtypes = `Aura, Background, Cartouche, Class, Curse, Rune, Saga,
Shard, Shrine, Desert, Forest, Gate, Island, Lair, Locus, Mine, Mountain,
Plains, Power-Plant, Sphere, Swamp, Tower, Urza’s, Ajani, Aminatou, Angrath,
Arlinn, Ashiok, Bahamut, Basri, Bolas, Calix, Chandra, Comet, Dack, Dakkon,
Daretti, Davriel, Dihada, Domri, Dovin, Ellywick, Elminster, Elspeth, Estrid,
Freyalise, Garruk, Gideon, Grist, Huatli, Jace, Jared, Jaya, Jeska, Kaito, Karn,
Kasmina, Kaya, Kiora, Koth, Liliana, Lolth, Lukka, Minsc, Mordenkainen, Nahiri,
Narset, Niko, Nissa, Nixilis, Oko, Ral, Rowan, Saheeli, Samut, Sarkhan, Serra,
Sivitri, Sorin, Szat, Tamiyo, Tasha, Teferi, Teyo, Tezzeret, Tibalt, Tyvar,
Ugin, Urza, Venser, Vivien, Vraska, Will, Windgrace, Wrenn, Xenagos, Yanggu,
Yanling, Zariel, Adventure, Arcane, Lesson, Trap, Advisor, Aetherborn, Alien,
Ally, Angel, Antelope, Ape, Archer, Archon, Army, Artificer, Assassin, Assembly
Worker, Astartes, Atog, Aurochs, Avatar, Azra, Badger, Balloon, Barbarian, Bard,
Basilisk, Bat, Bear, Beast, Beeble, Beholder, Berserker, Bird, Blinkmoth, Boar,
Bringer, Brushwagg, Camarid, Camel, Caribou, Carrier, Cat, Centaur, Cephalid,
Child, Chimera, Citizen, Cleric, Clown, Cockatrice, Construct, Coward, Crab,
Crocodile, C’tan, Custodes, Cyclops, Dauthi, Demigod, Demon, Deserter, Devil,
Dinosaur, Djinn, Dog, Dragon, Drake, Dreadnought, Drone, Druid, Dryad, Dwarf,
Efreet, Egg, Elder, Eldrazi, Elemental, Elephant, Elf, Elk, Employee, Eye,
Faerie, Ferret, Fish, Flagbearer, Fox, Fractal, Frog, Fungus, Gamer, Gargoyle,
Germ, Giant, Gith, Gnoll, Gnome, Goat, Goblin, God, Golem, Gorgon, Graveborn,
Gremlin, Griffin, Guest, Hag, Halfling, Hamster, Harpy, Hellion, Hippo,
Hippogriff, Homarid, Homunculus, Horror, Horse, Human, Hydra, Hyena, Illusion,
Imp, Incarnation, Inkling, Inquisitor, Insect, Jackal, Jellyfish, Juggernaut,
Kavu, Kirin, Kithkin, Knight, Kobold, Kor, Kraken, Lamia, Lammasu, Leech,
Leviathan, Lhurgoyf, Licid, Lizard, Manticore, Masticore, Mercenary, Merfolk,
Metathran, Minion, Minotaur, Mite, Mole, Monger, Mongoose, Monk, Monkey,
Moonfolk, Mouse, Mutant, Myr, Mystic, Naga, Nautilus, Necron, Nephilim,
Nightmare, Nightstalker, Ninja, Noble, Noggle, Nomad, Nymph, Octopus, Ogre,
Ooze, Orb, Orc, Orgg, Otter, Ouphe, Ox, Oyster, Pangolin, Peasant, Pegasus,
Pentavite, Performer, Pest, Phelddagrif, Phoenix, Phyrexian, Pilot, Pincher,
Pirate, Plant, Praetor, Primarch, Prism, Processor, Rabbit, Raccoon, Ranger,
Rat, Rebel, Reflection, Rhino, Rigger, Robot, Rogue, Sable, Salamander, Samurai,
Sand, Saproling, Satyr, Scarecrow, Scion, Scorpion, Scout, Sculpture, Serf,
Serpent, Servo, Shade, Shaman, Shapeshifter, Shark, Sheep, Siren, Skeleton,
Slith, Sliver, Slug, Snake, Soldier, Soltari, Spawn, Specter, Spellshaper,
Sphinx, Spider, Spike, Spirit, Splinter, Sponge, Squid, Squirrel, Starfish,
Surrakar, Survivor, Tentacle, Tetravite, Thalakos, Thopter, Thrull, Tiefling,
Treefolk, Trilobite, Triskelavite, Troll, Turtle, Tyranid, Unicorn, Vampire,
Vedalken, Viashino, Volver, Wall, Walrus, Warlock, Warrior, Weird, Werewolf,
Whale, Wizard, Wolf, Wolverine, Wombat, Worm, Wraith, Wurm, Yeti, Zombie,
Zubera, Siege`.split(',').map((s) => s.trim());

    const advancedRules = [
        [/draw ([0-9]+|X) cards/g, 'draw $1'],
        [/Draw ([0-9]+|X) cards/g, 'Draw $1'],
        [/draws ([0-9]+|X) cards/g, 'draws $1'],
        [/discards ([0-9]+|X) cards/g, 'discards $1'],
        [/discard ([0-9]+|X) cards/g, 'discard $1'],
        [/Discard ([0-9]+|X) cards/g, 'Discard $1'],
        [/gain ([0-9]+|X) life/g, 'gain $1'],
        [/Gain ([0-9]+|X) life/g, 'Gain $1'],
        [/gains ([0-9]+|X) life/g, 'gains $1'],
        [/deals ([0-9]+|X) dmg/g, 'deals $1'],
        [/Lose ([0-9]+|X) life/g, 'Lose $1'],
        [/lose ([0-9]+|X) life/g, 'lose $1'],
        [/loses ([0-9]+|X) life/g, 'loses $1'],
        [/prevent the next ([0-9]+|X) dmg/g, 'prevent next $1'],
        [/Prevent the next ([0-9]+|X) dmg/g, 'Prevent next $1'],
        [/puts the top ([0-9]+|X) cards of his or her library into his or her graveyard/g, 'mills $1'],
        [/put the top ([0-9]+|X) cards of your library into your graveyard/g, 'mill $1'],
        [/reveals cards from the top of his or her library until he or she reveals ([0-9]+|X) land cards, then puts all cards revealed this way into his or her graveyard/g, 'grinds $1'],
        [/reveals cards from the top of his or her library until ([0-9]+|X) land cards are revealed. That player puts all cards revealed this way into his or her graveyard/g, 'grinds $1'],
        [/reveal cards from the top of your library until you reveal ([0-9]+|X) land cards, then put all cards revealed this way into your graveyard/g, 'grind $1'],
        [/Reveal cards from the top of your library until you reveal ([0-9]+|X) land cards, then put all cards revealed this way into your graveyard/g, 'Grind $1'],
        [/Return (.*?) to its owner's hand/g, 'Bounce $1'],
        [/return (.*?) to its owner's hand/g, 'bounce $1'],
        [/Bloodrush - (.*?), Discard [^;]+/g, 'Bloodrush $1'],
        [/Parley - Each player reveals the top card of his or her library. For each nonland card revealed this way, (.*?) Then each player draws a card./g, 'Parley - $1'],
        [/Strive - ~ costs (.*?) more to cast for each target beyond the 1st./g, 'Strive $1'],
        [/Tempting offer - ([^.]*?)\\..*/g, 'Tempting offer - $1. '],
        [/([0-9]+|X) or more/g, '>= $1'],
        [/([0-9]+|X) or less/g, '<= $1'],
        [/([0-9]+|X) or fewer/g, '<= $1'],
        [/up to ([0-9]+|X)/g, '<= $1'],
        [/more than ([0-9]+|X)/g, '> $1'],
        [/less than ([0-9]+|X)/g, '< $1'],
        [/Put tgt (\w* )permanent into its owner's library/g, 'Tuck tgt $1 permanent'],

        // These two rules need to be careful, because incorrect string could
        // be matched (eg. 'Draw cards equal to...')
        [/([A-Z]\w+) cards/g, (_, m) => allSubtypes.includes(m) ? m + 's' : m + ' cards'],
        [/([A-Z]\w+) card/g, (_, m) => allSubtypes.includes(m) ? m : m + ' card'],
    ];

    rules.forEach((rule) => text = text.replaceAll(rule[0], rule[1]));
    advancedRules.forEach((rule) => text = text.replace(rule[0], rule[1]));
    return text;
}

function cardToBody(card, deck) {
    const tbody = document.createElement('tbody');
    tbody.classList.add('mtgCard' + deck);

    const title = document.createElement('tr');
    title.classList.add('mtgCardNameRow');
    title.classList.add('mtgCard' + deck);

    const tp = document.createElement('tr');
    tp.classList.add('mtgCardTypeRow');
    tp.classList.add('mtgCard' + deck);

    const text = document.createElement('tr');
    text.classList.add('mtgCardText');
    text.classList.add('mtgCard' + deck);

    let firstSide = true;
    const nSides = card.length;
    let cardHasText = false;
    card.forEach(function(face) {
        const _title = document.createElement('td');

        const name = document.createElement('span');
        name.classList.add('mtgCardName');
        name.innerText = face.faceName ? face.faceName : face.name;

        const cost = document.createElement('span');
        cost.classList.add('manaCost');
        if(face.manaCost) {
            cost.innerHTML = prettyText(face.manaCost);
        }

        const _tp = document.createElement('td');

        const cardType = document.createElement('span');
        cardType.classList.add('mtgCardType');
        cardType.innerText = face.type;

        const pow = document.createElement('span');
        pow.classList.add('powerToughness');
        pow.innerText = face.loyalty ? face.loyalty : (
            face.defense ? face.defense : (
            face.power ? face.power + '/' + face.toughness : ''
        ));

        const _text = document.createElement('td');
        if(face.text) {
            _text.innerHTML = prettyText(shortenText(face.text));
            cardHasText |= _text.innerHTML != '';
        }

        if(nSides > 1 && firstSide) {
            _title.setAttribute('style', 'border-right: 1px dotted grey;');
            _tp.setAttribute('style', 'border-right: 1px dotted grey;');
            _text.setAttribute('style', 'border-right: 1px dotted grey;');
        }

        _title.append(name);
        _title.append(cost);
        _tp.append(cardType);
        _tp.append(pow);

        title.append(_title);
        tp.append(_tp);
        text.append(_text);

        firstSide = false;
    });

    tbody.append(title);
    tbody.append(tp);
    if(cardHasText) {
        tp.classList.add('borderBottom');
        tbody.append(text);
    }

    return tbody;
}

function makeCard(gauntlet, cards, sideboard=false) {
    const card = document.createElement('div');
    card.classList.add('mtgCard');
    if(sideboard) {
        card.classList.add('sideboard');
    }

    const table = document.createElement('table');

    // Only works with at most 2 sides
    const nSides = Math.max(...cards.map((card) => card[2]));

    for(let i = 0; i < cards.length; ++i) {
        const tbody = cards[i][1];
        if(nSides > 1 && cards[i][2] == 1) {
            [...tbody.querySelectorAll('td')].map((td) =>
                td.setAttribute('colspan', nSides)
            );
        }
        table.append(tbody);
    }

    card.append(table);
    gauntlet.append(card);

    let fontMult = 1.;
    while(table.offsetHeight >= card.offsetHeight-1 && fontMult > 0.5) {
        fontMult *= 0.95;
        table.style.fontSize = fontMult + 'em';
    }

    return card;
}

function bodyHeight(tbody) {
    const table = document.querySelector('.mtgCard table');
    tbody.style.visibility = 'none';
    table.append(tbody);
    const height = tbody.offsetHeight;
    table.removeChild(table.lastChild);
    tbody.style.visibility = '';
    return height;
}

function sortCards(asc=true) {
    let low = -1;
    let high = 1;
    if(!asc) {
        [low, high] = [high, low];
    }
    return function(x, y) {
        if(x[0] < y[0]) return low;
        if(x[0] > y[0]) return high;
        return 0;
    };
}

function genGauntlet() {
    const gauntlet = document.querySelector('#gauntlet');
    [...gauntlet.children].forEach((child) => child.remove());
    const decks = makeJSON();

    const deckNames = Object.keys(decks);
    gauntlet.append(makeTitleCard(deckNames));

    const allCards = {
        mainboard: [],
        sideboard: [],
    };
    const deckSizes = {};

    // TODO: merge identical cards in several decks
    for(let i = 0; i < deckNames.length; ++i) {
        deckSizes[deckNames[i]] = {
            mainboard: 0,
            sideboard: 0
        };
        BOARDS.forEach(function(board) {
            decks[deckNames[i]][board].forEach(function(card) {
                for(let j = 0; j < card.amount; ++j) {
                    const tbody = cardToBody(cardData[card.name], i);
                    allCards[board].push([
                        bodyHeight(tbody),
                        tbody,
                        cardData[card.name].length,
                        i
                    ]);
                }
                deckSizes[deckNames[i]][board] += parseInt(card.amount);
            });
        });
    }

    const maxSizes = {};
    const mtgCards = {}

    BOARDS.forEach(function(board) {
        maxSizes[board] = Math.max(...Object.values(deckSizes).map((x) => x[board]));
        mtgCards[board] = Array.from({length: maxSizes[board]}, _ =>
            Array(deckNames.length).fill([0])
        );

        // Greedy heuristic
        allCards[board].sort(sortCards(asc=false));
        allCards[board].forEach(function(card) {
            let best = Infinity;
            let bestI = -1;
            for(let i = 0; i < maxSizes[board]; ++i) {
                const x = mtgCards[board][i].map((x) => x[0]).reduce((a, b) => a + b);
                if(mtgCards[board][i][card[3]][0] == 0 && x < best) {
                    best = x;
                    bestI = i;
                }
            }
            mtgCards[board][bestI][card[3]] = card;
        });

        mtgCards[board].forEach((card) =>
            makeCard(gauntlet, card, board == 'sideboard')
        );
    });
}

function printGauntlet() {
    const gauntlet = document.querySelector('#gauntletContainer');
    const a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body>');
    a.document.write(gauntlet.innerHTML);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}

waitForElm('#decks').then(_ => {
    addDeck();
});

debug_gauntlet = JSON.parse(`{"UW Control":{"mainboard":[{"amount":"1","name":"Jace, the Mind Sculptor"},{"amount":"1","name":"Teferi, Hero of Dominaria"},{"amount":"2","name":"Supreme Verdict"},{"amount":"2","name":"Dress Down"},{"amount":"2","name":"Memory Deluge"},{"amount":"3","name":"Chalice of the Void"},{"amount":"4","name":"Teferi, Time Raveler"},{"amount":"4","name":"Prismatic Ending"},{"amount":"4","name":"Counterspell"},{"amount":"4","name":"Archmage's Charm"},{"amount":"4","name":"Leyline Binding"},{"amount":"4","name":"Solitude"},{"amount":"1","name":"Steam Vents"},{"amount":"1","name":"Castle Vantress"},{"amount":"1","name":"Raugrin Triome"},{"amount":"1","name":"Zagoth Triome"},{"amount":"1","name":"Hall of Storm Giants"},{"amount":"1","name":"Otawara, Soaring City"},{"amount":"2","name":"Hallowed Fountain"},{"amount":"2","name":"Plains"},{"amount":"2","name":"Mystic Gate"},{"amount":"2","name":"Polluted Delta"},{"amount":"3","name":"Scalding Tarn"},{"amount":"4","name":"Island"},{"amount":"4","name":"Flooded Strand"}],"sideboard":[{"amount":"1","name":"Kaheera, the Orphanguard"},{"amount":"2","name":"Dovin's Veto"},{"amount":"3","name":"Hallowed Moonlight"},{"amount":"2","name":"Wear // Tear"},{"amount":"2","name":"Rest in Peace"},{"amount":"2","name":"Flusterstorm"},{"amount":"1","name":"Celestial Purge"},{"amount":"2","name":"Dress Down"}]},"Creativity":{"mainboard":[{"amount":"4","name":"Fable of the Mirror-Breaker // Reflection of Kiki-Jiki"},{"amount":"3","name":"Bloodstained Mire"},{"amount":"3","name":"Wooded Foothills"},{"amount":"2","name":"Stomping Ground"},{"amount":"2","name":"Thoughtseize"},{"amount":"3","name":"Scalding Tarn"},{"amount":"2","name":"Inquisition of Kozilek"},{"amount":"3","name":"Lightning Bolt"},{"amount":"2","name":"Blood Crypt"},{"amount":"2","name":"Lightning Axe"},{"amount":"4","name":"Indomitable Creativity"},{"amount":"4","name":"Wrenn and Six"},{"amount":"4","name":"Dwarven Mine"},{"amount":"4","name":"Archon of Cruelty"},{"amount":"4","name":"Persist"},{"amount":"3","name":"Arid Mesa"},{"amount":"1","name":"Boseiju, Who Endures"},{"amount":"1","name":"Ziatora's Proving Ground"},{"amount":"1","name":"Mountain"},{"amount":"4","name":"Bitter Reunion"},{"amount":"2","name":"Wrenn and Realmbreaker"},{"amount":"2","name":"Invasion of Ergamon // Truga Cliffcharger"}],"sideboard":[{"amount":"1","name":"Boseiju, Who Endures"},{"amount":"2","name":"Nature's Claim"},{"amount":"1","name":"Emrakul, the Aeons Torn"},{"amount":"3","name":"Veil of Summer"},{"amount":"1","name":"Necromentia"},{"amount":"1","name":"Serra's Emissary"},{"amount":"2","name":"Strike It Rich"},{"amount":"1","name":"Turn the Earth"},{"amount":"1","name":"Hidetsugu Consumes All // Vessel of the All-Consuming"},{"amount":"1","name":"Sokenzan, Crucible of Defiance"},{"amount":"1","name":"Brotherhood's End"}]},"Cascade Crash":{"mainboard":[{"amount":"1","name":"Stomping Ground"},{"amount":"1","name":"Steam Vents"},{"amount":"2","name":"Gemstone Caverns"},{"amount":"4","name":"Violent Outburst"},{"amount":"4","name":"Scalding Tarn"},{"amount":"4","name":"Misty Rainforest"},{"amount":"1","name":"Breeding Pool"},{"amount":"4","name":"Wooded Foothills"},{"amount":"4","name":"Shardless Agent"},{"amount":"4","name":"Force of Negation"},{"amount":"4","name":"Crashing Footfalls"},{"amount":"2","name":"Fiery Islet"},{"amount":"4","name":"Mystical Dispute"},{"amount":"1","name":"Ketria Triome"},{"amount":"2","name":"Murktide Regent"},{"amount":"3","name":"Fury"},{"amount":"1","name":"Otawara, Soaring City"},{"amount":"2","name":"Island"},{"amount":"1","name":"Mountain"},{"amount":"1","name":"Forest"},{"amount":"4","name":"Fire // Ice"},{"amount":"4","name":"Dead // Gone"},{"amount":"2","name":"Brazen Borrower // Petty Theft"}],"sideboard":[{"amount":"1","name":"Fury"},{"amount":"3","name":"Blood Moon"},{"amount":"4","name":"Force of Vigor"},{"amount":"1","name":"Subtlety"},{"amount":"4","name":"Endurance"},{"amount":"1","name":"Boseiju, Who Endures"},{"amount":"1","name":"Brotherhood's End"}]},"Hammer Time":{"mainboard":[{"amount":"1","name":"Steelshaper's Gift"},{"amount":"3","name":"Springleaf Drum"},{"amount":"2","name":"Arid Mesa"},{"amount":"4","name":"Memnite"},{"amount":"3","name":"Inkmoth Nexus"},{"amount":"4","name":"Puresteel Paladin"},{"amount":"3","name":"Flooded Strand"},{"amount":"2","name":"Windswept Heath"},{"amount":"4","name":"Sigarda's Aid"},{"amount":"4","name":"Stoneforge Mystic"},{"amount":"1","name":"Hallowed Fountain"},{"amount":"4","name":"Colossus Hammer"},{"amount":"1","name":"Shadowspear"},{"amount":"4","name":"Esper Sentinel"},{"amount":"1","name":"Kaldra Compleat"},{"amount":"4","name":"Urza's Saga"},{"amount":"2","name":"Blacksmith's Skill"},{"amount":"3","name":"Giver of Runes"},{"amount":"3","name":"Spell Pierce"},{"amount":"4","name":"Plains"},{"amount":"3","name":"Seachrome Coast"}],"sideboard":[{"amount":"1","name":"Blacksmith's Skill"},{"amount":"1","name":"Relic of Progenitus"},{"amount":"1","name":"Containment Priest"},{"amount":"2","name":"Lavinia, Azorius Renegade"},{"amount":"3","name":"Prismatic Ending"},{"amount":"3","name":"Sanctifier en-Vec"},{"amount":"1","name":"Nettlecyst"},{"amount":"1","name":"Pithing Needle"},{"amount":"2","name":"March of Otherworldly Light"}]},"UR Aggro":{"mainboard":[{"amount":"2","name":"Prismatic Ending"},{"amount":"2","name":"Teferi, Time Raveler"},{"amount":"3","name":"Underworld Breach"},{"amount":"3","name":"Spell Pierce"},{"amount":"3","name":"Unholy Heat"},{"amount":"4","name":"Consider"},{"amount":"4","name":"Mishra's Bauble"},{"amount":"4","name":"Lightning Bolt"},{"amount":"4","name":"Expressive Iteration"},{"amount":"4","name":"Ragavan, Nimble Pilferer"},{"amount":"4","name":"Dragon's Rage Channeler"},{"amount":"4","name":"Ledger Shredder"},{"amount":"1","name":"Island"},{"amount":"1","name":"Sacred Foundry"},{"amount":"1","name":"Arid Mesa"},{"amount":"1","name":"Hallowed Fountain"},{"amount":"1","name":"Fiery Islet"},{"amount":"1","name":"Mountain"},{"amount":"3","name":"Spirebluff Canal"},{"amount":"3","name":"Flooded Strand"},{"amount":"3","name":"Steam Vents"},{"amount":"4","name":"Scalding Tarn"}],"sideboard":[{"amount":"2","name":"Unlicensed Hearse"},{"amount":"1","name":"Jegantha, the Wellspring"},{"amount":"2","name":"Flusterstorm"},{"amount":"2","name":"Hallowed Moonlight"},{"amount":"2","name":"Engineered Explosives"},{"amount":"1","name":"Blood Moon"},{"amount":"2","name":"Giant Killer // Chop Down"},{"amount":"3","name":"Wear // Tear"}]}}`);

let cardData = null;
fetch(`${dataPath}/AllCards.json`)
    .then((response) => response.json())
    .then(function(json) {
        cardData = json;
        const values = [];
        Object.keys(cardData).forEach(function(key) {
            values.push({
                key: key,
                value: key
            })
        });
        tribute = new Tribute({
            autocompleteMode: true,
            noMatchTemplate: "",
            menuShowMinLength: 3,
            values: values
        });
        tribute.attach(document.querySelectorAll("[id^='newCards-']"));
        tribute.attach(document.querySelectorAll("[id^='newCardsSide-']"));

        importJSON(debug_gauntlet);
        genGauntlet();
    });
