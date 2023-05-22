
function handleManifestUpdate(ev) {
    ev.preventDefault;
    const data = new FormData(document.getElementById("manifestform"));
    const value = Object.fromEntries(data.entries());

    let json = JSON.stringify(value, null, 4);
    json = json.replace("modname", "Name");
    json = json.replace("modauthor", "Author");
    json = json.replace("modversion", "Version");
    json = json.replace("moddescription", "Description");
    json = json.replace("uniqueid", "UniqueID");
    json = json.replace("updatekeys", "UpdateKeys");

    let jsonElement = document.createElement("pre");
    jsonElement.innerHTML = json;
    document.getElementById("manifestElement").appendChild(jsonElement)
    document.getElementById("manifestElement").removeChild(document.getElementById("manifestoutput"))
    jsonElement.id = "manifestoutput"
}

function addTarget(selectDiv) {
    let selectTargetElement = document.createElement("select");
    selectTargetElement.classList.add("target");

    let optionPlaceholder = document.createElement("option");
    optionPlaceholder.innerHTML = "(Target)";
    optionPlaceholder.selected = true;
    optionPlaceholder.disabled = true;
    let optionCraftables = document.createElement("option");
    optionCraftables.value = "Craftables";
    optionCraftables.innerHTML = "Craftables";
    let optionFurniture = document.createElement("option");
    optionFurniture.value = "Furniture";
    optionFurniture.innerHTML = "Furniture"
    let optionTools = document.createElement("option");
    optionTools.value = "Tools";
    optionTools.innerHTML = "Tools";
    let optionPortraits = document.createElement("option");
    optionPortraits.value = "Portraits";
    optionPortraits.innerHTML = "Portraits";
    optionPortraits.disabled = true;
    let optionWeapons = document.createElement("option");
    optionTools.value = "Weapons";
    optionTools.innerHTML = "Weapons";

    selectTargetElement.appendChild(optionPlaceholder);
    selectTargetElement.appendChild(optionCraftables);
    selectTargetElement.appendChild(optionFurniture);
    selectTargetElement.appendChild(optionTools);
    selectTargetElement.appendChild(optionPortraits);

    selectDiv.appendChild(selectTargetElement);
}

function addAsset(selectAsset) {

    let optionPlaceholder = document.createElement("option");
    optionPlaceholder.innerHTML = "(Asset)";
    optionPlaceholder.selected = true;
    optionPlaceholder.disabled = true;
    selectAsset.appendChild(optionPlaceholder);

    fileAssets.forEach(element => {
        let optionAsset = document.createElement("option");
        optionAsset.innerHTML = element.name;
        selectAsset.appendChild(optionAsset);
    })
}

function addChange(ev) {
    ev.preventDefault;

    let contentForm = document.getElementById("contentform")

    let changeElement = document.createElement("div");
    changeElement.classList.add("changes");
    contentForm.appendChild(changeElement);

    let individualChangeElement = document.createElement("div");
    individualChangeElement.classList.add("individualchange");
    changeElement.appendChild(individualChangeElement);

    addTarget(individualChangeElement);

    let assetElement = document.createElement("select");
    assetElement.classList.add("asset");
    addAsset(assetElement);
    individualChangeElement.appendChild(assetElement);

    let configElementLabel = document.createElement("label");
    configElementLabel.innerHTML = "Config option: "
    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.classList.add("config")
    configElementLabel.appendChild(checkboxElement)
    checkboxElement.onclick = function() {handleConfig(checkboxElement)};
    individualChangeElement.append(configElementLabel);

    let xElement = document.createElement("button");
    xElement.type = "button";
    xElement.preventDefault;
    xElement.classList.add("cancel");
    xElement.innerHTML = "❌";
    xElement.onclick = function() {handleDelete(xElement, changeElement)};
    individualChangeElement.append(xElement);

    handleContentUpdate(ev);
}

function handleConfig(checkboxElement) {
    let contentOutput = document.getElementById("contentoutput");
    let configButtons = document.querySelectorAll("input.config");
    let json = contentOutput.textContent;
    json = json.replace(/\s/g, "");
    json = JSON.parse(json);
    json["ConfigSchema"] = {};

    configButtons.forEach((value, i) => {
        if (value === checkboxElement) {
            let configTextElement = document.createElement("input");
            configTextElement.oldValue = configTextElement.value;
            let configElement = value.parentElement;
            if (value.checked) {
                configTextElement.type = "text";
                configTextElement.placeholder = "Config keyword:";
                configTextElement.classList.add("configtext");
                configElement.appendChild(configTextElement);
                configTextElement.oninput = function() {handleConfigText(configTextElement)};
                json["Changes"][i].When = "Enabled"; // ! change here
            }
            else {
                delete json["Changes"][i].When;
                while (configElement.children.length > 1) {
                    configElement.removeChild(configElement.children[1]);
                }
            }
        }
        if ("When" in json["Changes"][i]) {
            let configOption = json["Changes"][i].When;
            if (configOption in json["ConfigSchema"] === false) {
                json["ConfigSchema"][configOption] = {"AllowValues": "true, false", "Default": "true"};
            }
        }
    });
    contentOutput.innerHTML = JSON.stringify(json, null, 4);
}

