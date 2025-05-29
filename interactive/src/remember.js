import { Application, Assets, SCALE_MODES, Sprite } from 'pixi.js';


const board_front_t = await Assets.load('/assets/DS/ds_board_front.png');
const case_front_t = await Assets.load('/assets/DS/ds_case_front.png');
const battery_cell_t = await Assets.load('/assets/DS/ds_battery_cell_front.png');
const battery_front_t = await Assets.load('/assets/DS/ds_battery_lid_front.png');
const screw_front_t = await Assets.load('/assets/DS/screw.png');
const lbtn_2_t = await Assets.load('/assets/DS/lbtn.png');
const rbtn_2_t = await Assets.load('/assets/DS/rbtn.png');


const board_front_sprite = new Sprite(board_front_t);
const case_front_sprite = new Sprite(case_front_t);
const battery_cell_front_sprite = new Sprite(battery_cell_t);
const battery_lid_front_sprite = new Sprite(battery_front_t);
const screw_front_sprite = new Sprite(screw_front_t);

const board_front_sprite_s2 = new Sprite(board_front_t);
const lbtn_2_sprite = new Sprite(lbtn_2_t);
const rbtn_2_sprite = new Sprite(rbtn_2_t);


board_front_sprite.anchor.set(0.5);
case_front_sprite.anchor.set(0.5);
battery_cell_front_sprite.anchor.set(0.5);
battery_lid_front_sprite.anchor.set(0.5);
screw_front_sprite.anchor.set(0.5);

board_front_sprite_s2.anchor.set(0.5);
lbtn_2_sprite.anchor.set(0.5);
rbtn_2_sprite.anchor.set(0.5);

board_front_sprite.scale.set(0.40);
case_front_sprite.scale.set(0.45);
battery_cell_front_sprite.scale.set(0.45);
battery_lid_front_sprite.scale.set(0.45);
screw_front_sprite.scale.set(0.45);

board_front_sprite_s2.scale.set(0.40);

// board_front_sprite.on('pointerdown', onDragStart, board_front_sprite);
// case_front_sprite.on('pointerdown', onDragStart, case_front_sprite);
// battery_lid_front_sprite.on('pointerdown', onDragStart, battery_lid_front_sprite);
// screw_front_sprite.on('pointerdown', onDragStart, screw_front_sprite);

// board_front_sprite.on('pointerdown', onDragStart, b1_sprite);
// case_front_sprite.on('pointerdown', onDragStart, b2_sprite);
// battery_lid_front_sprite.on('pointerdown', onDragStart, b3_sprite);
// screw_front_sprite.on('pointerdown', onDragStart, b4_sprite);

//screwdriver_sprite.scale.set(0.45);

// Example of a console definition: DS
// When moving an item, we need to change the position of the highest parent that's atached
//? Tools: -1 = null, 1 = screwdriver, 2 = lever

var board = {
    id: 0,                                                      // ID
    sprite: board_front_sprite,                                  // Sprite
    offsets_x: null,                                            // Front, Back
    offsets_y: null,                                            // Front, Back
    parents: null,                                              // Parent layers
    atached: null,                                              // 
    atached_by: null,                                           // Layers that hold this in place (ex: screws or itself)
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0                                                    // Dirty? Broken?
}


