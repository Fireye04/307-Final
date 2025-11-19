/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

function getWeather(options = ["rainy", "windy", "sunny"]) {
    const roll = Math.floor(Math.random() * options.length + 0.5);

    return options[roll];
}
