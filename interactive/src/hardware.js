import { Application, Assets, SCALE_MODES, Sprite } from 'pixi.js';


const board_front_t = await Assets.load('/assets/DS/ds_board_front.png');
const case_front_t = await Assets.load('/assets/DS/ds_case_front.png');
const battery_cell_t = await Assets.load('/assets/DS/ds_battery_cell_front.png');
const battery_front_t = await Assets.load('/assets/DS/ds_battery_lid_front.png');
const screw_front_t = await Assets.load('/assets/DS/screw.png');
const screw_weird_front_t = await Assets.load('/assets/DS/screw_weird.png');

const lbtn_2_t = await Assets.load('/assets/DS/lbtn.png');
const rbtn_2_t = await Assets.load('/assets/DS/rbtn.png');


const ds_slot_board_t = await Assets.load('/assets/DS/minigames/ds_slot_board.png');
const gba_slot_board_t = await Assets.load('/assets/DS/minigames/gba_slot_board.png');

const gba_slot_board_sprite = new Sprite(gba_slot_board_t);
const ds_slot_board_sprite = new Sprite(ds_slot_board_t);
gba_slot_board_sprite.scale.set(0.7)
ds_slot_board_sprite.scale.set(0.7)
gba_slot_board_sprite.anchor.set(0.5)
ds_slot_board_sprite.anchor.set(0.5)

const board_front_sprite = new Sprite(board_front_t);
const case_front_sprite = new Sprite(case_front_t);
const battery_cell_front_sprite = new Sprite(battery_cell_t);
const battery_lid_front_sprite = new Sprite(battery_front_t);
const screw_front_sprite = new Sprite(screw_front_t);
const screw_weird_sprite = new Sprite(screw_weird_front_t);

screw_weird_sprite.anchor.set(0.5);

screw_weird_sprite.scale.set(0.45);




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

lbtn_2_sprite.scale.set(0.8);
rbtn_2_sprite.scale.set(0.8);

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


const case_top_t = await Assets.load('/assets/DS/top_1/ds_front_case.png');
const gba_card_t = await Assets.load('/assets/DS/top_1/gba_card.png');

const case_top_sprite = new Sprite(case_top_t);
const gba_card_sprite = new Sprite(gba_card_t);

case_top_sprite.anchor.set(0.5);
case_top_sprite.scale.set(0.7);
gba_card_sprite.anchor.set(0.5);
gba_card_sprite.scale.set(0.7);



//Scene 1
var case_top = {
    id: 0,                                                      // ID
    sprite: case_top_sprite,                                  // Sprite
    offsets_x: null,                                            // Front, Back
    offsets_y: null,                                            // Front, Back
    parents: null,                                              // Parent layers
    atached: null,                                              // 
    atached_by: null,                                           // Layers that hold this in place (ex: screws or itself)
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0                                                    // Dirty? Broken?
}
var gba_card = {
    id: 1,                                                      // ID
    sprite: gba_card_sprite,                                        // Sprite
    offsets_x: [0],                    // Front, Back, 2 per parent
    offsets_y: [case_top_sprite.height / 1.25, 0],                       // 
    parents: [case_top_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 0,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}
export var top_1 = {
    hid: 1,
    name: "DS TOP 1",
    order: [0, 1],
    layers: [case_top, gba_card],
    has_steps: false
}

// Scene 2
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
    sprite: case_front_sprite,                                  // Sprite
    offsets_x: [board_front_sprite.x],                          // 
    offsets_y: [board_front_sprite.y],                          // 
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
    id: 3,                                                        // ID
    sprite: battery_lid_front_sprite,                             // Sprite
    offsets_x: [board_front_sprite.width / 3.29],                 // Offsets respective to the parent layers
    offsets_y: [board_front_sprite.height / 45],                  // 
    parents: [case_front_sprite],                                 // Parent layers
    parents_id: [1],                                              // Parent layers IDs
    atached_by: [4],                                              // Layers that hold this layer in place
    atached: [true],                                              // Parents currently atached to
    tool_needed: 3,                                               // Tool needed to interact with the layer
    state: 0,                                                     // State (Dirty? Broken?)
}