function handleConfigText(configTextElement) {
    let contentOutput = document.getElementById("contentoutput");
    let json = contentOutput.textContent;
    json = JSON.parse(json);
    json["ConfigSchema"][configTextElement.value] = {"AllowValues": "true, false", "Default": "true"};
    if (!configTextElement.oldValue) {
        // delete json["ConfigSchema"][configTextElement.oldValue];
        configTextElement.oldValue = configTextElement.value;
        delete json["ConfigSchema"]["Enabled"];
    }
    else if (!configTextElement.value && configTextElement.oldValue) {
        delete json["ConfigSchema"][configTextElement.oldValue];
        json["ConfigSchema"] = {["Enabled"]: {"AllowValues": "true, false", "Default": "true"} };
    }
    else {
        delete json["ConfigSchema"][configTextElement.oldValue];
    }
    configTextElement.oldValue = configTextElement.value;
    contentOutput.innerHTML = JSON.stringify(json, null, 4);
}

function handleDelete(xElement, changeElement) {
    let contentForm = document.getElementById("contentform");
    let contentOutput = document.getElementById("contentoutput");
    let cancelButtons = document.querySelectorAll("button.cancel");
    let json = contentOutput.textContent;
    json = json.replace(/\s/g, "");
    json = JSON.parse(json);

    cancelButtons.forEach((value, i) => {
        if (value === xElement) {
            json["Changes"].splice(i, 1);
            contentOutput.innerHTML = JSON.stringify(json, null, 4);
        }
    })
    contentForm.removeChild(changeElement);
}

function handleContentUpdate(ev) {
    ev.preventDefault;
    let data = new FormData(document.getElementById("contentform"));
    let value = Object.fromEntries(data.entries());

    value["ConfigSchema"] = {};

    value["Changes"] = Array();
    let targetElements = document.querySelectorAll(".target");
    targetElements.forEach(element => {
        changeObject = {}
        if (["Furniture", "Tools", "Weapons"].includes(element.value)) {
            changeObject.Action = "EditImage";
            changeObject.Target = `TileSheets/${element.value.toLowerCase()}`;
        }
        else if (element.value !== "(Target)") {
            changeObject.Action = "EditImage";
            changeObject.Target = `TileSheets/${element.value}`;
        }
        if (element.nextSibling.value !== "(Asset)") {
            changeObject.FromFile = `assets/${element.nextSibling.value}`;
        }
        if (element.nextSibling.nextSibling.children[0].checked) {
            changeObject.When = "Enabled";
        }
        value["Changes"].push(changeObject);
    });


    if (!document.querySelector("pre#contentoutput")) {
        let json = JSON.stringify(value, null, 4);
        let jsonElement = document.createElement("pre");
        jsonElement.innerHTML = json;
        document.getElementById("contentElement").appendChild(jsonElement);
        document.getElementById("contentElement").removeChild(document.getElementById("contentoutput"));
        jsonElement.id = "contentoutput";
    }
    else {
        let contentOutput = document.getElementById("contentoutput");
        let json = contentOutput.textContent;
        json = json.replace(/\s/g, "");
        json = JSON.parse(json);
        json["Changes"] = value["Changes"];
        json["Format"] = value["Format"];
        contentOutput.innerHTML = JSON.stringify(json, null, 4);
    }
}

const fileAssets = [];
function addImagePreview(file) {
    let imageElement = document.createElement("img");
    let imagePreviews = document.getElementById("imagepreview");
    imageElement.id = imagePreviews.children.length;
    imageElement.src = URL.createObjectURL(file);
    let newPreviewElement = document.createElement("div");
    newPreviewElement.classList.add("image");
    let newPreviewLabel = document.createElement("p");
    imagePreviews.appendChild(newPreviewElement);
    newPreviewLabel.innerHTML = file.name;
    newPreviewElement.appendChild(newPreviewLabel);
    newPreviewElement.appendChild(imageElement);
}
function dropHandler(ev, fileAssets) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileAssets.push(file);
                console.log(`File dropped: ${file.name}`);
                addImagePreview(file);

                let assetDropDowns = document.querySelectorAll(".asset");
                if (assetDropDowns.length > 0) {
                    assetDropDowns.forEach(dropdown => {
                        if (dropdown.length <= 1) {
                            let optionElement = document.createElement("option");
                            optionElement.value = file.name;
                            optionElement.innerHTML = file.name;
                            dropdown.appendChild(optionElement)
                        }
                        else {
                            let assetList = [];
                            Array.prototype.forEach(options => {
                                assetList.append(option);
                            })
                            if (!assetList.includes(file.name)) {
                                let optionElement = document.createElement("option");
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

        let assetDropDowns = document.querySelectorAll(".asset");
        if (assetDropDowns.length === 0) {
            assetDropDowns.forEach(dropdown => {
                let option = document.createElement("option");
                option.innerHTML = file
            })
        }
    }
}
function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
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
    
    let assetDropDowns = document.querySelectorAll(".asset");
                if (assetDropDowns.length > 0) {
                    assetDropDowns.forEach(dropdown => {
                        if (dropdown.length <= 1) {
                            let optionElement = document.createElement("option");
                            optionElement.value = file.name;
                            optionElement.innerHTML = file.name;
                            dropdown.appendChild(optionElement)
                        }
                        else {
                            let assetList = [];
                            Array.prototype.forEach(options => {
                                assetList.append(option);
                            })
                            if (!assetList.includes(file.name)) {
                                let optionElement = document.createElement("option");
                                optionElement.value = file.name;
                                optionElement.innerHTML = file.name;
                                dropdown.appendChild(optionElement)
                            }
                        }
                    });
                }
}