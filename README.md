# A Magic the Gathering Gauntler editor/printer

An HTML/Javascript tool to make and print an MtG Gauntlet based on [mzabsky/GauntletPrinter](https://github.com/mzabsky/gauntletprinter).

A fully functional (hopefully) live version is available on [my site](https://aku.ren/mtg/gauntlet).

![Gauntlet Example](https://github.com/Akulen/MtGGauntlet/blob/master/example.jpg?raw=true)

## Features

- Create a print-ready HTML gauntlet (print to PDF to get a PDF version)
- Export/Import your gauntlets as JSON files
- Sideboard cards are printed on separate set of cards and visibly marked to be easily recognizable
- A title card with the deck names
- Rules text shortening engine, which compacts the card text without significantly impacting its clarity, stolen and updated from [mzabsky/GauntletPrinter](https://github.com/mzabsky/gauntletprinter)
- Handles 2-sided cards! (6-sided cards might not work well)
- Adjusts font size to make the text fit in the card. Should be able to handle rendering 5 decks in one gauntlet
- Card name autocompletion to deck editor (with fuzzy matching, so no need to type the spaces in the card names for the autocompletion to find it)

## Planned Features

- Import decklists from MtGTop8, and MtGGoldfish
- Merging common cards between decks to save on space and clarity
- Display card images in small somewhere (?)
- Configuration options, such as:
  - Toggling the back side of each double-faced card individually
  - Manual font-size edition
  - Enabling/Disabling rules from the shortening engine
  - Deck colors
  - Hide card text to save even more space

## How to install

This tool is relatively simple to setup, as it is only an HTML/Javascript page. A setup example can be seen in `index.html`.

The file `AllCards.json` must be generated before the tool can be used, and everytime new cards are added to the game, using the following python code:

```python
request = 'https://mtgjson.com/api/v5/AtomicCards.json'
resp = requests.get(request).json()['data']
if len(resp) == 0:
    raise ErrorNotFound(request)
data = {}
for card_name, card in resp.items():
    data[card_name] = []
    for side in card:
        data[card_name].append({})
        for key in ['name', 'faceName', 'manaCost', 'text', 'supertypes', 'types', 'subtypes', 'type', 'colorIdentity', 'power', 'toughness', 'loyalty', 'defense']:
            if key in side:
                data[card_name][-1][key] = side[key]
with open(dataPath, 'w') as f:
    json.dump(data, f)
```

Finally, update the submodules to download Tribute:

```bash
git submodule init
git submodule update
```
