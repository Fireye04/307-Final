/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

/********GLOBALS********/
sessionStorage.endureCount = 0;
sessionStorage.enduring = false;
sessionStorage.currentWeather = "sunny";
sessionStorage.thingsAtCamp = [];


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
        if (sessionStorage.currentWeather === "sunny" && sessionStorage.enduring === true) {
            return this.enduredSunnyDesc;

        } else if (sessionStorage.currentWeather === "rainy" && sessionStorage.enduring === true) {
            return this.enduredRainyDesc;

        } else if (sessionStorage.currentWeather === "sunny" && sessionStorage.enduring === false) {
            return this.sunnyDesc;

        } else if (sessionStorage.currentWeather === "rainy" && sessionStorage.enduring === false) {
            return this.rainyDesc;

        } else {
            return "The traveller glares up at the sky and shakes their fist cursing some unknown god for their shitty programming. (something went wrong and this is an error message, if you're a kind citizen, you can report this at https://github.com/Fireye04/306-Final/issues/new please bring screenshots!)"
        }
    }
}


/********ENDURING********/

function setIsEnduring(choice) {
    sessionStorage.enduring = choice;
    if (choice) {
        sessionStorage.endureCount ++;
    }
}

window.setIsEnduring = (choice) => setIsEnduring(choice);


/********WEATHER********/

function newWeather(options) {
    const roll = Math.floor(Math.random() * (options.length-1) + 0.5);

    sessionStorage.currentWeather = options[roll];
}
window.newWeather = (options = ["rainy", "sunny"]) => newWeather(options);


/********THINGS AT CAMP********/

let campfire = new thingAtCamp("campfire", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.", "The blackened coals of last night's [[campfire]] lay pooled in the shallow recess of the fire pit.")
let tent = new thingAtCamp("tent", "The [[tent]] stands stout in the sunlight, a little worse for wear.", "The [[tent]] sags slightly weighted down by the previous night's downpour.")
let pack = new thingAtCamp("pack", "The [[supply pack|pack]] lays in the shade of a nearby tree.", "The moist [[supply pack]] lays in a stray puddle below a nearby tree")
let neal = new thingAtCamp("neal", "[[Neal|neal]] stands where he was left the night before calmly cropping a sunny patch of grass.", "[[Neal]] stands below a tree, shuddering slightly as a drip of water falls from the tree onto his neck.")

var thingsAtCampDefault = [campfire, tent, pack, neal];

function setTAC(things, noDefaults) {
    if (noDefaults) {
        sessionStorage.thingsAtCamp = things;

    } else {
        sessionStorage.thingsAtCamp = thingsAtCampDefault;
        sessionStorage.thingsAtCamp.concat(things);
    }
}

function removeFromCamp(thing) {
    for (let i = 0; i < sessionStorage.thingsAtCamp.length; i++) {
        if (sessionStorage.thingsAtCamp[i].name === thing) {
            sessionStorage.thingsAtCamp.splice(i, 1);
            break;
        }
    }
}

window.setTAC = (things = thingsAtCampDefault, noDefaults = false) => setTAC(things, noDefaults);
window.removeFromCamp = (thing = "") => removeFromCamp(thing);

