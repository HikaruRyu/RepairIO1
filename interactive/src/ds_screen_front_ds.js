import { Application, Assets, SCALE_MODES, Sprite, TextStyle } from 'pixi.js';
import { nds_bottom_btns, board_screenfront_scene, nds_board, top_1, getLayer, getAbsoluteLocalParent, atachedToAnything, getParents } from './hardware.js';
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
    document.addEventListener('keydown', onKeyDown);

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    //Instanciate hardware and tools
    var hardware = board_screenfront_scene.hardware[board_screenfront_scene.current];
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
        console.log(board_screenfront_scene.conditions[board_screenfront_scene.current])
        console.log(getLayer(2, hardware))
        if (board_screenfront_scene.current + 1 == board_screenfront_scene.hardware.length) {
            window.location.reload();
        }
        if (board_screenfront_scene.conditions[board_screenfront_scene.current]()) {
            board_screenfront_scene.current += 1;
            //app.stage.removeChildren()
            hardware.layers.forEach(element => {
                element.sprite.destroy()
            });
            dragTarget = null;
            dragLayer = null;
            hardware = board_screenfront_scene.hardware[board_screenfront_scene.current];
            instanciate_hardware(hardware);
            app.stage.addChild(board_screenfront_scene.texts[board_screenfront_scene.current - 1]).destroy();

        }
    }


    //Executes each tick, delta stores deltatime (time between frames)
    app.ticker.add((delta) => {
        if (board_screenfront_scene.current == board_screenfront_scene.conditions.length || !board_screenfront_scene.conditions[board_screenfront_scene.current]()) {
            button_spr.texture = btnoff_t
        } else if (board_screenfront_scene.conditions[board_screenfront_scene.current]()) {
            button_spr.texture = btnon_t

        }
        //For each layer...
        hardware.layers.forEach(element => {
            let count = 0;
            //If element is not atached to anything, rotate it
            if (!atachedToAnything(element.id, hardware) && element.parents != null && element.parents.length != 0) {
                //element.sprite.rotation = 0.01;
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
        hardware.layers.forEach(element => {
            console.log(element)

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
        hardware.layers[2].sprite.x += 500;
        hardware.layers[2].sprite.y -= 190;
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
        board_screenfront_scene.texts[board_screenfront_scene.current].x = 800;
        board_screenfront_scene.texts[board_screenfront_scene.current].style = style;
        app.stage.addChild(board_screenfront_scene.texts[board_screenfront_scene.current]);
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
            //this.sprite.scale.x += 0.015;
            //this.sprite.scale.y += 0.015;
        }

    }

    //Makes a layer tinier again
    function piece_pointer_feedback_end() {
        mouseOverLayer = null;
        this.sprite.rotation = 0;
        if (this.tool_needed == tools.selected || !atachedToAnything(this.id, hardware) && this.parents != null) {
            //this.sprite.scale.x -= 0.015;
            //this.sprite.scale.y -= 0.015;
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
        if (tools.selected == layer.tool_needed && atachedToAnything(this.id, hardware)) {
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
        else if (tools.selected == layer.tool_needed && !atachedToAnything(this.id, hardware)) {
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

        if (dragTarget) {
            dragTarget.alpha = 0.5;
        }
        app.stage.on('pointermove', onDragMove);
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


    function onKeyDown(key) {
        if (key.key == '1') {
            tools.selected = 1;
        }
        if (key.key == '0') {
            tools.selected = 0;
        }
    }

})();
