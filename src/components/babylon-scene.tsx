import React, { PureComponent, useState, memo } from 'react'
import {
  ArcRotateCamera,
  MeshBuilder,
  Scene,
  Engine,
  HemisphericLight,
  StandardMaterial,
  Texture,
  Vector3
} from "@babylonjs/core"


export default class BabylonView extends PureComponent {
    id = 'Babylon';
    private canvas?: HTMLCanvasElement;

    createEngine = (canvas: HTMLCanvasElement) => {
        const engine = new Engine(canvas, true);
        engine.renderLoop = () => engine.scenes.forEach(scene => {
            if (scene.activeCamera) scene.render()
        })
        return engine
    }

    setup = (canvas: HTMLCanvasElement) => {
        const engine = this.createEngine(canvas)
        const scene = new Scene(engine)
        const camera = new ArcRotateCamera("Camera", -Math.PI / 3, Math.PI / 3, 10, Vector3.Zero(), scene)
        camera.attachControl()
        camera.radius = 3
        const light = new HemisphericLight("Light", new Vector3(0.33, 1, -0.67), scene)
        light.intensity = 0.9
        const texture = new Texture(`/images/texture.png`, scene)
        const mat = new StandardMaterial("Material", scene)
        mat.diffuseTexture = texture
        const box = MeshBuilder.CreateBox("box", { size: 1 }, scene)
        box.material = mat
        engine.runRenderLoop(engine.renderLoop)
    }

    onMount = (canvas: HTMLCanvasElement) => this.canvas = canvas;
    
    componentDidMount () {
        if (this.canvas) {
            this.setup(this.canvas);
        }
    }

    render () {
        // noinspection HtmlUnknownAttribute,HtmlRequiredTitleElement,JSUnresolvedLibraryURL
        return <>
            <canvas 
                id={this.id} 
                ref={this.onMount} 
                style={{width: '100%', height: '100%'}} 
            />
        </>
    }
}

