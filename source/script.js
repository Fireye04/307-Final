/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

/********GLOBALS********/
window.endureCount = 0;
window.currentWeather = "sunny";
window.thingsAtCamp = [];

/********STRUCTS********/
class thingAtCamp {
    constructor(itemName, enduredRainyDesc, enduredSunnyDesc, rainyDesc, sunnyDesc) {
        this.name = itemName;
        this.rainyDesc = rainyDesc;
        this.sunnyDesc = sunnyDesc;
        this.enduredRainyDesc = enduredRainyDesc;
        this.enduredSunnyDesc = enduredSunnyDesc;
    }

    constructor(itemName, desc) {
        this.name = itemName;
        this.rainyDesc = desc;
        this.sunnyDesc = desc;
        this.enduredRainyDesc = desc;
        this.enduredSunnyDesc = desc;
    }

    getDescription(weather, endured){
        if (weather === "sunny" && endured === true) {
            return this.enduredSunnyDesc;

        } else if (weather === "rainy" && endured === true) {
            return this.enduredRainyDesc;

        } else if (weather === "sunny" && endured === false) {
            return this.sunnyDesc;

        } else if (weather === "rainy" && endured === false) {
            return this.rainyDesc;

        } else {
            return "The traveller glares up at the sky and shakes their fist cursing some unknown god for their shitty programming. (something went wrong and this is an error message, if you're a kind citizen, you can report this at https://github.com/Fireye04/306-Final/issues/new please bring screenshots!)"
        }

    }
}



/********WEATHER********/
function newWeather(options) {
    const roll = Math.floor(Math.random() * (options.length-1) + 0.5);

    window.currentWeather = options[roll];
}
window.newWeather = (options = ["rainy", "sunny"]) => newWeather(options);


/********THINGS AT CAMP********/

let campfire = new thingAtCamp("campfire", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.")

var thingsAtCampDefault = [campfire];

function setThingsAtCamp(things, noDefaults) {
    if (noDefaults){
    window.thingsAtCamp = things;

    } else {
        window.thingsAtCamp = thingsAtCampDefault;
        window.thingsAtCamp.concat(things);
    }
}

window.setThingsAtCamp = (things = thingsAtCampDefault, noDefaults = false) => setThingsAtCamp(things, noDefaults);

