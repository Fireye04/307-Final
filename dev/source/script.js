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
    constructor(itemName, rainyDesc, sunnyDesc, enduredRainyDesc, enduredSunnyDesc) {
        this.name = itemName;
        this.rainyDesc = rainyDesc;
        this.sunnyDesc = sunnyDesc;
        this.enduredRainyDesc = enduredRainyDesc;
        this.enduredSunnyDesc = enduredSunnyDesc;
    }
    getDescription(weather, endured){

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
var thingsAtCampDefault = ["campfire", ""];
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
