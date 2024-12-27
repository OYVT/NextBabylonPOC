'use client'

import React, { useEffect, useRef, memo } from 'react'
import * as BABYLON from '@babylonjs/core';

interface BabylonViewProps {
    className? : string
}

export const BabylonView = memo(function InnerBabylonView( 
    { className }: BabylonViewProps
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<BABYLON.Scene>(null);

    async function createNodeGeometryMesh() : Promise<void> {
        // Retrieve the node geometry data
        const geometryResponse = await fetch('/geometries/nodeGeometry.json');
        const geometryData = await geometryResponse.json();
        // Create the node geometry mesh
        const nodeGeometry = BABYLON.NodeGeometry.Parse(geometryData);
        // Build the node geometry mesh
        nodeGeometry.onBuildObservable.add(() => {
            console.log('Node geometry built');
            nodeGeometry.createMesh("nodeGometryMesh", sceneRef.current);
        });
        nodeGeometry.build();
    }

    useEffect(() => {
        // Create the Babylon scene
        const engine = new BABYLON.Engine(canvasRef.current);
        sceneRef.current = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 3, Math.PI / 3, 50, BABYLON.Vector3.Zero(), sceneRef.current)
        camera.attachControl()
        const light = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(0.33, 1, -0.67), sceneRef.current)
        light.intensity = 0.9
        //const texture = new Texture(`/images/texture.png`, scene)
        //const mat = new BABYLON.StandardMaterial("Material", sceneRef.current)
        //mat.diffuseTexture = texture
        //const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, sceneRef.current)
        //box.material = mat

        // Engine render loop
        engine.runRenderLoop(() => engine.scenes.forEach(scene => {
            if (scene.activeCamera) scene.render();
        }));

        // Create the node geometry mesh
        createNodeGeometryMesh().then(() => {
            console.log('Node geometry mesh created');
        }).catch((error) => {
            console.error('Error creating node geometry mesh', error);
        });

    }, [canvasRef]);

    return (
        // noinspection HtmlUnknownAttribute,HtmlRequiredTitleElement,JSUnresolvedLibraryURL
        <>
            <canvas ref={canvasRef} className={className} />
        </>
    )
});

//#region Unsuccessful attempt to use BabylonViewer
// Requires installation of @babylonjs/viewer using command: "npm install @babylonjs/viewer@preview
// Failed due to inconsistencies in the libraries and lack of documentation. Likely caused by the use of the preview version of the library.
/*import { Viewer, createViewerForCanvas, CanvasViewerOptions } from '@babylonjs/viewer';
import { GLTF2Export } from '@babylonjs/serializers';

export default function BabylonView( 
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

        let scene: BABYLON.Scene;

        const viewerPromise = createViewerForCanvas(canvasRef.current, 
            {
                engine: 'WebGPU',
                onInitialized: (details) => {
                    scene = details.scene;
                    console.log('DETAILS', details);
            },
        });

        async function getNodeGeometry() : Promise<BABYLON.NodeGeometry> {
            const geometryResponse = await fetch('/geometries/nodeGeometry.json');
            const geometryData = await geometryResponse.json();
            const nodeGeometry = BABYLON.NodeGeometry.Parse(geometryData);
            return nodeGeometry;
        }

        viewerPromise.then((viewer) => {

            const nodeGeometry = getNodeGeometry().then((nodeGeometry) => {
                console.log('Node geometry', nodeGeometry);
                nodeGeometry.onBuildObservable.add(() => {
                    console.log('Node geometry built');
                    GLTF2Export.GLBAsync(scene, 'nodeGeometry.glb', {}).then((glb) => {
                        console.log('GLB', glb);
                    }).catch((error) => { 
                        console.error('Error exporting GLB', error);
                    });
                });
            }).catch((error) => {
                console.error('Error getting node geometry', error);
            });
            
            viewer.loadModel("https://playground.babylonjs.com/scenes/BoomBox.glb");
            viewer.onModelChanged.add(() => {
                console.log('Model changed');
                viewerRef.current = viewer;
                viewer.cameraAutoOrbit = { enabled: false };                
            });
        }).catch((error) => {
            console.error('Error creating viewer', error);
        });

        return () => {};
    }, [canvasRef]);

    return <canvas ref={canvasRef} className={className} />;
}*/
//#endregion
