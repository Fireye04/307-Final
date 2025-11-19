/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

function getWeather(options = ["rainy", "sunny"]) {
    const roll = Math.floor(Math.random() * (options.length-1) + 0.5);

    console.log(roll);
    return options[roll];
}

window.getWeather = (options = ["rainy", "sunny"]) => getWeather(options);
