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
            return "The traveller glares up at the sky and shakes their fist cursing some unknown god for their shitty programming. (something went wrong and this is an error message, if you're a kind citizen, you can report this at https://github.com/Fireye04/307-Final/issues/new please bring screenshots!)"
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

class tidbit {
    constructor(object, text, expanded) {
        this.object = object;
        this.text = text;
        this.expanded = expanded;
    }

    getDescription(){
        return "<<linkreplace \"<u>" + this.text + "</u>\">><u>" + this.expanded + "</u><<timed 1s>><<set $tidbitCount += 1>><<if $tidbitCount gte $tidbitCap>><<set $returnAddress to $currentCamp>><<goto \"run-backstory\">><</if>><</timed>><</linkreplace>>";
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

let eve_campfire = new thingAtCamp("campfire", "Gather wood & [[light fire|end-campfire]]")
let eve_tent = new thingAtCamp("tent", "Set up [[tent|end-tent]]")
let eve_pack = new thingAtCamp("pack", "Unpack [[supply pack|end-pack]]")
let eve_neal = new thingAtCamp("neal", "Feed [[Neal|end-neal]]")


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

const deadguy= new encounter("dead-guy", 1, () => {return true}, () => {});
const search_party = new encounter("search-party", 1, () => {return true}, () => {});
const search_party2 = new encounter("search-party2",3, () => { return hasVisited("search-party")}, () => {});
const bison = new encounter("bison", 1, () => {return true}, () => {});
const couple = new encounter("couple",1, () => { return true}, () => {});
const fallback = new encounter("fallback",1, () => { return true}, () => {});

const encountersDefault = [bison, couple, deadguy];

function setEncounters() {
    variables().encounters = encountersDefault;
}

// TODO: add weight by priority
function selectEncounter() {
    let temp = [];
    if (variables().encounters.length > 2) {
        temp = [fallback, fallback];
    } else {
        temp = [fallback];
    }
    for (let i = 0; i < variables().encounters.length; i++) {
        let cur = variables().encounters[i];
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


/********TIDBITS********/

function setTidbits() {
    variables().tidbits = [
        new tidbit("campfire", "Fala sits by the campfire pondering the flames", "She was a kind woman. \nThe wanderer remembers the way she used to ponder the world's questions by the fire. \nShe was more a philosipher than the stuck up suits they saw in the larger towns."),
        new tidbit("campfire", "Mac sits by the camfire, feeding Havan.", "He had objected to Havan's addition at first, not a fan of birds to start.\nThe two, of course, became fast friends. \nHe chuckles as the bird loses a seed to the ground, and hops down to search for it."),
        new tidbit("tent", "Mac studies the shabby tent.", "\"That damn kid needs ta take care of their shit.\" He mutters to himself, stroking his beard. \n\"Sewing lessons. Tomorrow,\" He decides, nodding."),
        new tidbit("tent", "Fala stands by her and Mac's tent.", "She glances around nervously before snapping twice. \nHavan hops out of a nearby bush. \n\"Good boy\" she whispers, feeding him a treat and ushering the bird into the tent. \nNearby Mac gives a slight chuckle. \nHe enjoyed sleeping without Havan, but clearly enjoyed watching Fala break the rules for once even more."),
        new tidbit("pack", "Mac rummages through his pack.", "\"Where's that damn pepper?\" \nFala walks over and hands him a small wooden box. \"We're running low\" \n\n\"Aye. Well wasn't there a good patch back south somewhere?\" \n\n\"Yes, good memory.\" She replies with a smile."),
        new tidbit("pack", "Mac draws his ladle from his pack", "\"Soup time!\" He announces with glee, practically skipping his way over to his already bubbling cauldron."),
        new tidbit("pack", "Fala sits by her pack fiddling with a tool of some sort.", "She seems to be fashioning arrow shafts with a whittling knife. \nShe works with practiced precision, careful not to remove too much material, while keeping the shaft as uniform as she can."),
        new tidbit("neal", "Fala stands by her horse.", "Its name was Nodin.\nShe brushes his flank with care. \nNodin reaches for a patch of grass juuuust out of reach. \nFala bends down, grabbing it with one hand feeding it to the horse, while continuing her rhythmic brushing motion."),
        new tidbit("neal", "Mac stands directly in front of Neal", "He holds neal's head in his hands, staring directly into neal's eyes, their heads almost touching.\n Neal stares back, unblinking.\n\"You're\"\n\"A\"\n\"Good\"\n\"Horse,\" the man enumerates."),
        new tidbit("neal", "Fala seems to be laying into mac as he pets Neal", "\"Can we at least agree that the child needs actual consequenses to their actions?\" \nMac covers the horse's ears \n\"Oyoyoy, we can't be arguing in front of the horse, thinka the poor little guy havin' nightmares\" \nNeal's inquisitive eyes look up at mac, confused.\n Fala gives a smirk and a little chuckle, punching mac's shoulder. \n\"Goof.\""),
    ];
}
window.setTidbits = () => setTidbits();

