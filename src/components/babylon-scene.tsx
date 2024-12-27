'use client'

import React, { useEffect, useRef, memo } from 'react'
/*import {
  ArcRotateCamera,
  MeshBuilder,
  Scene,
  Engine,
  HemisphericLight,
  StandardMaterial,
  Texture,
  Vector3,
  Camera
} from "@babylonjs/core"*/
import { Viewer, createViewerForCanvas } from '@babylonjs/viewer';

interface BabylonViewProps {
    className? : string
}

//#region Non-BabylonViewer implementation
/*export const BabylonView = memo(function InnerBabylonView( 
    { className }: BabylonViewProps
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const engine = new Engine(canvasRef.current);
        const scene = new Scene(engine);
        const camera = new ArcRotateCamera("Camera", -Math.PI / 3, Math.PI / 3, 10, Vector3.Zero(), scene)
        camera.attachControl()
        camera.radius = 3
        const light = new HemisphericLight("Light", new Vector3(0.33, 1, -0.67), scene)
        light.intensity = 0.9
        //const texture = new Texture(`/images/texture.png`, scene)
        const mat = new StandardMaterial("Material", scene)
        //mat.diffuseTexture = texture
        const box = MeshBuilder.CreateBox("box", { size: 1 }, scene)
        box.material = mat
        engine.runRenderLoop(() => engine.scenes.forEach(scene => {
            if (scene.activeCamera) scene.render();
        }));
    })

    return (
        // noinspection HtmlUnknownAttribute,HtmlRequiredTitleElement,JSUnresolvedLibraryURL
        <>
            <canvas ref={canvasRef} className={className} />
        </>
    )
});*/
//#endregion



export const BabylonView = function InnerBabylonView( 
    { className }: BabylonViewProps
) {
    const canvasRef = useRef(null);
    const viewerRef = useRef<Viewer | null>(null);
    
    if (viewerRef.current) {
        viewerRef.current.cameraAutoOrbit = { enabled: false };
    }

    useEffect(() => {
        if (!canvasRef.current) 
            return;

        const viewerPromise = createViewerForCanvas(canvasRef.current, 
            {
                engine: 'WebGPU',
                onInitialized: (details) => {
                console.log('DETAILS', details);
            },
        });

        viewerPromise.then((viewer) => {
            viewer.loadModel("https://playground.babylonjs.com/scenes/BoomBox.glb");
            viewer.onModelChanged.add(() => {
                console.log('Model changed');
                viewerRef.current = viewer;
                viewer.cameraAutoOrbit = { enabled: false };
            });
        });

        return () => {};
    }, [canvasRef]);

    return <canvas ref={canvasRef} className={className} />;
}