var screw_back_1 = {
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

var screw_back_2 = {
    id: 5,                                                                          // ID
    sprite: new Sprite(screw_front_t),
    offsets_x: [board_front_sprite.width / 4.2, 0],                              // Front, Back
    offsets_y: [-board_front_sprite.height / 2.4, 0],                             // 
    parents: [board_front_sprite],                                                // Parent layers
    parents_id: [2],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 1,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}
screw_back_2.sprite.anchor.set(0.5)
screw_back_2.sprite.scale.set(0.45)

var screw_back_3 = {
    id: 6,                                                                          // ID
    sprite: new Sprite(screw_front_t),
    offsets_x: [-board_front_sprite.width / 4.2, 0],                              // Front, Back
    offsets_y: [-board_front_sprite.height / 2.4, 0],                             // 
    parents: [board_front_sprite],                                                // Parent layers
    parents_id: [2],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 1,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}
screw_back_3.sprite.anchor.set(0.5)
screw_back_3.sprite.scale.set(0.45)

var screw_back_4 = {
    id: 7,                                                                          // ID
    sprite: new Sprite(screw_weird_front_t),
    offsets_x: [-board_front_sprite.width / 3, 0],                              // Front, Back
    offsets_y: [-board_front_sprite.height / 3.8, 0],                             // 
    parents: [board_front_sprite],                                                // Parent layers
    parents_id: [2],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 2,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}
screw_back_4.sprite.anchor.set(0.5)
screw_back_4.sprite.scale.set(0.45)

var screw_back_5 = {
    id: 8,                                                                          // ID
    sprite: new Sprite(screw_weird_front_t),
    offsets_x: [-board_front_sprite.width / 3, 0],                              // Front, Back
    offsets_y: [+board_front_sprite.height / 5, 0],                             // 
    parents: [board_front_sprite],                                                // Parent layers
    parents_id: [2],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 2,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}
screw_back_5.sprite.anchor.set(0.5)
screw_back_5.sprite.scale.set(0.45)

var screw_back_6 = {
    id: 9,                                                                          // ID
    sprite: new Sprite(screw_weird_front_t),
    offsets_x: [0, 0],                              // Front, Back
    offsets_y: [-board_front_sprite.height / 3.2, 0],                             // 
    parents: [board_front_sprite],                                                // Parent layers
    parents_id: [2],
    atached_by: null,                                                               // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                                                // 
    tool_needed: 2,                                                                 // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                                       // Dirty? Broken?
}
screw_back_6.sprite.anchor.set(0.5)
screw_back_6.sprite.scale.set(0.45)

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

//Scene 3

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
    offsets_x: [-board_front_sprite_s2.width / 2.4, 0],                       // Front, Back, 2 per parent
    offsets_y: [-board_front_sprite_s2.height / 2.4, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 3,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 1,                                                   // Dirty? Broken?
}

var btnr_s2 = {
    id: 2,                                                      // ID
    sprite: rbtn_2_sprite,                                  // Sprite
    offsets_x: [board_front_sprite_s2.width / 2.4, 0],                       // Front, Back, 2 per parent
    offsets_y: [-board_front_sprite_s2.height / 2.4, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 3,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 1,                                                   // Dirty? Broken?
}



export function getAbsoluteLocalParent(id, hardware) {      //Returns the furthest parent this layer is atached to
    //console.log("Searching parents of: " + id,hardware);

    var hasParent = false;
    var layer = getLayer(id, hardware);
    var toReturn = getLayer(id, hardware);

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
            toReturn = getAbsoluteLocalParent(layer.parents_id[i], hardware);
        }
    }
    return toReturn;
}
export function getAbsoluteLocalParentID(id, hardware) {        //Returns the id of the furthest parent this layer is atached to
    //console.log("Searching parents of: " + id,hardware);

    var hasParent = false;
    var layer = getLayer(id, hardware);
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
            toReturn = getAbsoluteLocalParentID(layer.parents_id[i], hardware);
        }
    }
    return toReturn;
}
export function getLayer(id, hardware) {                        //Returns the layer asociated with the id
    var toReturn = null;
    hardware.layers.forEach(element => {
        if (element.id == id) {
            //console.log("Layer " + id + " exists!")
            toReturn = element;
        }
    });
    return toReturn;
}
export function atachedToAnything(id, hardware) {               //Bool if layer is atached to anything
    var layer = getLayer(id, hardware);
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
export function atachedTo(id, hardware) {                    //Layers atached to
    var layer = getLayer(id, hardware);
    var toReturn = []
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == true) {
                toReturn.push(getLayer(layer.parents_id[i], hardware))
            }
        }
    }
    return toReturn;
}
export function getParents(id, hardware) {                      //Returns parents
    var layer = getLayer(id, hardware);
    var toReturn = []
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            toReturn.push(getLayer(layer.parents_id[i], hardware))
        }
    }
    return toReturn;
}
export function notAtachedTo(id, hardware) {                 //Parents not atached to
    var layer = getLayer(id, hardware);
    var toReturn = []
    if (layer.atached != null) {
        for (let i = 0; i < layer.atached.length; i++) {
            if (layer.atached[i] == false) {
                toReturn.push(getLayer(layer.parents_id[i], hardware))
            }
        }
    }
    return toReturn;
}



