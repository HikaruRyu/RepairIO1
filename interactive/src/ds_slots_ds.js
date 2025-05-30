import { Application, Assets, SCALE_MODES, Sprite, RenderTexture, Graphics, Rectangle, TextStyle } from 'pixi.js';
import { ds_slots_ds, nds, nds_board, top_1, getLayer, getAbsoluteLocalParent, atachedToAnything, getParents } from './hardware.js';
import { tools } from "./tools.js";

(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    var dragTarget = null;
    var dragLayer = null;
    var mouseOverLayer = null;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerup', onDragEnd);
    app.stage.on('pointerupoutside', onDragEnd);

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    //Instanciate hardware and tools
    var hardware = ds_slots_ds.hardware[ds_slots_ds.current];

    const dirt_t = await Assets.load('/assets/DS/dirt.png');
    const dirt_p = []

    instanciate_hardware(hardware);
    instanciate_tools(tools);

    //Change scene button
    const btnon_t = await Assets.load('/assets/scenebtn_on.png');
    const btnoff_t = await Assets.load('/assets/scenebtn_off.png');

    const button_spr = new Sprite(btnon_t);
    app.stage.addChild(button_spr);
    button_spr.x += 550;
    button_spr.eventMode = 'static';
    button_spr.on('pointerdown', scene_change);
    //button_spr.texture = ht

    function scene_change() {
        //console.log(ds_slots_ds.conditions[ds_slots_ds.current])
        //console.log(getLayer(2,hardware))
        if (ds_slots_ds.current + 1 == ds_slots_ds.hardware.length) {
            window.location.reload();
        }
        if (ds_slots_ds.conditions[ds_slots_ds.current]()) {
            ds_slots_ds.current += 1;
            //app.stage.removeChildren()
            hardware.layers.forEach(element => {
                element.sprite.destroy()
            });
            dragTarget = null;
            dragLayer = null;
            hardware = ds_slots_ds.hardware[ds_slots_ds.current];
            instanciate_hardware(hardware);
            app.stage.addChild(ds_slots_ds.texts[ds_slots_ds.current - 1]).destroy();

        }
    }


    //Executes each tick, delta stores deltatime (time between frames)
    app.ticker.add((delta) => {
        if (ds_slots_ds.current == ds_slots_ds.conditions.length || !ds_slots_ds.conditions[ds_slots_ds.current]()) {
            button_spr.texture = btnoff_t
        } else if (ds_slots_ds.conditions[ds_slots_ds.current]()) {
            button_spr.texture = btnon_t

        }
        //For each layer...
        hardware.layers.forEach(element => {
            let count = 0;
            //If element is not atached to anything, rotate it
            if (!atachedToAnything(element.id, hardware) && element.parents != null && element.parents.length != 0) {
                element.sprite.rotation = 0.01;
            } else {
                //If not, un-rotate it unless we're hovering over it
                if (element != mouseOverLayer) {
                    element.sprite.rotation = 0;
                }

            }
            //If the element has parents, atach it to them
            if (element.parents == null) {
            } else {
                for (let index = 0; index < element.parents.length; index++) {
                    const parent = element.parents[index];
                    if (element.atached != null && element.atached[index] == true) {
                        element.sprite.x = parent.x + element.offsets_x[index];
                        element.sprite.y = parent.y + element.offsets_y[index];
                        break;
                    }
                }
            }
            if (element.state == 1) {
                dirt_p.forEach(particle => {
                    if (particle.to_layer == element.id) {
                        if (particle.offsets_type == 1) {
                            particle.spr.x = element.sprite.x - element.sprite.width / 3;
                            particle.spr.y = element.sprite.y - element.sprite.height / 10;
                        } else if (particle.offsets_type == 2) {
                            particle.spr.x = element.sprite.x + element.sprite.width / 13;
                            particle.spr.y = element.sprite.y - element.sprite.height / 4;
                        }
                    }

                });
            }
        });
    });

    //Instanciate tools
    //  Put sprites into scene, and add events
    function instanciate_tools(tools) {
        let x = 18;
        app.stage.addChild(tools.table.sprite)
        tools.table.sprite.scale.set(1.6)
        for (const [key, value] of Object.entries(tools)) {
            if (value.id != null) {
                value.sprite.scale.set(0.14);
                value.sprite.x = x;
                value.sprite.y = 20;
                x += 50;
                if (value.id == 4) {
                    x += 70;
                }
                if (value.id == 0) {
                    value.sprite.x += 15;
                }
                value.sprite.eventMode = 'static';
                value.sprite.anchor.set(0.5);
                value.sprite.x += value.sprite.width / 2;
                value.sprite.y += value.sprite.height / 2;
                value.sprite.on('pointerdown', selectTool, value);
                value.sprite.on('mouseenter', tool_pointer_feedback_start, value.sprite);
                value.sprite.on('mouseleave', tool_pointer_feedback_end, value.sprite);

                app.stage.addChild(value.sprite)
            }
        }
    }


    //Instanciate hardware
    //  Put sprites into scene, and add events
    function instanciate_hardware(hardware) {
        let count = 0;
        console.log(hardware)
        hardware.layers.forEach(element => {
            // console.log("WA")
            // console.log(element)

            app.stage.addChild(element.sprite);
            element.sprite.eventMode = 'static';
            element.sprite.on('pointerdown', onDragStart, element);
            element.sprite.on('mouseenter', piece_pointer_feedback_start, element);
            element.sprite.on('mouseleave', piece_pointer_feedback_end, element);

            if (element.parents == null) {
                element.sprite.x = app.screen.width / 2;
                element.sprite.y = app.screen.height / 2;
            } else {
                for (let index = 0; index < element.parents.length; index++) {
                    const parent = element.parents[index];
                    if (element.atached != null) {
                        element.sprite.x = parent.x + element.offsets_x[index];
                        element.sprite.y = parent.y + element.offsets_y[index];
                        break;
                    }
                }
            }
            if (element.state == 1) {
                dirt_p.push(
                    { spr: new Sprite(dirt_t), to_layer: element.id, to_count: count, offsets_type: 1 })
                dirt_p[count].spr.eventMode = 'static';
                dirt_p[count].spr.on("pointerdown", cleanDirt, dirt_p[count])
                dirt_p[count].spr.x = element.sprite.x - element.sprite.width / 3;
                dirt_p[count].spr.y = element.sprite.y - element.sprite.height / 3.5;
                app.stage.addChild(dirt_p[count].spr)

                count += 1;
                dirt_p.push(
                    { spr: new Sprite(dirt_t), to_layer: element.id, to_count: count, offsets_type: 2 })
                dirt_p[count].spr.eventMode = 'static';
                dirt_p[count].spr.on("pointerdown", cleanDirt, dirt_p[count])
                dirt_p[count].spr.x = element.sprite.x + element.sprite.width / 13;
                dirt_p[count].spr.y = element.sprite.y;
                app.stage.addChild(dirt_p[count].spr)
                count += 1;
            }
        });
        var style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: { color: '#000000', width: 5, join: 'round' },
            dropShadow: {
                color: '#000000',
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },
            wordWrap: true,
            wordWrapWidth: 300,
        });
        ds_slots_ds.texts[ds_slots_ds.current].x = 800;
        ds_slots_ds.texts[ds_slots_ds.current].style = style;
        app.stage.addChild(ds_slots_ds.texts[ds_slots_ds.current]);
    }

    function cleanDirt() {
        if (tools.selected == 5) {
            let count = 0;
            let to_layer = this.to_layer;

            this.spr.visible = false;
            dirt_p.forEach(particle => {
                if (particle.to_layer == this.to_layer) {
                    count += 1;
                }
            });
            this.to_layer = -1;
            count -= 1;
            if (count == 0) {
                getLayer(to_layer, hardware).state = 0;
            }
        }
    }

    //Makes a layer slightly larger
    function piece_pointer_feedback_start() {
        mouseOverLayer = this;
        if (this.tool_needed == tools.selected || !atachedToAnything(this.id, hardware) && this.parents != null) {
            this.sprite.rotation += 0.03;
            this.sprite.scale.x += 0.015;
            this.sprite.scale.y += 0.015;
        }

    }

    //Makes a layer tinier again
    function piece_pointer_feedback_end() {
        mouseOverLayer = null;
        this.sprite.rotation = 0;
        if (this.tool_needed == tools.selected || !atachedToAnything(this.id, hardware) && this.parents != null) {
            this.sprite.scale.x -= 0.015;
            this.sprite.scale.y -= 0.015;
        }
    }

    //Makes a tool slightly larger
    function tool_pointer_feedback_start() {
        this.scale.x += 0.015;
        this.rotation += 0.15;
        this.scale.y += 0.015;
    }

    //Makes a tool tinier again
    function tool_pointer_feedback_end() {
        this.rotation -= 0.15;
        this.scale.x -= 0.015;
        this.scale.y -= 0.015;
    }

    //Moves a sprite to the position of the cursor
    function onDragMove(event) {
        if (dragTarget) {
            dragTarget.parent.toLocal(event.global, null, dragTarget.position);
        }
    }

    //Glifs for the tools on the side of the cursor
    tools.glifs.forEach(element => {
        element.scale.set(0.035)
        app.stage.addChild(element)
        element.alpha = 0.9;
        element.visible = false;
        element.zIndex = 999;

    });

    //Self explainatory
    function selectTool() {
        tools.selected = this.id;
    }
    app.stage.on("pointermove", moveTool, tools);

    //Hides or shows gilfs depending on the selected tool
    function moveTool(event) {
        for (let i = 0; i < tools.glifs.length; i++) {
            tools.glifs[i].visible = false;
        }
        tools.glifs[tools.selected].visible = true;
        tools.glifs[tools.selected].parent.toLocal(event.global, null, tools.glifs[tools.selected].position);
        tools.glifs[tools.selected].x += 20;
    }


    //Dragging and interacting
    function onDragStart() {

        // Store a reference to the data
        // * The reason for this is because of multitouch *
        // * We want to track the movement of this particular touch *
        // * We also iterate recursively over the parents to select the highest parent
        dragTarget = getAbsoluteLocalParent(this.id, hardware).sprite;
        dragLayer = this;
        var layer = getLayer(this.id, hardware);

        //Tools, "screwing and unscrewing"
        if (tools.selected == layer.tool_needed && atachedToAnything(this.id, hardware) && layer.tool_needed != 4) {
            var count = 0;
            var is_atached = false;
            if (layer.atached_by != null) {
                for (let j = 0; j < layer.atached_by.length; j++) {
                    if (atachedToAnything(layer.atached_by[j], hardware)) {
                        is_atached = true;
                    }
                }
            }
            if (!is_atached) {
                for (let i = 0; i < layer.atached.length; i++) {
                    if (layer.atached[i] == true) {
                        count++;
                    }
                    layer.atached[i] = false;
                }
                if (count > 0) {
                    this.sprite.y += 50;
                }
            }
            dragLayer = null;
            dragTarget = null;
        }
        else if (tools.selected == layer.tool_needed && !atachedToAnything(this.id, hardware) && layer.tool_needed != 4) {
            var parents = getParents(dragLayer.id, hardware);
            let count = 0;
            parents.forEach(element => {
                if (dragLayer.atached[count] == false) {
                    let distance_x = (element.sprite.x + dragLayer.offsets_x[count]) - dragTarget.x;
                    let distance_y = (element.sprite.y + dragLayer.offsets_y[count]) - dragTarget.y;
                    let distance_t = Math.sqrt((distance_x * distance_x) + (distance_y * distance_y))
                    console.log("Distence = " + distance_t)
                    if (distance_t <= 10) {
                        dragTarget.x = (element.sprite.x + dragLayer.offsets_x[count]);
                        dragTarget.y = (element.sprite.y + dragLayer.offsets_y[count]);
                        dragLayer.atached[count] = true;
                        dragTarget.rotation = 0;
                        dragTarget.scale.x -= 0.015;
                        dragTarget.scale.y -= 0.015;
                    }
                }
                count++;
            });
        }

        if (layer.tool_needed == 4) {
            layer.sprite.on("pointerdown", minigame_multi, layer)
        }
        if (layer.tool_needed == 6) {
            layer.sprite.on("pointerdown", minigame_solder, layer)
        }

        if (dragTarget) {
            dragTarget.alpha = 0.5;
        }
        app.stage.on('pointermove', onDragMove);
    }
    const soldered_t = await Assets.load('/assets/DS/dirt.png');
    const plusminus_t = await Assets.load('/assets/DS/minigames/plusminus.png');
    var plusminus_s = new Sprite(plusminus_t);

    var graphics_solder = new Graphics();
    var graphics_solder2 = new Graphics();

    function minigame_solder() {
        var minigame_info = null;
        if (tools.selected != 6) {
            hardware.layers.forEach(element => {
                element.sprite.visible = true;
            });
            return 0;
        } else {
            graphics_solder.destroy()
            graphics_solder = new Graphics()
            graphics_solder2.destroy()
            graphics_solder2 = new Graphics()
            minigame_info = this.minigame_info
        }

        if (this.minigame_done == false) {
            hardware.layers.forEach(element => {
                element.sprite.visible = false;
            });
        }

        app.stage.addChild(minigame_info.sprite);
        minigame_info.sprite.eventMode = "static";
        minigame_info.sprite.x = app.stage.width / 1.3
        minigame_info.sprite.y = app.stage.height / 1.6
        minigame_info.sprite.on("pointerdown", check_solder, this)
        for (let i = 0; i < minigame_info.continuity_spots_x.length; i += 2) {
            // console.log(minigame_info.sprite.x + minigame_info.continuity_spots_x[i])
            // console.log(minigame_info.sprite.y + minigame_info.continuity_spots_y[i])
            //circles.push(new Sprite(texture_circle))
            graphics_solder.circle(minigame_info.sprite.x + minigame_info.continuity_spots_x[i],
                minigame_info.sprite.y + minigame_info.continuity_spots_y[i], 10);
            graphics_solder.fill(0x808080, 1);
            graphics_solder2.circle(minigame_info.sprite.x + minigame_info.continuity_spots_x[i + 1],
                minigame_info.sprite.y + minigame_info.continuity_spots_y[i + 1], 10);
            graphics_solder2.fill(0x808080, 1);

            //circles[i].y = minigame_info.sprite.y + minigame_info.continuity_spots_y[i]
            //circles[i].x = minigame_info.sprite.x + minigame_info.continuity_spots_x[i]
            graphics_solder.eventMode = "static"
            graphics_solder.hitArea = new Rectangle(0, 0, 0, 0);
            graphics_solder2.eventMode = "static"
            graphics_solder2.hitArea = new Rectangle(0, 0, 0, 0);
        }
        app.stage.addChild(graphics_solder)
        app.stage.addChild(graphics_solder2)

        if (this.minigame_done) {
            graphics_solder.destroy()
            graphics_solder2.destroy()

        }
    }
    function check_solder(event) {
        var minigame_info = this.minigame_info;
        var mousePosition = event.global.x + " " + event.global.y;
        // console.log(mousePosition)

        for (let i = 0; i < minigame_info.continuity_spots_x.length; i += 2) {
            var distance_x = (minigame_info.sprite.x + minigame_info.continuity_spots_x[i]) - event.global.x;
            var distance_y = (minigame_info.sprite.y + minigame_info.continuity_spots_y[i]) - event.global.y;
            var distance_t = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
            console.log("Distance: " + distance_t)
            plusminus_s.zIndex = 999;
            if (distance_t < 15 && tools.selected == 6) {
                graphics_solder.destroy();
                this.minigame_info.spots[0] = false;
            }
            distance_x = (minigame_info.sprite.x + minigame_info.continuity_spots_x[i + 1]) - event.global.x;
            distance_y = (minigame_info.sprite.y + minigame_info.continuity_spots_y[i + 1]) - event.global.y;
            distance_t = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
            console.log("Distance: " + distance_t)
            if (distance_t < 15 && tools.selected == 6) {
                graphics_solder2.destroy();
                this.minigame_info.spots[1] = false;

            }
        }
        let count = 0;
        minigame_info.spots.forEach(element => {
            if (element == true) {
                count++;
            }
        });
        if (count == 0) {
            //graphics_spots.visible = true;
            this.minigame_done = true
            if (!graphics_solder.destroyed) {
                graphics_solder.destroy()
                graphics_solder2.destroy()
            }
        }
        console.log("DONE: " + this.minigame_done)
        if (this.minigame_done) {
            hardware.layers.forEach(element => {
                element.sprite.visible = true;
            });
            graphics_solder.destroy();
            graphics_solder2.destroy()
            this.tool_needed = -1;
            minigame_info.sprite.visible = false;

        }
    }

    const cont_spots_p = []
    var texture_circle = new RenderTexture(app.renderer, 16, 16);
    var graphics = new Graphics();
    var graphics_spots = new Graphics();
    var multimeter_state = 0;
    function minigame_multi() {
        var minigame_info = null;
        if (tools.selected != 4) {
            hardware.layers.forEach(element => {
                element.sprite.visible = true;
            });
            return 0;
        } else {
            graphics_spots.destroy()
            graphics_spots = new Graphics()

            graphics.destroy()
            graphics = new Graphics()


            minigame_info = this.minigame_info
        }
        if (this.minigame_done == false) {
            hardware.layers.forEach(element => {
                element.sprite.visible = false;
            });
        }

        app.stage.addChild(minigame_info.sprite);
        minigame_info.sprite.eventMode = "static";
        minigame_info.sprite.x = app.stage.width / 1.3
        minigame_info.sprite.y = app.stage.height / 1.6
        app.stage.addChild(plusminus_s);
        plusminus_s.anchor.set(0.5)
        plusminus_s.scale.set(0.6)

        plusminus_s.x = minigame_info.sprite.x;
        plusminus_s.y = minigame_info.sprite.y + minigame_info.sprite.height / 1.3;
        plusminus_s.eventMode = "static";
        plusminus_s.on("pointerdown", multi_state, plusminus_s)
        minigame_info.sprite.on("pointerdown", check_spots, this)
        graphics_spots.hitArea = new Rectangle(0, 0, 0, 0);
        graphics_spots.visible = false;
        graphics_spots.circle(minigame_info.sprite.x + minigame_info.solder_spot_x,
            minigame_info.sprite.y + minigame_info.solder_spot_y, 10).fill(0x808080, 1);

        graphics_spots.alpha = 0.5;

        app.stage.addChild(graphics_spots)
        for (let i = 0; i < minigame_info.continuity_spots_x.length; i += 2) {
            // console.log(minigame_info.sprite.x + minigame_info.continuity_spots_x[i])
            // console.log(minigame_info.sprite.y + minigame_info.continuity_spots_y[i])
            //circles.push(new Sprite(texture_circle))
            graphics.circle(minigame_info.sprite.x + minigame_info.continuity_spots_x[i],
                minigame_info.sprite.y + minigame_info.continuity_spots_y[i], 10);
            graphics.fill(0xde3249, 1);
            graphics.circle(minigame_info.sprite.x + minigame_info.continuity_spots_x[i + 1],
                minigame_info.sprite.y + minigame_info.continuity_spots_y[i + 1], 10);
            graphics.fill(0x000000, 1);

            //circles[i].y = minigame_info.sprite.y + minigame_info.continuity_spots_y[i]
            //circles[i].x = minigame_info.sprite.x + minigame_info.continuity_spots_x[i]
            graphics.eventMode = "static"
            graphics.hitArea = new Rectangle(0, 0, 0, 0);
        }
        app.stage.addChild(graphics)
        if (this.minigame_done) {
            graphics.destroy()

        }
    }
    function multi_state(event) {
        if (event.global.x < this.x) {
            multimeter_state = 1; //plus
        } else {
            multimeter_state = 2; //minus
        }
    }
    function check_spots(event) {
        console.log("CHECK SPOTS")
        var minigame_info = this.minigame_info;
        var mousePosition = event.global.x + " " + event.global.y;
        // console.log(mousePosition)

        for (let i = 0; i < minigame_info.continuity_spots_x.length; i += 2) {
            // console.log(minigame_info.sprite.x + minigame_info.continuity_spots_x[i])
            // console.log(minigame_info.sprite.y + minigame_info.continuity_spots_y[i])

            var distance_x = (minigame_info.sprite.x + minigame_info.continuity_spots_x[i]) - event.global.x;
            var distance_y = (minigame_info.sprite.y + minigame_info.continuity_spots_y[i]) - event.global.y;
            var distance_t = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
            console.log("Distance: " + distance_t)
            plusminus_s.zIndex = 999;
            if (distance_t < 15 && multimeter_state == 1) {
                console.log("YEAGHDIK")
                graphics.moveTo(plusminus_s.x - plusminus_s.width / 4, plusminus_s.y).
                    lineTo(minigame_info.sprite.x + minigame_info.continuity_spots_x[i],
                        minigame_info.sprite.y + minigame_info.continuity_spots_y[i])
                    .stroke({ color: 0xde3249, pixelLine: false, width: 8 })
                minigame_info.spots[i] = false;
            }
            distance_x = (minigame_info.sprite.x + minigame_info.continuity_spots_x[i + 1]) - event.global.x;
            distance_y = (minigame_info.sprite.y + minigame_info.continuity_spots_y[i + 1]) - event.global.y;
            distance_t = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
            console.log("Distance: " + distance_t)
            if (distance_t < 15 && multimeter_state == 2) {
                console.log("YEAGHDIdwwdK")
                graphics.moveTo(plusminus_s.x + plusminus_s.width / 4, plusminus_s.y).
                    lineTo(minigame_info.sprite.x + minigame_info.continuity_spots_x[i + 1],
                        minigame_info.sprite.y + minigame_info.continuity_spots_y[i + 1])
                    .stroke({ color: 0x000000, pixelLine: false, width: 8 })
                minigame_info.spots[i + 1] = false;

            }
        }
        let count = 0;
        minigame_info.spots.forEach(element => {
            if (element == true) {
                count++;
            }
        });
        if (count == 0) {
            graphics_spots.visible = true;
            if (!graphics.destroyed) {
                graphics.destroy()
            }
            if (tools.selected == 6) {
                var distance_x = (minigame_info.sprite.x + minigame_info.solder_spot_x) - event.global.x;
                var distance_y = (minigame_info.sprite.y + minigame_info.solder_spot_y) - event.global.y;
                var distance_t = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
                if (distance_t < 15) {
                    graphics_spots.alpha = 1;
                    this.minigame_done = true;
                }
            }
        }
        console.log("DONE: " + this.minigame_done)
        if (this.minigame_done) {
            hardware.layers.forEach(element => {
                element.sprite.visible = true;
            });
            graphics_spots.destroy();
            graphics.destroy()
            this.tool_needed = -1;
            plusminus_s.visible = false;
            plusminus_s.removeAllListeners();
            minigame_info.sprite.visible = false;

        }
    }



    function onDragEnd() {
        if (dragTarget) {
            app.stage.off('pointermove', onDragMove);
            dragTarget.alpha = 1;
            var parents = getParents(dragLayer.id, hardware);
            let count = 0;
            parents.forEach(element => {
                if (dragLayer.atached[count] == false) {
                    let distance_x = (element.sprite.x + dragLayer.offsets_x[count]) - dragTarget.x;
                    let distance_y = (element.sprite.y + dragLayer.offsets_y[count]) - dragTarget.y;
                    let distance_t = Math.sqrt((distance_x * distance_x) + (distance_y * distance_y))
                    console.log("Distence = " + distance_t)
                    if (distance_t <= 20) {
                        dragTarget.x = (element.sprite.x + dragLayer.offsets_x[count]);
                        dragTarget.y = (element.sprite.y + dragLayer.offsets_y[count]);
                        if (dragLayer.tool_needed == -1 || dragLayer.tool_needed == 3 || dragLayer.tool_needed == 0) {
                            dragLayer.atached[count] = true;
                            dragTarget.rotation = 0;
                            dragTarget.scale.x -= 0.015;
                            dragTarget.scale.y -= 0.015;
                        }
                    }
                }
                count++;
            });
            dragTarget = null;
            dragLayer = null;
        }
    }


})();
