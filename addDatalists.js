export function addPortraitsDatalist () {
    // * add drop-down menu to select character for portrait option
    const selectPortraitElement = document.createElement("select");
    selectPortraitElement.classList.add("portrait");

    const vanillaCharacters = [
        "Abigail",
        "Alex",
        "Caroline",
        "Clint",
        "Demetrius",
        "Elliott",
        "Emily",
        "Evelyn",
        "George",
        "Gunther",
        "Gus",
        "Haley",
        "Harvey",
        "Jas",
        "Jodi",
        "Kent",
        "Leah",
        "Lewis",
        "Linus",
        "Marlon",
        "Marnie",
        "Maru",
        "Pam",
        "Penny",
        "Pierre",
        "Robin",
        "Sam",
        "Sandy",
        "Sebastian",
        "Shane",
        "Vincent",
        "Willy",
        "Wizard"
    ]

    const portraitOptions = document.createElement("datalist");
    portraitOptions.id = "portraitoptions";
    vanillaCharacters.forEach(character => {
        const characterOption = document.createElement("option");
        characterOption.value = character;
        characterOption.innerHTML = character;
        portraitOptions.appendChild(characterOption);
    })
    document.getElementById("configoptions").after(portraitOptions);
}

export function addAnimalsDatalist () {
    // * add drop-down menu to select animal
    const selectAnimalElement = document.createElement("select");
    selectAnimalElement.classList.add("portrait");

    const vanillaAnimals = [
        "BabyBlue Chicken",
        "Blue Chicken",
        "BabyBrown Chicken",
        "Brown Chicken",
        "BabyGolden Chicken",
        "Golden Chicken",
        "BabyVoid Chicken",
        "Void Chicken",
        "BabyWhite Chicken",
        "White Chicken",
        "Dinosaur",
        "Duck",
        "BabyRabbit",
        "Rabbit",
        "BabyBrown Cow",
        "Brown Cow",
        "BabyWhite Cow",
        "White Cow",
        "BabyGoat",
        "Goat",
        "BabyOstrich",
        "Ostrich",
        "BabyPig",
        "Pig",
        "BabySheep",
        "Sheep",
        "ShearedSheep",
        "horse",
        "cat",
        "cat1",
        "cat2",
        "dog",
        "dog1",
        "dog2"
    ]

    const animalOptions = document.createElement("datalist");
    animalOptions.id = "animaloptions";
    vanillaAnimals.forEach(animal => {
        const animalOption = document.createElement("option");
        animalOption.value = animal;
        animalOption.innerHTML = animal;
        animalOptions.appendChild(animalOption);
    })
    document.getElementById("configoptions").after(animalOptions);
}

export function addBuildingsDatalist () {
    // * add drop-down menu to select building
    const selectBuildingElement = document.createElement("select");
    selectBuildingElement.classList.add("building");

    const vanillaBuildings = [
        "Barn",
        "Big Barn",
        "Deluxe Barn",
        "Deluxe Barn_PaintMask",
        "Coop",
        "Big Coop",
        "Deluxe Coop",
        "Deluxe Coop_PaintMask",
        "Shed",
        "Big Shed",
        "Big Shed_PaintMask",
        "Stable",
        "Stable_PaintMask",
        "houses",
        "houses_PaintMask",
        "Fish Pond",
        "Gold Clock",
        "Greenhouse",
        "Junimo Hut",
        "Log Cabin",
        "Log Cabin_PaintMask",
        "Plank Cabin",
        "Plank Cabin_PaintMask",
        "Stone Cabin",
        "Stone Cabin_PaintMask",
        "Mill",
        "Shipping Bin",
        "Silo",
        "Slime Hutch",
        "Well",
        "Desert Obelisk",
        "Earth Obelisk",
        "Island Obelisk",
        "Water Obelisk",
    ]

    const buildingOptions = document.createElement("datalist");
    buildingOptions.id = "buildingoptions";
    vanillaBuildings.forEach(building => {
        const buildingOption = document.createElement("option");
        buildingOption.value = building;
        buildingOption.innerHTML = building;
        buildingOptions.appendChild(buildingOption);
    })
    document.getElementById("configoptions").after(buildingOptions);
}

export function addDaysOfWeekDatalist () {
    // * add drop-down menu to select days of week for config option
    const selectDaysOfWeekElement = document.createElement("select");
    selectDaysOfWeekElement.classList.add("daysofweek");

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const daysOfWeekOptions = document.createElement("datalist");
    daysOfWeekOptions.id = "daysofweekoptions";
    daysOfWeek.forEach(day => {
        const dayOfWeekOption = document.createElement("option");
        dayOfWeekOption.value = day;
        dayOfWeekOption.innerHTML = day;
        daysOfWeekOptions.appendChild(dayOfWeekOption);
    })
    document.getElementById("configoptions").after(daysOfWeekOptions);
}