export var nds = {
    hid: 2,
    name: "DS Back 1",
    order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    layers: [board, case_ds, battery_cell, battery_lid, screw_back_1, screw_back_2, screw_back_3, screw_back_4, screw_back_5, screw_back_6,],
    has_steps: false
}

export var nds_board = {
    hid: 3,
    name: "DS Board 1",
    order: [0, 1, 2],
    layers: [board_s2, btnl_s2, btnr_s2],
    has_steps: false
}

export var ds_btns_ds = {
    name: "DS",
    current: 0,
    hardware: [top_1, nds, nds_board],
    order: [1, 2, 3],
    conditions: [() => { return gba_card.atached[0] == false }, () => {
        return nds.layers[2].atached[0] == false &&
            nds.layers[5].atached[0] == false &&
            nds.layers[6].atached[0] == false &&
            nds.layers[7].atached[0] == false &&
            nds.layers[8].atached[0] == false &&
            nds.layers[9].atached[0] == false
    }]
    //()=>{return btnl_s2.state == 0 && btnr_s2.state == 0}
}



// Scene 5 (new)

var board_s2_slots = {
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

var btnl_s2_fixed = {
    id: 1,                                                      // ID
    sprite: new Sprite(lbtn_2_t),                                  // Sprite
    offsets_x: [-board_front_sprite_s2.width / 2.4, 0],                       // Front, Back, 2 per parent
    offsets_y: [-board_front_sprite_s2.height / 2.4, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: [1],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}

var btnr_s2_fixed = {
    id: 2,                                                      // ID
    sprite: new Sprite(rbtn_2_t),                                  // Sprite
    offsets_x: [board_front_sprite_s2.width / 2.4, 0],                       // Front, Back, 2 per parent
    offsets_y: [-board_front_sprite_s2.height / 2.4, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: [2],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}



btnr_s2_fixed.sprite.anchor.set(0.5);
btnl_s2_fixed.sprite.anchor.set(0.5);

btnr_s2_fixed.sprite.scale.set(0.8);
btnl_s2_fixed.sprite.scale.set(0.8);
// gba_slot_board_t
// ds_slot_board_t
const gba_slot_t = await Assets.load('/assets/DS/minigames/gba_slot.png');
const ds_slot_t = await Assets.load('/assets/DS/minigames/ds_slot.png');

const gba_slot_sprite = new Sprite(gba_slot_t);
const ds_slot_sprite = new Sprite(ds_slot_t);



var ds_slot_minigame = {
    id: 3,                                                      // ID
    sprite: new Sprite(ds_slot_board_t),        // Sprite
    offsets_x: [0],                       // Front, Back, 2 per parent
    offsets_y: [-board_front_sprite_s2.height / 4.8, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: [2],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 4,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken? Solder?
    minigame_info: null,
    minigame_done: false
}
var ds_slot_minigame_info = {
    sprite: new Sprite(ds_slot_t),
    continuity_spots_x: [0, 0], //Pairs of 2, as offsets
    continuity_spots_y: [0, 0],
    solder_spot_x: 0,
    solder_spot_y: 0,
    spots: [true, true]
}
ds_slot_minigame.minigame_info = ds_slot_minigame_info;
ds_slot_minigame_info.sprite.scale.set(0.4)
ds_slot_minigame_info.sprite.anchor.set(0.5)
ds_slot_minigame_info.continuity_spots_x = [0, -15]
ds_slot_minigame_info.continuity_spots_y = [ds_slot_minigame_info.sprite.height / 4,
ds_slot_minigame_info.sprite.width / 5]
ds_slot_minigame_info.solder_spot_x = 0;
ds_slot_minigame_info.solder_spot_y = ds_slot_minigame_info.sprite.width / 6.2

ds_slot_minigame.sprite.anchor.set(0.5)
ds_slot_minigame.sprite.scale.set(0.42);

var gba_slot_minigame = {
    id: 4,                                                      // ID
    sprite: new Sprite(gba_slot_board_t),                       // Sprite
    offsets_x: [0],                                                  // Front, Back, 2 per parent
    offsets_y: [+board_front_sprite_s2.height / 4.4, 0],                       // 
    parents: [board_front_sprite_s2],                              // Parent layers
    parents_id: [0],
    atached_by: [2],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 6,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken? Solder?
    minigame_info: null,
    minigame_done: false
}
var gba_slot_minigame_info = {
    sprite: new Sprite(gba_slot_t),
    continuity_spots_x: [0, 0], //Pairs of 2, as offsets
    continuity_spots_y: [0, 0],
    solder_spot_x: 0,
    solder_spot_y: 0,
    spots: [true, true]
}
gba_slot_minigame.minigame_info = gba_slot_minigame_info;
gba_slot_minigame_info.sprite.scale.set(0.4)
gba_slot_minigame_info.sprite.anchor.set(0.5)
gba_slot_minigame_info.continuity_spots_x = [0, -49]
gba_slot_minigame_info.continuity_spots_y = [gba_slot_minigame_info.sprite.height / 5,
gba_slot_minigame_info.sprite.height / 9]
gba_slot_minigame_info.solder_spot_x = 0;
gba_slot_minigame_info.solder_spot_y = gba_slot_minigame_info.sprite.width / 6.2

gba_slot_minigame.sprite.anchor.set(0.5)
gba_slot_minigame.sprite.scale.set(0.42);

gba_slot_minigame.sprite.anchor.set(0.5)
gba_slot_minigame.sprite.scale.set(0.42);
export var nds_board_slots = {
    hid: 3,
    name: "DS Board 2",
    order: [0, 1, 2, 3],
    layers: [board_s2_slots, btnl_s2_fixed, btnr_s2_fixed, ds_slot_minigame, gba_slot_minigame],
    has_steps: false
}

export var ds_slots_ds = {
    name: "DS",
    current: 2,
    hardware: [top_1, nds, nds_board_slots],
    order: [1, 2, 3],
    conditions: [() => { return gba_card.atached[0] == false }, () => {
        return nds.layers[2].atached[0] == false &&
            nds.layers[5].atached[0] == false &&
            nds.layers[6].atached[0] == false &&
            nds.layers[7].atached[0] == false &&
            nds.layers[8].atached[0] == false &&
            nds.layers[9].atached[0] == false
    }, () => { return ds_slot_minigame.minigame_done == true && gba_slot_minigame.minigame_done == true }]
}
const bottom_screen_t = await Assets.load('/assets/DS/bottom_screen/bottom_screen.png');
const bottom_screen_sprite = new Sprite(bottom_screen_t);
bottom_screen_sprite.anchor.set(0.5)
bottom_screen_sprite.scale.set(0.5)

const buttons_front_t = await Assets.load('/assets/DS/bottom_screen/front_btns.png');
const buttons_front_sprite = new Sprite(buttons_front_t);
buttons_front_sprite.anchor.set(0.5)
buttons_front_sprite.scale.set(0.52)

const buttons_dpad_t = await Assets.load('/assets/DS/bottom_screen/front_btns.png');
const buttons_dpad_sprite = new Sprite(buttons_dpad_t);
buttons_dpad_sprite.anchor.set(0.5)
buttons_dpad_sprite.scale.set(0.52)
// Scene 5
var board_btn_front = {
    id: 0,                                                      // ID
    sprite: bottom_screen_sprite,                                  // Sprite
    offsets_x: null,                                            // Front, Back
    offsets_y: null,                                            // Front, Back
    parents: null,                                              // Parent layers
    atached: null,                                              // 
    atached_by: null,                                           // Layers that hold this in place (ex: screws or itself)
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0                                                    // Dirty? Broken?
}
var btnfront1 = {
    id: 1,                                                      // ID
    sprite: buttons_front_sprite,                                  // Sprite
    offsets_x: [-bottom_screen_sprite.width / 2.725, 0],                       // Front, Back, 2 per parent
    offsets_y: [-5, 0],                       // 
    parents: [bottom_screen_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: [1],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 3,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 1,                                                   // Dirty? Broken?
}

var btnfront2 = {
    id: 2,                                                      // ID
    sprite: buttons_dpad_sprite,                                  // Sprite
    offsets_x: [bottom_screen_sprite.width / 2.8, 0],                       // Front, Back, 2 per parent
    offsets_y: [-5, 0],                         // 
    parents: [bottom_screen_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: [2],                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 3,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 1,                                                   // Dirty? Broken?
}
export var nds_bottom_btns = {
    hid: 3,
    name: "DS Bottom board with button cleaning minigames",
    layers: [board_btn_front, btnfront1, btnfront2]                        
}

export var ds_btns_front_ds = {
    name: "DS",
    current: 0,
    hardware: [nds_bottom_btns],
    order: [1],
    conditions: [() => { return btnfront1.state == 0 && btnfront2.state == 0 }]
    //()=>{return btnl_s2.state == 0 && btnr_s2.state == 0}
}

const wire_t = await Assets.load('/assets/DS/bottom_screen/wire_screen_bottom.png');
const wire_sprite = new Sprite(wire_t);
wire_sprite.anchor.set(0.5)
wire_sprite.scale.set(0.35)

const wire_dead_t = await Assets.load('/assets/DS/bottom_screen/wire_screen_bottom_death.png');
const wire_dead_sprite = new Sprite(wire_dead_t);
wire_dead_sprite.anchor.set(0.5)
wire_dead_sprite.scale.set(0.35)

// Scene 6
var board_wire_front = {
    id: 0,                                                      // ID
    sprite: bottom_screen_sprite,                                  // Sprite
    offsets_x: null,                                            // Front, Back
    offsets_y: null,                                            // Front, Back
    parents: null,                                              // Parent layers
    atached: null,                                              // 
    atached_by: null,                                           // Layers that hold this in place (ex: screws or itself)
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0                                                    // Dirty? Broken?
}
var wire_broken = {
    id: 1,                                                      // ID
    sprite: wire_dead_sprite,                                  // Sprite
    offsets_x: [bottom_screen_sprite.width / 3, 0],                       // Front, Back, 2 per parent
    offsets_y: [-33, 0],                       // 
    parents: [bottom_screen_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 0,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}

var wire_regular = {
    id: 2,                                                      // ID
    sprite: wire_sprite,                                  // Sprite
    offsets_x: [bottom_screen_sprite.width / 3, 0],                       // Front, Back, 2 per parent
    offsets_y: [-33, 0],                       // 
    parents: [bottom_screen_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [false],                                            // 
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}
export var nds_cable_change = {
    hid: 3,
    name: "DS Board 2",
    order: [0, 1, 2],
    layers: [board_wire_front, wire_broken, wire_regular],
    has_steps: false
}

export var board_wire_front_scene = {
    name: "DS",
    current: 0,
    hardware: [nds_cable_change],
    order: [1],
    conditions: [() => { return wire_regular.atached[0] == true && wire_broken.atached[0] != true }]
    //()=>{return btnl_s2.state == 0 && btnr_s2.state == 0}
}

const screen_t = await Assets.load('/assets/DS/bottom_screen/screen.png');
const screen_sprite = new Sprite(screen_t);
screen_sprite.anchor.set(0.5)
screen_sprite.scale.set(0.5)

const screen_dead_t = await Assets.load('/assets/DS/bottom_screen/screen_dead.png');
const screen_dead_sprite = new Sprite(screen_dead_t);
screen_dead_sprite.anchor.set(0.5)
screen_dead_sprite.scale.set(0.5)


// Scene 7
var board_screen_front = {
    id: 0,                                                      // ID
    sprite: bottom_screen_sprite,                                  // Sprite
    offsets_x: null,                                            // Front, Back
    offsets_y: null,                                            // Front, Back
    parents: null,                                              // Parent layers
    atached: null,                                              // 
    atached_by: null,                                           // Layers that hold this in place (ex: screws or itself)
    tool_needed: -1,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0                                                    // Dirty? Broken?
}
var screen_broken = {
    id: 1,                                                      // ID
    sprite: screen_dead_sprite,                                  // Sprite
    offsets_x: [-10, 0],                       // Front, Back, 2 per parent
    offsets_y: [-10, 0],                       // 
    parents: [bottom_screen_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [true],                                            // 
    tool_needed: 0,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}

var screen_regular = {
    id: 2,                                                      // ID
    sprite: screen_sprite,                                  // Sprite
    offsets_x: [-10, 0],                       // Front, Back, 2 per parent
    offsets_y: [-10, 0],                       // 
    parents: [bottom_screen_sprite],                              // Parent layers
    parents_id: [0],
    atached_by: null,                                            // Layers that hold this in place (ex: screws or itself)
    atached: [false],                                            // 
    tool_needed: 0,                                            // Tool needed to interact with the layer (-1 means nothing)
    state: 0,                                                   // Dirty? Broken?
}
export var nds_screen_change = {
    hid: 3,
    name: "DS Board 2",
    order: [0, 1, 2],
    layers: [board_screen_front, screen_broken, screen_regular],
    has_steps: false
}

export var board_screenfront_scene = {
    name: "DS",
    current: 0,
    hardware: [nds_screen_change],
    order: [1],
    conditions: [() => { return screen_regular.atached[0] == true && screen_broken.atached[0] != true }]
    //()=>{return btnl_s2.state == 0 && btnr_s2.state == 0}
}