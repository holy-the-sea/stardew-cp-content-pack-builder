
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

function addTarget() {
    // * add drop-down menu to select a file to target
    const selectTargetElement = document.createElement("select");
    selectTargetElement.classList.add("target");

    ["(Target)", "Craftables", "Furniture", "Tools", "Weapons", "Portraits"].forEach( textOption => {
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
        const optionAsset = document.createElement("option");
        optionAsset.innerHTML = element.name;
        selectAsset.appendChild(optionAsset);
    })
}

function addCancelButton() {
    const xElement = document.createElement("button");
    xElement.type = "button";
    xElement.classList.add("cancel");
    xElement.innerHTML = "❌";
    xElement.onclick = function() {handleDeleteChange(xElement)};
    return xElement
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
    configTextbox.placeholder = "Config keyword:";
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

function addSeasonDropdown() {
    const seasonDropdown = document.createElement("select");
    seasonDropdown.classList.add("seasondropdown");
    ["Spring", "Summer", "Fall", "Winter"].forEach( textOption => {
        optionElement = document.createElement("option");
        optionElement.value = textOption;
        optionElement.innerHTML = textOption;
        seasonDropdown.multiple = true;
        seasonDropdown.appendChild(optionElement);
    })
    seasonDropdown.style.verticalAlign = "top";
    seasonDropdown.style.marginTop = "3px";
    return seasonDropdown;
}

function handleConfig(configElement) {
    const contentOutput = document.getElementById("contentoutput");
    let json = contentOutput.textContent;
    json = json.replace(/\n/g, "");
    json = JSON.parse(json);
//     json["ConfigSchema"] = {};

    const i = Array.prototype.indexOf.call(document.getElementById("changes").children, configElement.parentElement);
    const configKeywordElements = configElement.querySelectorAll(".configtext");
    let configsAreEmpty  = true;
    let addDefaultKeyword = true;
    configKeywordElements .forEach(element => {
        if (!json["Changes"][i].When) {
            json["Changes"][i].When  = {"Enabled": "true"};
        }
        else if (element.value) {
            if (element.value === "Season") {
                const seasonDropdown = addSeasonDropdown();
                if (element.nextSibling.className !== "seasondropdown") {
                    element.after(seasonDropdown);
                }
                seasonDropdown.options[0].selected = true;
                json["Changes"][i].When = {"Season": [seasonDropdown.value]};
            }
            if (!(element.value === "Season") && element.nextSibling.className === "seasondropdown") {
                element.parentElement.removeChild(element.nextSibling);
            }
            json["Changes"][i]["When"][[element.value]] = "true";
            configsAreEmpty = false;
            addDefaultKeyword = false;
        }
    })
    if (!addDefaultKeyword) {
        delete json["Changes"][i]["When"]["Enabled"];
    }
    contentOutput.innerHTML = JSON.stringify(json, null, 4);
}

function handleDeleteChange(xElement) {
    const changesElement = document.getElementById("changes");
    const contentOutput = document.getElementById("contentoutput");

    let json = contentOutput.textContent;
    json = json.replace(/\n/g, "");
    json = JSON.parse(json);

    let individualChangeElement = xElement.parentElement;
    while (individualChangeElement.className !== "individualchange") {
        individualChangeElement = individualChangeElement.parentElement;
    }
    const i = Array.prototype.indexOf.call(changesElement.children, individualChangeElement);
    if (xElement.parentElement.className === "changedropdowns") {
        json["Changes"].splice(i, 1);
        changesElement.removeChild(xElement.parentElement.parentElement);
    }
    else if (xElement.parentElement.className === "configitem") {
        const configItemElement = xElement.parentElement;
        const configValue = configItemElement.querySelector(".configtext").value;
        delete json["Changes"][i]["When"][configValue];
        configItemElement.parentElement.removeChild(configItemElement);

        let configBool = false;
        json["Changes"].forEach(change => {
            configBool = (configValue in change["When"]);
        })
        if (!configBool) {
            delete json["ConfigSchema"][configValue];
        }
        if (individualChangeElement.querySelector(".config").children.length === 0) {
            delete json["Changes"][i]["When"];
        }
    }
    handleConfigSchema(json);
    contentOutput.innerHTML = JSON.stringify(json, null, 4);
}

function handleConfigSchema(json) {
    let configKeywords = [];
    json["Changes"].forEach(change => {
        if (change.When) {
            configKeywords = configKeywords.concat(Object.keys(change.When));
        }
    })
    configKeywords.forEach(keyword => {
        if (keyword !== "Season") {
            json["ConfigSchema"][[keyword]] = {"AllowValues": "true, false", "Default": "true"};
        }
    })
}

function handleContentUpdate(ev) {
    ev.preventDefault;
    const data = new FormData(document.getElementById("contentform"));
    const value = Object.fromEntries(data.entries());

    // value["ConfigSchema"] = {};
    value["Changes"] = [];

    const allChanges = document.querySelectorAll(".individualchange");
    allChanges.forEach((change, i) => {
        const targetElement = change.querySelector(".target");
        const assetElement = change.querySelector(".asset");
        // const configCheckbox = change.querySelector(".configCheckbox");

        changeObject = {}
        changeObject.Action = "EditImage";
        if (["Furniture", "Tools", "Weapons"].includes(targetElement.value)) {
            changeObject.Target = `TileSheets/${targetElement.value.toLowerCase()}`;
        }
        else if (targetElement.value === "Portraits") {
            changeObject.Target = `Portraits/`;
        }
        else if (targetElement.value !== "(Target)") {
            changeObject.Target = `TileSheets/${targetElement.value}`;
        }

        if (assetElement.value !== "(Asset)") {
            changeObject.FromFile = `assets/${assetElement.value}`;
        }

        const configItems = change.querySelectorAll(".configitem");
        if (configItems.length === 1 && !configItems[0].querySelector(".configtext").value) {
            changeObject.When = {"Enabled": "true"};
        }
        else if (configItems.length === 0) {
            delete changeObject.When
        }
        else {
            let configList = {};
            configItems.forEach(config => {
                const value = config.querySelector(".configtext").value;
                if (value !== "" && value !== "Season") {
                    configList[[value]] = "true";
                }
                else if (value === "Season") {
                    let selectedSeasons = [];
                    Array.from(config.querySelector(".seasondropdown").selectedOptions).forEach(season => {
                        selectedSeasons.push(season.value);
                    })
                    configList["Season"] = selectedSeasons;
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
        json["Changes"] = value["Changes"];
        json["Format"] = value["Format"];
        json["ConfigSchema"] = {};
        handleConfigSchema(json);
        contentOutput.innerHTML = JSON.stringify(json, null, 4);
    }
}

const fileAssets = [];
function addImagePreview(file) {
    const imageElement = document.createElement("img");
    const imagePreviews = document.getElementById("imagepreview");
    imageElement.id = imagePreviews.children.length;
    imageElement.src = URL.createObjectURL(file);
    const newPreviewElement = document.createElement("div");
    newPreviewElement.classList.add("image");
    const newPreviewLabel = document.createElement("p");
    imagePreviews.appendChild(newPreviewElement);
    newPreviewLabel.innerHTML = file.name;
    newPreviewElement.appendChild(newPreviewLabel);
    newPreviewElement.appendChild(imageElement);
}
function dropHandler(ev, fileAssets) {
    // * Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // * Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // * If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileAssets.push(file);
                console.log(`File dropped: ${file.name}`);
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
                            Array.prototype.forEach(options => {
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
        });
        ev.target.classList.remove("highlight");

        const assetDropDowns = document.querySelectorAll(".asset");
        if (assetDropDowns.length === 0) {
            assetDropDowns.forEach(dropdown => {
                const option = document.createElement("option");
                option.innerHTML = file
            })
        }
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
                    Array.prototype.forEach(options => {
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