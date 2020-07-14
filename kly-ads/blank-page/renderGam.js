createConsole();

function showGamInformation(gam){
    var _wrapper = document.createElement("div");
    var _parent = document.getElementById("kly-console");

    _wrapper.setAttribute("class", "console-item");
    _wrapper.innerHTML = `<h2>${gam.slot.getSlotId().getDomId()}</h2>`;

    var _x = gam.slot.getResponseInformation();
    console.log(gam.slot.getSlotId().getDomId());

        if(_x !== null){

            Object.keys(_x).forEach(function(key) {
                var _p = document.createElement("p");
                _p.innerHTML = `<strong>${key}</strong> : ${_x[key]}`; 
                _wrapper.appendChild(_p);
            });

 
        }
    
    console.log("\n");

    _parent.appendChild(_wrapper);
}

function createConsole() {
    var _console = document.createElement("div");
    _console.setAttribute("id", "kly-console");
    document.body.insertBefore( _console, document.body.lastElementChild);

    var _consoleStyle = document.createElement("style");
    _consoleStyle.textContent = `
    div#kly-console {
        z-index: 1000;
        min-height: 100vh;
        width: 70%;
        background: rgb(248, 224, 224);
        margin: 20px 15%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
    }

    .console-item {
        width: calc(100% / 3);
        box-sizing: border-box;
        padding: 10px;
    }

    .console-item h2 {
        text-align: center;
        width: 80%;
        margin: 10px auto;
    }

    .console-item p {
        width: 100%;
        margin: 3px 10px;
    }
    `;
    document.body.insertBefore( _consoleStyle, document.body.lastElementChild);

}