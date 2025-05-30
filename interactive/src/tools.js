import { Application, Assets, SCALE_MODES, Sprite } from 'pixi.js';
const screwdriver_texture = await Assets.load('/assets/eines/screwdriver.png');
const screwdriver_weird_texture = await Assets.load('/assets/eines/screwdriver_weird.png');
const chisel_texture = await Assets.load('/assets/eines/chisel.png');
const multimeter_texture = await Assets.load('/assets/eines/multimeter.png');
const qtip_texture = await Assets.load('/assets/eines/qtip.png');
const solder_texture = await Assets.load('/assets/eines/solder.png');
const wood_texture = await Assets.load('/assets/eines/wood.png');
const hand_texture = await Assets.load('/assets/eines/hando.png');


const screwdriver_sprite = new Sprite(screwdriver_texture);
const screwdriver_weird_sprite = new Sprite(screwdriver_weird_texture);
const chisel_sprite = new Sprite(chisel_texture);
const multimeter_sprite = new Sprite(multimeter_texture);
const qtip_sprite = new Sprite(qtip_texture);
const solder_sprite = new Sprite(solder_texture);
const wood_sprite = new Sprite(wood_texture);
const hand_sprite = new Sprite(hand_texture);



const screwdriver_sprite_glif = new Sprite(screwdriver_texture);
const screwdriver_weird_sprite_glif = new Sprite(screwdriver_weird_texture);
const chisel_sprite_glif = new Sprite(chisel_texture);
const multimeter_sprite_glif = new Sprite(multimeter_texture);
const qtip_sprite_glif = new Sprite(qtip_texture);
const solder_sprite_glif = new Sprite(solder_texture);
const hand_sprite_glif = new Sprite(hand_texture);

export const tools = {
    glifs: [hand_sprite_glif,screwdriver_sprite_glif, screwdriver_weird_sprite_glif, chisel_sprite_glif, multimeter_sprite_glif, qtip_sprite_glif, solder_sprite_glif],
    selected: 0,
    screwdriver: {
        id: 1,
        sprite: screwdriver_sprite
    },
    screwdriver_weird: {
        id: 2,
        sprite: screwdriver_weird_sprite
    },
    chisel: {
        id: 3,
        sprite: chisel_sprite
    },
    multimeter: {
        id: 4,
        sprite: multimeter_sprite
    },
    qtip: {
        id: 5,
        sprite: qtip_sprite
    },
    solder: {
        id: 6,
        sprite: solder_sprite
    },
    hand: {
        id: 0,
        sprite: hand_sprite
    },
    table: {
        sprite: wood_sprite
    }


}
export function getTool(id) {       //Returns the layer asociated with the id
    for (const [key, value] of Object.entries(tools)) {
        if (value.id != null && value.id == id) {
            return value;
        }
    }
    return null;
}