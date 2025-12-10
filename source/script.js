/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/



/********STRUCTS********/
class thingAtCamp {
    constructor(itemName, enduredRainyDesc, enduredSunnyDesc = null, rainyDesc = null, sunnyDesc = null) {
        this.name = itemName;
        this.enduredRainyDesc = enduredRainyDesc;
        this.enduredSunnyDesc = enduredSunnyDesc ?? enduredRainyDesc;
        this.rainyDesc = rainyDesc ?? enduredRainyDesc;
        this.sunnyDesc = (sunnyDesc ?? enduredSunnyDesc) ?? enduredRainyDesc;
    }

    getDescription(){
        if (variables().currentWeather === "sunny" && variables().enduring === true) {
            return this.enduredSunnyDesc;

        } else if (variables().currentWeather === "rainy" && variables().enduring === true) {
            return this.enduredRainyDesc;

        } else if (variables().currentWeather === "sunny" && variables().enduring === false) {
            return this.sunnyDesc;

        } else if (variables().currentWeather === "rainy" && variables().enduring === false) {
            return this.rainyDesc;

        } else {
            return "The traveller glares up at the sky and shakes their fist cursing some unknown god for their shitty programming. (something went wrong and this is an error message, if you're a kind citizen, you can report this at https://github.com/Fireye04/306-Final/issues/new please bring screenshots!)"
        }
    }
}

class encounter {
    constructor(itemName, priority = 1, condition = null, runcompleted = null) {
        this.name = itemName;
        this.priority = priority;
        if (condition === null) {
            this.condition = () => {true};
        } else {
            this.condition = condition;
        }
        if (runcompleted === null) {
            this.runcompleted = () => {};
        } else {
            this.runcompleted = runcompleted;
        }
        this.used = false;

    }

    available() {
        return this.condition() && this.used === false;
    }

    onCompleted() {
        this.used = true;
        this.runcompleted()
    }
}


/********ENDURING********/

function setIsEnduring(choice) {
    variables().enduring = choice;
    if (choice) {
        variables().endureCount ++;
    }
}

window.setIsEnduring = (choice) => setIsEnduring(choice);


/********WEATHER********/

function newWeather(options) {
    const roll = Math.floor(Math.random() * (options.length-1) + 0.5);

    variables().currentWeather = options[roll];
}
window.newWeather = (options = ["rainy", "sunny"]) => newWeather(options);


/********THINGS AT CAMP********/

let campfire = new thingAtCamp("campfire", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.", "The blackened coals of last night's [[campfire]] lay pooled in the shallow recess of the fire pit.")
let tent = new thingAtCamp("tent", "The [[tent]] stands stout in the sunlight, a little worse for wear.", "The [[tent]] sags slightly weighted down by the previous night's downpour.")
let pack = new thingAtCamp("pack", "The [[supply pack|pack]] lays in the shade of a nearby tree.", "The moist [[supply pack|pack]] lays in a stray puddle below a nearby tree")
let neal = new thingAtCamp("neal", "[[Neal|neal]] stands where he was left the night before calmly cropping a sunny patch of grass.", "[[Neal|neal]] stands below a tree, shuddering slightly as a drip of water falls from the tree onto his neck.")

var thingsAtCampDefault = [campfire, tent, pack, neal];

function setTAC(things, noDefaults) {
    if (noDefaults) {
        variables().thingsAtCamp = things;

    } else {
        variables().thingsAtCamp = thingsAtCampDefault;
        variables().thingsAtCamp.concat(things);
    }
}

function removeFromCamp(thing) {
    for (let i = 0; i < variables().thingsAtCamp.length; i++) {
        if (variables().thingsAtCamp[i].name === thing) {
            variables().thingsAtCamp.splice(i, 1);
            break;
        }
    }
}

window.setTAC = (things = thingsAtCampDefault, noDefaults = false) => setTAC(things, noDefaults);
window.removeFromCamp = (thing = "") => removeFromCamp(thing);


/********ENCOUNTERS********/

let search_party = new encounter("search-party", 1, () => {true}, () => {});
let search_party2 = new encounter("search-party2",3, () => { false /*hasVisited("search-party")*/}, () => {});

var encountersDefault = [search_party, search_party2];

function setEncounters() {
    variables().encounters = encountersDefault;
}

function selectEncounter() {
    let temp = [];
    for (let i = 0; i < variables().encounters.length-1; i++) {
        let cur = variables().encounters[i];
        console.log(cur.name);
        if (cur.available()) {
            temp.push(cur);
        }
    }
    let index = Math.floor(Math.random() * temp.length);
    let target = temp[index];
    variables().currentEncounter = target;
}

window.setEncounters = () => setEncounters();

window.selectEncounter = () => selectEncounter();

