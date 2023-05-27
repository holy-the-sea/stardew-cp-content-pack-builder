function addPortraitsDatalist () {
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

function addAnimalsDatalist () {
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

function addBuildingsDatalist () {
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

function addCraftablesDatalist() {
    // * add drop-down menu to select springobject item
    const selectItemElement = document.createElement("select");
    selectItemElement.classList.add("item");

    const craftableOptions = document.createElement("datalist");
    craftableOptions.id = "craftableoptions";

    let craftableCoordinates = Object();
    fetch(
        'https://raw.githubusercontent.com/holy-the-sea/CP2AT/main/src/coords_info/craftable_coords.json')
        .then(response => response.json())
        .then(data => {
            Object.entries(data).forEach(item => {
                let itemOption = document.createElement("option");
                itemOption.value = item[0];
                itemOption.innerHTML = item[0];
                craftableOptions.appendChild(itemOption);
                craftableCoordinates[item[0]] = item[1];
            })
        })

    document.getElementById("configoptions").after(craftableOptions);
    return craftableCoordinates;
}

function addSpringobjectsDatalist() {
    // * add drop-down menu to select springobject item
    const selectItemElement = document.createElement("select");
    selectItemElement.classList.add("item");

    const itemOptions = document.createElement("datalist");
    itemOptions.id = "itemoptions";

    let springobjectCoordinates = Object();
    fetch(
        'https://raw.githubusercontent.com/holy-the-sea/CP2AT/main/src/coords_info/springobjects_coords.json')
        .then(response => response.json())
        .then(data => {
            Object.entries(data).forEach(item => {
                let itemOption = document.createElement("option");
                itemOption.value = item[0];
                itemOption.innerHTML = item[0];
                itemOptions.appendChild(itemOption);
                springobjectCoordinates[item[0]] = item[1];
            })
        })

    document.getElementById("configoptions").after(itemOptions);
    return springobjectCoordinates;
}

function addFurnitureDatalist() {
    // * add drop-down menu to select furniture piece
    const selectItemElement = document.createElement("select");
    selectItemElement.classList.add("furniture");

    const furnitureOptions = document.createElement("datalist");
    furnitureOptions.id = "furnitureoptions";

    let furnitureCoordinates = Object();
    fetch(
        'https://raw.githubusercontent.com/holy-the-sea/CP2AT/main/src/coords_info/furniture_coords.json')
        .then(response => response.json())
        // .then(data => vanillaObjects = data)
        .then(data => {
            Object.entries(data).forEach(item => {
                let itemOption = document.createElement("option");
                itemOption.value = item[0];
                itemOption.innerHTML = item[0];
                furnitureOptions.appendChild(itemOption);
                furnitureCoordinates[item[0]] = item[1];
                delete furnitureCoordinates[item[0]].Type;
                delete furnitureCoordinates[item[0]].Rotations;
                delete furnitureCoordinates[item[0]].Default_Width;
                delete furnitureCoordinates[item[0]].Default_Height;
            })
        })

    document.getElementById("configoptions").after(furnitureOptions);
    return furnitureCoordinates;
}

function addDaysOfWeekDatalist () {
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

addAnimalsDatalist();
addBuildingsDatalist();
const craftableCoordinates = addCraftablesDatalist();
const springobjectCoordinates = addSpringobjectsDatalist();
const furnitureCoordinates = addFurnitureDatalist();
addPortraitsDatalist();
addDaysOfWeekDatalist();

function handleManifestUpdate(ev) {
    // * update manifest on text input
    ev.preventDefault;
    const data = new FormData(document.getElementById("manifestform"));
    const value = Object.fromEntries(data.entries());

    let json = JSON.stringify(value, null, 4);

    let jsonElement = document.createElement("pre");
    jsonElement.innerHTML = json;
    document.getElementById("manifestelement").appendChild(jsonElement)
    document.getElementById("manifestelement").removeChild(document.getElementById("manifestoutput"))
    jsonElement.id = "manifestoutput"
}

function addMapFile(selectMapFile) {
    // * add drop-down menu to select an uploaded file asset
    const optionPlaceholder = document.createElement("option");
    // * placeholder option
    optionPlaceholder.innerHTML = "(Map file)";
    optionPlaceholder.selected = true;
    optionPlaceholder.disabled = true;
    selectMapFile.appendChild(optionPlaceholder);

    fileAssets.forEach(element => {
        const optionAsset = document.createElement("option");
        optionAsset.innerHTML = element.name;
        selectMapFile.appendChild(optionAsset);
    })
}

function addCustomLocation(ev) {
    // * add all elements needed to make a patch
    ev.preventDefault;

    const customLocationElement = document.getElementById("locations");
    customLocationElement.style.display = "flex";

    // * individual custom location element
    const individualCustomLocation = document.createElement("div");
    individualCustomLocation.classList.add("individuallocation");
    headerElement = document.createElement("h4");
    headerElement.innerHTML = "Custom Location:";
    headerElement.classList.add("locationheader");
    individualCustomLocation.appendChild(headerElement);
    customLocationElement.appendChild(individualCustomLocation);

    // * name/mapfile dropdowns
    const dropdownElements = document.createElement("div");
    dropdownElements.classList.add("locationdropdowns");

    const locationNameInputElement = document.createElement("input");
    locationNameInputElement.classList.add("locationname")
    locationNameInputElement.type = "text";
    locationNameInputElement.placeholder = "Custom Location Name";
    dropdownElements.appendChild(locationNameInputElement);

    const mapFileElement = document.createElement("select");
    mapFileElement.classList.add("mapfile");
    addMapFile(mapFileElement);
    dropdownElements.appendChild(mapFileElement);

    individualCustomLocation.appendChild(dropdownElements);

    // * cancel button
    const xElement = addCancelButton();
    xElement.classList.add("cancelchange");
    dropdownElements.appendChild(xElement);

    handleContentUpdate(ev);
}

function addTarget() {
    // * add drop-down menu to select a file to target
    const selectTargetElement = document.createElement("select");
    selectTargetElement.classList.add("target");

    ["(Target)", "Animals", "Buildings", "Craftables", "Items", "Furniture", "Portraits", "Tools", "Weapons"].forEach( textOption => {
        optionElement = document.createElement("option");
        optionElement.value = textOption;
        optionElement.innerHTML = textOption;
        selectTargetElement.appendChild(optionElement);

        if (textOption == "(Target)") {
            optionElement.selected = true;
            optionElement.disabled = true;
        }
    })

    return selectTargetElement;
}

function addAsset(selectAsset) {
    // * add drop-down menu to select an uploaded file asset
    const optionPlaceholder = document.createElement("option");
    // * placeholder option
    optionPlaceholder.innerHTML = "(Asset)";
    optionPlaceholder.selected = true;
    optionPlaceholder.disabled = true;
    selectAsset.appendChild(optionPlaceholder);

    fileAssets.forEach(element => {
        if (element.name.includes(".png")) {
            const optionAsset = document.createElement("option");
            optionAsset.innerHTML = element.name;
            selectAsset.appendChild(optionAsset);
        }
    })
}

function addAnimalsInput() {
    const animalsInput = document.createElement("input");
    animalsInput.classList.add("animalsdropdown");
    animalsInput.type = "text";
    animalsInput.placeholder = "Animal";
    animalsInput.setAttribute("list", "animaloptions");
    return animalsInput;
}

function addBuildingsInput() {
    const buildingsInput = document.createElement("input");
    buildingsInput.classList.add("buildingsdropdown");
    buildingsInput.type = "text";
    buildingsInput.placeholder = "Building";
    buildingsInput.setAttribute("list", "buildingoptions");
    return buildingsInput;
}

function addCraftablesInput() {
    const craftablesInput = document.createElement("input");
    craftablesInput.classList.add("craftablesdropdown");
    craftablesInput.type = "text";
    craftablesInput.placeholder = "Craftable (optional)";
    craftablesInput.setAttribute("list", "craftableoptions");
    return craftablesInput;
}

function addItemsInput() {
    const itemsInput = document.createElement("input");
    itemsInput.classList.add("itemsdropdown");
    itemsInput.type = "text";
    itemsInput.placeholder = "Item (optional)";
    itemsInput.setAttribute("list", "itemoptions");
    return itemsInput;
}

function addFurnitureInput() {
    const furnitureInput = document.createElement("input");
    furnitureInput.classList.add("furnituredropdown");
    furnitureInput.type = "text";
    furnitureInput.placeholder = "Furniture piece (optional)";
    furnitureInput.setAttribute("list", "furnitureoptions");
    return furnitureInput;
}

function addPortraitsInput() {
    const portraitsInput = document.createElement("input");
    portraitsInput.classList.add("portraitsdropdown");
    portraitsInput.type = "text";
    portraitsInput.placeholder = "Character name";
    portraitsInput.setAttribute("list", "portraitoptions");
    return portraitsInput;
}

function addChange(ev) {
    // * add all elements needed to make a patch
    ev.preventDefault;

    const changeElement = document.getElementById("changes");
    changeElement.style.display = "flex";

    // * individual patch element
    const individualChangeElement = document.createElement("div");
    individualChangeElement.classList.add("individualchange");
    headerElement = document.createElement("h4");
    headerElement.innerHTML = "Change:";
    headerElement.classList.add("changeheader");
    individualChangeElement.appendChild(headerElement);
    changeElement.appendChild(individualChangeElement);

    // * target/asset dropdowns
    const dropdownElements = document.createElement("div");
    dropdownElements.classList.add("changedropdowns");

    const selectTargetElement = addTarget();
    dropdownElements.appendChild(selectTargetElement);

    const assetElement = document.createElement("select");
    assetElement.classList.add("asset");
    addAsset(assetElement);
    dropdownElements.appendChild(assetElement);

    individualChangeElement.appendChild(dropdownElements);

    // * cancel button
    const xElement = addCancelButton();
    xElement.classList.add("cancelchange");
    dropdownElements.appendChild(xElement);

    // * config options
    const configButton = document.createElement("button");
    configButton.classList.add("addconfig");
    configButton.type = "button";
    configButton.innerHTML = "Add config option";
    individualChangeElement.appendChild(configButton);
    
    const configElement = document.createElement("div");
    configElement.classList.add("config");
    configElement.style.display = "flex";
    configElement.style.flexDirection = "column";
    individualChangeElement.appendChild(configElement);
    
    configButton.onclick = function() {addConfigTextbox(configElement)};

    handleContentUpdate(ev);
}

function addConfigTextbox(configElement) {
    const configItemElement = document.createElement("div");
    configItemElement.classList.add("configitem");
    const configTextbox = document.createElement("input");
    configTextbox.oldValue = configTextbox.value;
    configTextbox.type = "text";
    configTextbox.placeholder = "Config keyword";
    configTextbox.setAttribute("list", "configoptions");
    configTextbox.classList.add("configtext");
    configTextbox.oninput = function() {handleConfig(configElement)};
    configItemElement.appendChild(configTextbox);

    const xElement = addCancelButton();
    xElement.classList.add("cancelconfig");
    configItemElement.appendChild(xElement)

    configElement.appendChild(configItemElement);

    handleConfig(configElement);

}

function addDayOfWeekInput() {
    const dayOfWeekInput = document.createElement("input");
    dayOfWeekInput.classList.add("dayofweekdropdown");
    dayOfWeekInput.type = "text";
    dayOfWeekInput.placeholder = "Day of Week";
    dayOfWeekInput.setAttribute("list", "dayofweekoptions");
    return dayOfWeekInput;
}

function addSeasonDropdown() {
    const seasonDropdown = document.createElement("select");
    seasonDropdown.classList.add("seasondropdown");
    ["Spring", "Summer", "Fall", "Winter"].forEach( textOption => {
        optionElement = document.createElement("option");
        optionElement.value = textOption;
        optionElement.innerHTML = textOption;
        seasonDropdown.appendChild(optionElement);
    })
    seasonDropdown.multiple = true;
    seasonDropdown.style.verticalAlign = "top";
    seasonDropdown.style.marginTop = "3px";
    return seasonDropdown;
}

function addDaysOfWeekDropdown() {
    const daysOfWeekDropdown = document.createElement("select");
    daysOfWeekDropdown.classList.add("daysofweekdropdown");
    [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" 
    ].forEach( textOption => {
        optionElement = document.createElement("option");
        optionElement.value = textOption;
        optionElement.innerHTML = textOption;
        daysOfWeekDropdown.appendChild(optionElement);
    })
    daysOfWeekDropdown.multiple = true;
    daysOfWeekDropdown.style.verticalAlign = "top";
    daysOfWeekDropdown.style.marginTop = "3px";
    return daysOfWeekDropdown;
}

function addDayDropdown() {
    const dayDropdown = document.createElement("select");
    dayDropdown.classList.add("daydropdown");
    [...Array(31).keys()].forEach(i => {
        optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.innerHTML = i;
        dayDropdown.appendChild(optionElement);
    })
    dayDropdown.multiple = true;
    dayDropdown.style.verticalAlign = "top";
    dayDropdown.style.marginTop = "3px";
    return dayDropdown;
}

function handleConfig(configElement) {
    const contentOutput = document.getElementById("contentoutput");
    let json = contentOutput.textContent;
    json = json.replace(/\n/g, "");
    json = JSON.parse(json);

    const i = Array.prototype.indexOf.call(document.getElementById("changes").children, configElement.parentElement);
    const configKeywordElements = configElement.querySelectorAll(".configtext");
    configKeywordElements .forEach(element => {
        if (!json["Changes"][i].When) {
            json["Changes"][i].When  = {};
        }
        else if (element.value) {
            if (element.value === "Season") {
                const seasonDropdown = addSeasonDropdown();
                if (element.nextSibling.className !== "seasondropdown") {
                    element.after(seasonDropdown);
                }
                seasonDropdown.options[0].selected = true;
                json["Changes"][i]["When"]["Season"] = seasonDropdown.value;
            }
            if (!(element.value === "Season") && element.nextSibling.className === "seasondropdown") {
                element.parentElement.removeChild(element.nextSibling);
            }
            if (element.value === "DaysOfWeek") {
                const daysOfWeekDropdown = addDaysOfWeekDropdown();
                if (element.nextSibling.className !== "daysofweekdropdown") {
                    element.after(daysOfWeekDropdown);
                }
                daysOfWeekDropdown.options[0].selected = true;
                json["Changes"][i]["When"]["DaysOfWeek"] = daysOfWeekDropdown.value;
            }
            if (!(element.value === "DaysOfWeek") && element.nextSibling.className === "daysofweekdropdown") {
                element.parentElement.removeChild(element.nextSibling);
            }

            if (element.value === "Day") {
                const dayDropdown = addDayDropdown();
                if (element.nextSibling.className !== "daydropdown") {
                    element.after(dayDropdown);
                }
                dayDropdown.options[0].selected = true;
                json["Changes"][i]["When"]["Day"] = dayDropdown.value;
            }
            if (!(element.value === "Day") && element.nextSibling.className === "daydropdown") {
                element.parentElement.removeChild(element.nextSibling);
            }
            
            json["Changes"][i]["When"][[element.value]] = "true";
        }
    })
    contentOutput.innerHTML = JSON.stringify(json, null, 4);
}

function handleDeleteChange(xElement) {
    const locationsElement = document.getElementById("locations");
    const changesElement = document.getElementById("changes");
    const contentOutput = document.getElementById("contentoutput");

    let json = contentOutput.textContent;
    json = json.replace(/\n/g, "");
    json = JSON.parse(json);

    const individualElement = xElement.parentElement;

    if (individualElement.className === "locationdropdowns") {
        const individualLocationElement = individualElement.parentElement;
        const i = Array.prototype.indexOf.call(locationsElement.children, individualLocationElement);
        json["CustomLocations"].splice(i, 1);
        locationsElement.removeChild(xElement.parentElement.parentElement);
    }

    else if (individualElement.className === "changedropdowns") {
        let individualChangeElement = individualElement;

        while (individualChangeElement.className !== "individualchange") {
            individualChangeElement = individualChangeElement.parentElement;
        }
        const i = Array.prototype.indexOf.call(changesElement.children, individualChangeElement);
        if (xElement.parentElement.className === "changedropdowns") {
            json["Changes"].splice(i, 1);
            changesElement.removeChild(xElement.parentElement.parentElement);
        }
    }

    else if (xElement.parentElement.className === "configitem") {
        let individualChangeElement = individualElement;
        const i = Array.prototype.indexOf.call(changesElement.children, individualChangeElement.parentElement.parentElement);
        const configItemElement = xElement.parentElement;
        const configSectionElement = configItemElement.parentElement;
        const configValue = configItemElement.querySelector(".configtext").value;
        delete json["Changes"][i]["When"][configValue];
        configItemElement.parentElement.removeChild(configItemElement);
        if (configSectionElement.children.length === 0) {
            delete json["Changes"][i]["When"];
        }

        let configBool = false;
        json["Changes"].forEach(change => {
            if (change.length) {
                configBool = (configValue in change["When"]);
            }
        })
        if (!configBool) {
            delete json["ConfigSchema"][configValue];
        }
    }
    handleConfigSchema(json);
    contentOutput.innerHTML = JSON.stringify(json, null, 4);
}

function addCancelButton() {
    const xElement = document.createElement("button");
    xElement.type = "button";
    xElement.classList.add("cancel");
    xElement.innerHTML = "❌";
    xElement.onclick = function() {handleDeleteChange(xElement)};
    return xElement
}

function handleConfigSchema(json) {
    let configKeywords = [];
    json["Changes"].forEach(change => {
        if (change.When) {
            configKeywords = configKeywords.concat(Object.keys(change.When));
        }
    })
    if (configKeywords.length === 0) {
        json["ConfigSchema"] = {};
    }
    else {
        configKeywords.forEach(keyword => {
            if (keyword !== "Season" && keyword !== "DaysOfWeek" && keyword !== "Day") {
                json["ConfigSchema"][[keyword]] = {"AllowValues": "true, false", "Default": "true"};
            }
        })
    }
}

function handleContentUpdate(ev) {
    ev.preventDefault;
    const data = new FormData(document.getElementById("contentform"));
    const value = Object.fromEntries(data.entries());

    value["Changes"] = [];
    value["CustomLocations"] = [];

    const allCustomLocations = document.querySelectorAll(".individuallocation");
    allCustomLocations.forEach(location => {
        const locationNameElement = location.querySelector(".locationname");
        const mapFileElement = location.querySelector(".mapfile");

        let customLocationsObject = {};
        customLocationsObject.Name = locationNameElement.value;
        if (mapFileElement.value !== "(Map file)") {
            customLocationsObject.FromMapFile = mapFileElement.value;
        }
        else {
            customLocationsObject.FromMapFile = "";
        }
        value["CustomLocations"].push(customLocationsObject);
    })

    const allChanges = document.querySelectorAll(".individualchange");
    allChanges.forEach(change => {
        const targetElement = change.querySelector(".target");
        const assetElement = change.querySelector(".asset");

        let changeObject = {};
        if (["Tools", "Weapons"].includes(targetElement.value)) {
            changeObject.Action = "EditImage";
            changeObject.Target = `TileSheets/${targetElement.value.toLowerCase()}`;
        }
        else if (targetElement.value === "Animals") {
            changeObject.Action = "EditImage";
            if (targetElement.nextElementSibling.className !== "animalsdropdown") {
                const animalsDropdown = addAnimalsInput();
                targetElement.after(animalsDropdown);
            }
            if (targetElement.nextElementSibling.className === "animalsdropdown") {
                const animalsDropdown = targetElement.nextElementSibling;
                changeObject.Target = `Animals/${animalsDropdown.value}`;
            }
            if (["buildingsdropdown", "craftablesdropdown", "itemsdropdown", "furnituredropdown", "portraitsdropdown"].includes(targetElement.nextElementSibling.nextElementSibling.className)) {
                targetElement.parentElement.removeChild(targetElement.nextElementSibling.nextElementSibling);
            }
        }
        else if (targetElement.value === "Buildings") {
            changeObject.Action = "EditImage";
            if (targetElement.nextElementSibling.className !== "buildingsdropdown") {
                const buildingsDropdown = addBuildingsInput();
                targetElement.after(buildingsDropdown);
            }
            if (targetElement.nextElementSibling.className === "buildingsdropdown") {
                const buildingsDropdown = targetElement.nextElementSibling;
                changeObject.Target = `Animals/${buildingsDropdown.value}`;
            }
            if (["animalsdropdown", "craftablesdropdown", "itemsdropdown", "furnituredropdown", "portraitsdropdown"].includes(targetElement.nextElementSibling.nextElementSibling.className)) {
                targetElement.parentElement.removeChild(targetElement.nextElementSibling.nextElementSibling);
            }
        }
        else if (targetElement.value === "Craftables") {
            changeObject.Action = "EditImage";
            if (targetElement.nextElementSibling.className !== "craftablesdropdown") {
                const craftablesDropdown = addCraftablesInput();
                targetElement.after(craftablesDropdown);
            }
            if (targetElement.nextElementSibling.className === "craftablesdropdown") {
                const craftablesDropdown = targetElement.nextElementSibling;
                changeObject.Target = "TileSheets/Craftables";
                changeObject.ToArea = craftableCoordinates[craftablesDropdown.value];
            }
            if (["animalsdropdown", "buildingsdropdown", "furnituredropdown", "itemsdropdown", "portraitsdropdown"].includes(targetElement.nextElementSibling.nextElementSibling.className)) {
                targetElement.parentElement.removeChild(targetElement.nextElementSibling.nextElementSibling);
            }
        }
        else if (targetElement.value === "Furniture") {
            changeObject.Action = "EditImage";
            if (targetElement.nextElementSibling.className !== "furnituredropdown") {
                const furnitureDropdown = addFurnitureInput();
                targetElement.after(furnitureDropdown);
            }
            if (targetElement.nextElementSibling.className === "furnituredropdown") {
                const furnitureDropdown = targetElement.nextElementSibling;
                changeObject.Target = "TileSheets/Furniture";
                changeObject.ToArea = furnitureCoordinates[furnitureDropdown.value];
            }
            if (["animalsdropdown", "buildingsdropdown", "craftablesdropdown", "itemsdropdown", "portraitsdropdown"].includes(targetElement.nextElementSibling.nextElementSibling.className)) {
                targetElement.parentElement.removeChild(targetElement.nextElementSibling.nextElementSibling);
            }
        }
        else if (targetElement.value === "Items") {
            changeObject.Action = "EditImage";
            if (targetElement.nextElementSibling.className !== "itemsdropdown") {
                const itemsDropdown = addItemsInput();
                targetElement.after(itemsDropdown);
            }
            if (targetElement.nextElementSibling.className === "itemsdropdown") {
                const itemsDropdown = targetElement.nextElementSibling;
                changeObject.Target = "Maps/springobjects";
                changeObject.ToArea = springobjectCoordinates[itemsDropdown.value];
            }
            if (["animalsdropdown", "buildingsdropdown", "craftablesdropdown", "furnituredropdown", "portraitsdropdown"].includes(targetElement.nextElementSibling.nextElementSibling.className)) {
                targetElement.parentElement.removeChild(targetElement.nextElementSibling.nextElementSibling);
            }
        }
        else if (targetElement.value === "Portraits") {
            changeObject.Action = "EditImage";
            if (targetElement.nextElementSibling.className !== "portraitsdropdown") {
                const portraitsDropdown = addPortraitsInput();
                targetElement.after(portraitsDropdown);
            }
            if (targetElement.nextElementSibling.className === "portraitsdropdown") {
                const portraitsDropdown = targetElement.nextElementSibling;
                changeObject.Target = `Portraits/${portraitsDropdown.value}`;
            }
            if (["animalsdropdown", "craftablesdropdown", "furnituredropdown", "itemsdropdown", "buildingsdropdown"].includes(targetElement.nextElementSibling.nextElementSibling.className)) {
                targetElement.parentElement.removeChild(targetElement.nextElementSibling.nextElementSibling);
            }
        }
        
        else if (targetElement.value !== "(Target)") {
            changeObject.Target = `TileSheets/${targetElement.value}`;
        }
        
        if (targetElement.value !== "Animals" && targetElement.nextElementSibling.className === "animalsdropdown") {
            targetElement.parentElement.removeChild(targetElement.nextSibling);
        }
        
        if (targetElement.value !== "Buildings" && targetElement.nextElementSibling.className === "buildingsdropdown") {
            targetElement.parentElement.removeChild(targetElement.nextSibling);
        }
        
        if (targetElement.value !== "Items" && targetElement.nextElementSibling.className === "itemsdropdown") {
            targetElement.parentElement.removeChild(targetElement.nextSibling);
        }

        if (targetElement.value !== "Portraits" && targetElement.nextElementSibling.className === "portraitsdropdown") {
            targetElement.parentElement.removeChild(targetElement.nextSibling);
        }

        if (assetElement.value !== "(Asset)") {
            changeObject.FromFile = `assets/${assetElement.value}`;
        }

        const configItems = change.querySelectorAll(".configitem");
        if (configItems.length === 1 && !configItems[0].querySelector(".configtext").value) {
            changeObject.When = {};
        }
        if (configItems.length === 0) {
            delete changeObject.When
        }
        else {
            let configList = {};
            configItems.forEach(config => {
                const value = config.querySelector(".configtext").value;
                if (value !== "" && !["Season", "DaysOfWeek", "Day"].includes(value)) {
                    configList[[value]] = "true";
                }
                else if (value === "Season") {
                    let selectedSeasons = [];
                    Array.from(config.querySelector(".seasondropdown").selectedOptions).forEach(season => {
                        selectedSeasons.push(season.value);
                    })
                    configList["Season"] = selectedSeasons;
                }
                else if (value === "DaysOfWeek") {
                    let selectedDaysOfWeek = [];
                    Array.from(config.querySelector(".daysofweekdropdown").selectedOptions).forEach(dayOfWeek => {
                        selectedDaysOfWeek.push(dayOfWeek.value);
                    })
                    configList["DaysOfWeek"] = selectedDaysOfWeek;
                }
                else if (value === "Day") {
                    let selectedDays = [];
                    Array.from(config.querySelector(".daydropdown").selectedOptions).forEach(day => {
                        selectedDays.push(parseInt(day.value) + 1 );
                    })
                    configList["Day"] = selectedDays;
                }
            })
            changeObject.When = configList;
        }
        value["Changes"].push(changeObject);
    })

    if (!document.querySelector("pre#contentoutput")) {
        let json = JSON.stringify(value, null, 4);
        let jsonElement = document.createElement("pre");
        jsonElement.innerHTML = json;
        document.getElementById("contentelement").appendChild(jsonElement);
        document.getElementById("contentelement").removeChild(document.getElementById("contentoutput"));
        jsonElement.id = "contentoutput";
    }
    else {
        const contentOutput = document.getElementById("contentoutput");
        let json = contentOutput.textContent;
        json = json.replace(/\n/g, "");
        json = JSON.parse(json);
        json["CustomLocations"] = value["CustomLocations"];
        json["Changes"] = value["Changes"];
        json["Format"] = value["Format"];
        json["ConfigSchema"] = {};
        handleConfigSchema(json);
        contentOutput.innerHTML = JSON.stringify(json, null, 4);
    }
}

const fileAssets = [];
function addImagePreview(file) {
    const imagePreviews = document.getElementById("imagepreview");
    const newPreviewElement = document.createElement("div");
    const newPreviewLabel = document.createElement("p");
    newPreviewLabel.innerHTML = file.name;
    if (file.name.includes(".png")) {      
        const imageElement = document.createElement("img");
        // imageElement.id = imagePreviews.children.length;
        imageElement.src = URL.createObjectURL(file);
        newPreviewElement.classList.add("image");
        imagePreviews.appendChild(newPreviewElement);
        newPreviewElement.appendChild(newPreviewLabel);
        newPreviewElement.appendChild(imageElement);
    }
    else if (file.name.includes (".tmx")) {
        const iconElement = document.createElement("p");
        iconElement.src = URL.createObjectURL(file);
        iconElement.innerHTML = ("🗺");
        newPreviewElement.classList.add("mapfile");
        imagePreviews.appendChild(newPreviewElement);
        newPreviewElement.appendChild(newPreviewLabel);
        newPreviewElement.appendChild(iconElement);
    }
}
function dropHandler(ev, fileAssets) {
    // * Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // * Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach(item => {
            // * If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileAssets.push(file);
                console.log(`File dropped: ${file.name}`);
                addImagePreview(file);
                if (file.name.includes(".png")) {
    
                    const assetDropDowns = document.querySelectorAll(".asset");
                    if (assetDropDowns.length > 0) {
                        assetDropDowns.forEach(dropdown => {
                            if (dropdown.length <= 1) {
                                const optionElement = document.createElement("option");
                                optionElement.value = file.name;
                                optionElement.innerHTML = file.name;
                                dropdown.appendChild(optionElement)
                            }
                            else {
                                const assetList = [];
                                Array.prototype.forEach(option => {
                                    assetList.append(option);
                                })
                                if (!assetList.includes(file.name)) {
                                    const optionElement = document.createElement("option");
                                    optionElement.value = file.name;
                                    optionElement.innerHTML = file.name;
                                    dropdown.appendChild(optionElement)
                                }
                            }
                        });
                    }
                }

                else if (file.name.includes(".tmx")) {
                    const mapFileDropDowns = document.querySelectorAll(".mapfile");
                    if (mapFileDropDowns.length > 0) {
                        mapFileDropDowns.forEach(dropdown => {
                            if (dropdown.length <= 1) {
                                const optionElement = document.createElement("option");
                                optionElement.value = file.name;
                                optionElement.innerHTML = file.name;
                                dropdown.appendChild(optionElement)
                            }
                            else {
                                const mapFileList = [];
                                Array.prototype.forEach(option => {
                                    mapFileList.append(option);
                                })
                            }
                        });
                    }
                }
            }
        });
        ev.target.classList.remove("highlight");
    }
}
function dragOverHandler(ev) {
    // * Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    const dropArea = ev.target;
    dropArea.classList.add("highlight");
}
function dragLeaveHandler(ev) {
    const dropArea = ev.target;
    dropArea.classList.remove("highlight");
}
function fileChangeHandler(ev) {
    const target = ev.target;
    const file = target.files[target.files.length - 1];
    fileAssets.push(file);
    console.log(`File selected: ${file.name}`);
    addImagePreview(file);

    const assetDropDowns = document.querySelectorAll(".asset");
        if (assetDropDowns.length > 0) {
            assetDropDowns.forEach(dropdown => {
                if (dropdown.length <= 1) {
                    const optionElement = document.createElement("option");
                    optionElement.value = file.name;
                    optionElement.innerHTML = file.name;
                    dropdown.appendChild(optionElement)
                }
                else {
                    const assetList = [];
                    Array.prototype.forEach(option => {
                        assetList.append(option);
                    })
                    if (!assetList.includes(file.name)) {
                        const optionElement = document.createElement("option");
                        optionElement.value = file.name;
                        optionElement.innerHTML = file.name;
                        dropdown.appendChild(optionElement)
                }
            }
        });
    }
}

function handleDownload(ev) {
    ev.preventDefault();

    zip = new JSZip();

    zip.file("manifest.json", document.querySelector("#manifestoutput").innerHTML)
    zip.file("content.json", document.querySelector("#contentoutput").innerHTML)

    assetsToDownload = document.querySelectorAll(".asset");
    console.log(`Downloading...`);
    assetsToDownload.forEach(asset => {
        console.log(asset.value);
        fileAssets.forEach(file => {
            if (file.name === asset.value) {
                zip.file(`assets/${file.name}`, file, { base64: true });
            }
        })
    })
    zip.generateAsync({type:"blob"})
    .then(function (blob) {
        saveAs(blob, document.querySelector("#modname").value);
    });
}