var case_ds = {
    id: 1,                                                      // ID
    sprite: case_front_sprite,                                   // Sprite
    offsets_x: [board_front_sprite.x, 0],                       // Front, Back, 2 per parent
    offsets_y: [board_front_sprite.y, 0],                       // 
    parents: [board_front_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: [0],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}

var battery_cell = {
    id: 2,                                                                          // ID
    sprite: battery_cell_front_sprite,                                              // Sprite        
    offsets_x: [board_front_sprite.width / 3.29, 0],                                // Front, Back
    offsets_y: [board_front_sprite.height / 45, 0],                                 // 
    parents: [case_front_sprite],                                                   // Parent layers
    parents_id: [1],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 3,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}


var battery_lid = {
    id: 3,                                                                          // ID
    sprite: battery_lid_front_sprite,                                               // Sprite
    offsets_x: [board_front_sprite.width / 3.29, 0],                                // Front, Back
    offsets_y: [board_front_sprite.height / 45, 0],                                 // 
    parents: [case_front_sprite],                                                   // Parent layers
    parents_id: [1],
    atached_by: [4],                                                                // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 3,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}


var screw = {
    id: 4,                                                                          // ID
    sprite: screw_front_sprite, 
                    
    offsets_x: [battery_lid_front_sprite.width / 23.7, 0],                              // Front, Back
    offsets_y: [battery_lid_front_sprite.height / 2.37, 0],                             // 
    parents: [battery_lid_front_sprite],                                                // Parent layers
    parents_id: [3],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 1,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}

var wire = {
    id: 0,
    layer_1: 0,             // Object atached to
    layer_2: 0,             // Object atached to
    offsets_x: [],          // 
    offsets_y: [],          // 
    length: 10,             // Length and shape
    shape: 0,               //
    connection_types: []    // Layer 1, Layer 2, specifies how are they connected (ribbon, solder, regular connection)
}

//Scene 2

var board_s2 = {
    id: 0,                                                      // ID
    sprite: board_front_sprite_s2,                                 // Sprite
    offsets_x: null,                                            // Front, Back
    offsets_y: null,                                            // Front, Back
    parents: null,                                              // Parent layers
    atached: null,                                              // 
    atached_by: null,                                           // Layers that hold this in place (ex: screws or itself)
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0                                                    // Dirty? Broken?
}

var btnl_s2 = {
    id: 1,                                                      // ID
    sprite: lbtn_2_sprite,                                  // Sprite
    offsets_x: [board_front_sprite_s2.x, 0],                       // Front, Back, 2 per parent
    offsets_y: [board_front_sprite_s2.y, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 3,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}

var btnr_s2 = {
    id: 2,                                                      // ID
    sprite: rbtn_2_sprite,                                  // Sprite
    offsets_x: [board_front_sprite_s2.x + 15, 0],                       // Front, Back, 2 per parent
    offsets_y: [board_front_sprite_s2.y, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 3,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}


export function getAbsoluteLocalParent(id,hardware) { //Returns the furthest parent this layer is atached to
    //console.log("Searching parents of: " + id,hardware);

    var hasParent = false;
    var layer = getLayer(id,hardware);
    var toReturn = getLayer(id,hardware);

    if (layer.atached == null || layer.atached.length == 0 || layer.parents == null || layer.parents.length == 0) {
        hasParent = false
    } else {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == true) {
                hasParent = true;
            }
        }
    }

    if (!hasParent) {
        toReturn = layer;
    } else {
        for (let i = 0; i < layer.parents.length; i++) {
            //console.log(hardware)
            //console.log(layer)
            toReturn = getAbsoluteLocalParent(layer.parents_id[i],hardware);
        }
    }
    return toReturn;
}

export function getAbsoluteLocalParentID(id,hardware) { //Returns the id of the furthest parent this layer is atached to
    //console.log("Searching parents of: " + id,hardware);

    var hasParent = false;
    var layer = getLayer(id,hardware);
    var toReturn = null;

    if (layer.atached == null || layer.atached.length == 0 || layer.parents == null || layer.parents.length == 0) {
        hasParent = false
    } else {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == true) {
                hasParent = true;
            }
        }
    }

    if (!hasParent) {
        toReturn = id;
    } else {
        for (let i = 0; i < layer.parents.length; i++) {
            toReturn = getAbsoluteLocalParentID(layer.parents_id[i],hardware);
        }
    }
    return toReturn;
}

export function getLayer(id,hardware) {              //Returns the layer asociated with the id
    var toReturn = null;
    hardware.layers.forEach(element => {
        if (element.id == id) {
            //console.log("Layer " + id + " exists!")
            toReturn = element;
        }
    });
    return toReturn;
}

export function atachedToAnything(id,hardware) {       //Bool if layer is atached to anything
    var layer = getLayer(id,hardware);
    var atached = false;
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == true) {
                atached = true;
            }
        }
    } else {
        return false;
    }
    return atached;
}

export function atachedTo(id,hardware) {                 //Layers atached to
    var layer = getLayer(id,hardware);
    var toReturn = []
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == true) {
                toReturn.push(getLayer(layer.parents_id[i],hardware))
            }
        }
    }
    return toReturn;
}

export function getParents(id,hardware) {                 //Returns parents
    var layer = getLayer(id,hardware);
    var toReturn = []
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            toReturn.push(getLayer(layer.parents_id[i],hardware))
        }
    }
    return toReturn;
}

export function notAtachedTo(id,hardware) {                 //Parents not atached to
    var layer = getLayer(id,hardware);
    var toReturn = []
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == false) {
                toReturn.push(getLayer(layer.parents_id[i],hardware))
            }
        }
    }
    return toReturn;
}


export function getSpriteF(id,hardware) {       //Returns the frontside sprite of a layer
    var toReturn = null;
    hardware.layers.forEach(element => {
        if (element.id == id) {
            toReturn = element.front;
        }
    });
    return toReturn;
}

export function getSpriteB(id,hardware) {       //Returns the backside sprite of a layer
    var toReturn = null;
    hardware.layers.forEach(element => {
        if (element.id == id) {
            toReturn = element.back;
        }
    });
    return toReturn;
}


export var nds = {
    hid: 1,
    name: "DS Back 1",
    order: [0, 1, 2, 3],
    layers: [board, case_ds, battery_cell, battery_lid, screw],
    has_steps: false
}

export var nds_board = {
    hid: 2,
    name: "DS Board 1",
    order: [0, 1, 2],
    layers: [board_s2, btnl_s2, btnr_s2],
    has_steps: false
}

export var scene_ds = {
    name: "DS",
    hardware: [nds,nds_board],
    order:[1,2]
}

