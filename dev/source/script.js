/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

/********GLOBALS********/
window.endureCount = 0;


/********STRUCTS********/
class thingAtCamp {
    constructor(itemName, enduredRainyDesc, enduredSunnyDesc, rainyDesc, sunnyDesc) {
        this.name = itemName;
        this.rainyDesc = rainyDesc;
        this.sunnyDesc = sunnyDesc;
        this.enduredRainyDesc = enduredRainyDesc;
        this.enduredSunnyDesc = enduredSunnyDesc;
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
function getWeather(options) {
    const roll = Math.floor(Math.random() * (options.length-1) + 0.5);

    console.log(roll);
    return options[roll];
}
window.getWeather = (options = ["rainy", "sunny"]) => getWeather(options);


/********THINGS AT CAMP********/

let campfire = thingAtCamp("campfire", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.", "The coals of last night's [[campfire]] lay blackened in the camp's fire pit.")

var thingsAtCampDefault = [campfire];
var thingsAtCamp = [];

function setThingsAtCamp(things, noDefaults) {
    if (noDefaults){
    thingsAtCamp = things;

    } else {
        thingsAtCamp = thingsAtCampDefault;
        thingsAtCamp.concat(things);
    }
}

window.setThingsAtCamp = (things = thingsAtCampDefault, noDefaults = false) => setThingsAtCamp(things, noDefaults);
