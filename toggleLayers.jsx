(function(thisObj) {
    scriptBuildUI(thisObj)
    function scriptBuildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', "Toggle Solo", undefined, {
            resizeable: true
        });
        
var dropdown = win.add("dropdownlist", undefined, ["Video Layers", "Adjustment Layers", "Solid Layers", "MP3 Audio Layers",]);
var toggleButton = win.add("button", undefined, "Toggle Solo"); //toggle button
toggleButton.onClick = toggleSoloAndAdjustVisibility;
var invertButton = win.add("button", undefined, "Invert"); //invert button
var invertEnabled = false;
invertButton.onClick = toggleInversion; 

win.orientation = "column"; 
win.alignChildren = "fill";
win.center();
win.show();



function toggleSoloAndAdjustVisibility() {
    //get comp
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
       
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            
            if (dropdown.selection.text === "Video Layers" && (invertEnabled ? !layer.hasVideo : layer.hasVideo)) {
                
                layer.solo = !layer.solo;

            } else if (dropdown.selection.text === "Adjustment Layers" && (invertEnabled ? !layer.adjustmentLayer : layer.adjustmentLayer)) {
                
                layer.solo = !layer.solo;

            } else if (dropdown.selection.text === "Solid Layers" && (invertEnabled ? !layer.source.mainSource instanceof SolidSource : layer.source.mainSource instanceof SolidSource)){

                layer.solo = !layer.solo;

            } else if (dropdown.selection.text === "MP3 Audio Layers" && (invertEnabled ? !layer.hasAudio : layer.hasAudio)) {
                
                layer.solo = !layer.solo;
                
            }
        }
    } else {
        alert("Please open a composition to use this script.");
    }
}


function toggleInversion() {
    invertEnabled = !invertEnabled;
    //change text
    invertButton.text = invertEnabled ? "Invert (ON)" : "Invert (OFF)";
}



    }
})(this);
