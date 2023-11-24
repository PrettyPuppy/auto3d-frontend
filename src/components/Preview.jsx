import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import { useEffect, useRef } from 'react';


const Preview = ({ visible, model }) => {
    const myWnd = document.getElementById('preview');

    const ref = useRef(false);

    useEffect(() => {
        if (myWnd && visible == 4) {
            console.log('Preview');

            if (ref.current) return;
            ref.current = true;

            console.log(myWnd);

            const scene = new THREE.Scene();
            scene.add(new THREE.AxesHelper(5));

            const light = new THREE.PointLight(0xffffff, 1000);
            light.position.set(0.8, 1.4, 1.0);
            scene.add(light);

            const ambientLight = new THREE.AmbientLight();
            scene.add(ambientLight);

            const camera = new THREE.PerspectiveCamera(
                75,
                myWnd.offsetWidth / myWnd.offsetHeight,
                0.1,
                1000
            );
            camera.position.set(1, 2, 1.0);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(myWnd.offsetWidth, myWnd.offsetHeight);
            myWnd.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.target.set(0, 0, 0);

            const material = new THREE.MeshNormalMaterial();

            const fbxLoader = new FBXLoader();
            fbxLoader.load(
                `models/${model}`,
                (object) => {
                    object.traverse(function (child) {
                        if (child.isMesh) {
                            child.material = material;
                            if (child.material) {
                                child.material.transparent = false;
                            }
                        }
                    })
                    object.scale.set(0.01, 0.01, 0.01);
                    scene.add(object);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                    console.log(error);
                }
            )

            window.addEventListener('resize', onWindowResize, false);
            function onWindowResize() {
                camera.aspect = myWnd.offsetWidth / myWnd.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(myWnd.offsetWidth, myWnd.offsetHeight);
                render();
            }

            const stats = new Stats();
            myWnd.appendChild(stats.dom);

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                render();
                stats.update();
            }

            function render() {
                renderer.render(scene, camera);
            }

            animate();
        }
    }, [visible]);

    return (
        <div id='preview' className="preview-wrapper">
        </div>
    )
}

export default Preview;