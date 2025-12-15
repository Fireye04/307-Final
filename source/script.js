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
            this.condition = () => {return true;};
        } else {
            this.condition = condition;
        }
        if (runcompleted === null) {
            this.runcompleted = () => {};
        } else {
            this.runcompleted = runcompleted;
        }
        this.used = false;

        // what the fuck javascript
        this.available = () => {return this.condition() && this.used === false;}
        this.onCompleted = () => {
            this.used = true;
            this.runcompleted()
        }

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

let tut_campfire = new thingAtCamp("campfire", "The coals of last night's [[campfire|start-campfire]] lay blackened in the camp's fire pit.", "The blackened coals of last night's [[campfire|start-campfire]] lay pooled in the shallow recess of the fire pit.")
let tut_tent = new thingAtCamp("tent", "The [[tent|start-tent]] stands stout in the sunlight, a little worse for wear.", "The [[tent|start-tent]] sags slightly weighted down by the previous night's downpour.")
let tut_pack = new thingAtCamp("pack", "The [[supply pack|start-pack]] lays in the shade of a nearby tree.", "The moist [[supply pack|start-pack]] lays in a stray puddle below a nearby tree")
let tut_neal = new thingAtCamp("neal", "[[Neal|start-neal]] stands where he was left the night before calmly cropping a sunny patch of grass.", "[[Neal|start-neal]] stands below a tree, shuddering slightly as a drip of water falls from the tree onto his neck.")

let morn_campfire = new thingAtCamp("campfire", "The coals of last night's [[campfire|morning-campfire]] lay blackened in the camp's fire pit.", "The blackened coals of last night's [[morning-campfire]] lay pooled in the shallow recess of the fire pit.")
let morn_tent = new thingAtCamp("tent", "The [[tent|morning-tent]] stands stout in the sunlight, a little worse for wear.", "The [[tent|morning-tent]] sags slightly weighted down by the previous night's downpour.")
let morn_pack = new thingAtCamp("pack", "The [[supply pack|morning-pack]] lays in the shade of a nearby tree.", "The moist [[supply pack|morning-pack]] lays in a stray puddle below a nearby tree")
let morn_neal = new thingAtCamp("neal", "[[Neal|morning-neal]] stands where he was left the night before calmly cropping a sunny patch of grass.", "[[Neal|morning-neal]] stands below a tree, shuddering slightly as a drip of water falls from the tree onto his neck.")

let eve_campfire = new thingAtCamp("campfire", "Gather wood & [[light fire|evening-campfire]]")
let eve_tent = new thingAtCamp("tent", "Set up [[tent|evening-tent]]")
let eve_pack = new thingAtCamp("pack", "Unpack [[supply pack|evening-pack]]")
let eve_neal = new thingAtCamp("neal", "Feed [[Neal|start-neal]]")


var thingsAtCampTutorial = [tut_campfire, tut_tent, tut_pack, tut_neal];
var thingsAtCampMorning = [morn_campfire, morn_tent, morn_pack, morn_neal];
var thingsAtCampEvening = [eve_campfire, eve_tent, eve_pack, eve_neal];

function setTAC(things) {
    if (things === "tutorial") {
        variables().thingsAtCamp = thingsAtCampTutorial;

    }else if (things === "morning") {
        variables().thingsAtCamp = thingsAtCampMorning;

    }else if (things === "evening") {
        variables().thingsAtCamp = thingsAtCampEvening;

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

window.setTAC = (things = "morning") => setTAC(things);
window.removeFromCamp = (thing = "") => removeFromCamp(thing);


/********ENCOUNTERS********/

const search_party = new encounter("search-party", 1, () => {return true}, () => {});
const search_party2 = new encounter("search-party2",3, () => { return hasVisited("search-party")}, () => {});

const encountersDefault = [search_party, search_party2];

function setEncounters() {
    variables().encounters = encountersDefault;
}

// TODO: add weight by priority
function selectEncounter() {
    let temp = [];
        console.log(variables().encounters);
    for (let i = 0; i < variables().encounters.length; i++) {
        let cur = variables().encounters[i];
        console.log(cur.available());
        if (cur.available()) {
        console.log(cur.name);
            temp.push(cur);
        }
    }
    let index = Math.floor(Math.random() * temp.length);
        console.log(index);
        console.log(temp);
    let target = temp[index];
        console.log(target.name);
    variables().currentEncounter = target;
}

window.setEncounters = () => setEncounters();

window.selectEncounter = () => selectEncounter();

