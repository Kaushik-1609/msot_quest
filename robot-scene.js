/**
 * MSOT Quest 3D Cyber Guardian Robot
 * Three.js 3D Robot with smooth cursor-tracking head (lerp, ~35° horizontal, ~15° vertical limits)
 * Supports desktop mouse & mobile touch pointer, honors prefers-reduced-motion.
 */

(function () {
    const reduceMotion = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pointer normalized coordinates (-1 to +1)
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let hasInteracted = false;

    function onPointerMove(e) {
        hasInteracted = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
        pointer.targetY = (clientY / window.innerHeight) * 2 - 1;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onPointerMove, { passive: true });

    function initRobotInstance(containerId) {
        const container = document.getElementById(containerId);
        if (!container || !window.THREE) return null;

        const width = container.clientWidth || 300;
        const height = container.clientHeight || 320;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
        camera.position.set(0, 0.4, 4.8);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0x60a5fa, 2.2);
        mainLight.position.set(3, 4, 3);
        scene.add(mainLight);

        const orangeRimLight = new THREE.DirectionalLight(0xf97316, 3.0);
        orangeRimLight.position.set(-3, -2, -2);
        scene.add(orangeRimLight);

        const cyanSpot = new THREE.PointLight(0x06b6d4, 3.5, 6);
        cyanSpot.position.set(0, 0.8, 1.5);
        scene.add(cyanSpot);

        // Root Robot Group
        const robotGroup = new THREE.Group();
        scene.add(robotGroup);
        robotGroup.position.y = -0.35;

        // Materials
        const darkArmorMat = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.3,
            metalness: 0.85,
        });

        const whitePlatingMat = new THREE.MeshStandardMaterial({
            color: 0xe2e8f0,
            roughness: 0.25,
            metalness: 0.5,
        });

        const goldAccentMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            roughness: 0.2,
            metalness: 0.9,
        });

        const cyanVisorMat = new THREE.MeshStandardMaterial({
            color: 0x06b6d4,
            emissive: 0x0891b2,
            emissiveIntensity: 1.8,
            roughness: 0.1,
            metalness: 0.9,
        });

        const orangeCoreMat = new THREE.MeshStandardMaterial({
            color: 0xe8742a,
            emissive: 0xe8742a,
            emissiveIntensity: 2.5,
            roughness: 0.1,
            metalness: 0.2,
        });

        // ------------------ TORSO ------------------
        const torsoGroup = new THREE.Group();
        robotGroup.add(torsoGroup);

        // Chest Body
        const chestGeo = new THREE.CylinderGeometry(0.7, 0.55, 0.9, 8);
        const chestMesh = new THREE.Mesh(chestGeo, darkArmorMat);
        chestMesh.position.y = 0;
        torsoGroup.add(chestMesh);

        // Chest Armor Plates
        const chestPlateGeo = new THREE.BoxGeometry(0.75, 0.45, 0.5);
        const chestPlate = new THREE.Mesh(chestPlateGeo, whitePlatingMat);
        chestPlate.position.set(0, 0.1, 0.4);
        torsoGroup.add(chestPlate);

        // Glowing Arc Reactor Core
        const coreGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);
        coreGeo.rotateX(Math.PI / 2);
        const coreMesh = new THREE.Mesh(coreGeo, orangeCoreMat);
        coreMesh.position.set(0, 0.1, 0.66);
        torsoGroup.add(coreMesh);

        // Reactor Ring
        const ringGeo = new THREE.TorusGeometry(0.24, 0.035, 12, 24);
        const ringMesh = new THREE.Mesh(ringGeo, goldAccentMat);
        ringMesh.position.set(0, 0.1, 0.67);
        torsoGroup.add(ringMesh);

        // Left & Right Shoulder Armor
        const shoulderGeo = new THREE.SphereGeometry(0.32, 16, 16);
        shoulderGeo.scale(1.3, 0.9, 1);
        
        const leftShoulder = new THREE.Mesh(shoulderGeo, whitePlatingMat);
        leftShoulder.position.set(-0.95, 0.35, 0);
        leftShoulder.rotation.z = 0.25;
        torsoGroup.add(leftShoulder);

        const rightShoulder = new THREE.Mesh(shoulderGeo, whitePlatingMat);
        rightShoulder.position.set(0.95, 0.35, 0);
        rightShoulder.rotation.z = -0.25;
        torsoGroup.add(rightShoulder);

        // Collar Armor
        const collarGeo = new THREE.TorusGeometry(0.42, 0.08, 8, 16);
        collarGeo.rotateX(Math.PI / 2);
        const collarMesh = new THREE.Mesh(collarGeo, darkArmorMat);
        collarMesh.position.set(0, 0.5, 0);
        torsoGroup.add(collarMesh);

        // Neck
        const neckGeo = new THREE.CylinderGeometry(0.22, 0.25, 0.25, 12);
        const neckMesh = new THREE.Mesh(neckGeo, darkArmorMat);
        neckMesh.position.set(0, 0.58, 0);
        torsoGroup.add(neckMesh);

        // ------------------ HEAD (TRACKS CURSOR) ------------------
        const headGroup = new THREE.Group();
        headGroup.name = "robot_head";
        headGroup.position.set(0, 0.85, 0);
        robotGroup.add(headGroup);

        // Helmet Base
        const helmetGeo = new THREE.BoxGeometry(0.68, 0.65, 0.68);
        const helmetMesh = new THREE.Mesh(helmetGeo, whitePlatingMat);
        helmetMesh.position.set(0, 0.22, 0);
        headGroup.add(helmetMesh);

        // Forehead crest / Horn antenna
        const crestGeo = new THREE.ConeGeometry(0.12, 0.45, 4);
        crestGeo.rotateX(-0.3);
        const crestMesh = new THREE.Mesh(crestGeo, goldAccentMat);
        crestMesh.position.set(0, 0.6, 0.1);
        headGroup.add(crestMesh);

        // Cyber Visor / Eyes (Luminescent glowing band)
        const visorGeo = new THREE.BoxGeometry(0.56, 0.18, 0.18);
        const visorMesh = new THREE.Mesh(visorGeo, cyanVisorMat);
        visorMesh.position.set(0, 0.22, 0.32);
        headGroup.add(visorMesh);

        // Head Earpieces
        const earGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 12);
        earGeo.rotateZ(Math.PI / 2);
        
        const leftEar = new THREE.Mesh(earGeo, goldAccentMat);
        leftEar.position.set(-0.38, 0.22, 0);
        headGroup.add(leftEar);

        const rightEar = new THREE.Mesh(earGeo, goldAccentMat);
        rightEar.position.set(0.38, 0.22, 0);
        headGroup.add(rightEar);

        // Cheek Guards
        const cheekGeo = new THREE.BoxGeometry(0.12, 0.35, 0.3);
        const leftCheek = new THREE.Mesh(cheekGeo, darkArmorMat);
        leftCheek.position.set(-0.32, 0.1, 0.2);
        leftCheek.rotation.y = 0.2;
        headGroup.add(leftCheek);

        const rightCheek = new THREE.Mesh(cheekGeo, darkArmorMat);
        rightCheek.position.set(0.32, 0.1, 0.2);
        rightCheek.rotation.y = -0.2;
        headGroup.add(rightCheek);

        // Resize handler
        function handleResize() {
            if (!container) return;
            const w = container.clientWidth || 300;
            const h = container.clientHeight || 320;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            // Smooth floating & breathing idle
            if (!reduceMotion) {
                robotGroup.position.y = -0.35 + Math.sin(elapsed * 2.2) * 0.04;
                torsoGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.05;
                torsoGroup.rotation.x = Math.sin(elapsed * 1.8) * 0.02;

                // Core pulsing
                orangeCoreMat.emissiveIntensity = 2.2 + Math.sin(elapsed * 4) * 0.8;
                cyanVisorMat.emissiveIntensity = 1.6 + Math.cos(elapsed * 3) * 0.5;

                // Smooth Head Tracking with limits (~35° horizontal = 0.61 rad, ~15° vertical = 0.26 rad)
                // pointer.targetX ranges [-1, 1], pointer.targetY ranges [-1, 1]
                const targetY = (pointer.targetX || 0) * 0.60;   // Left-Right ~35 deg
                const targetX = -(pointer.targetY || 0) * 0.25;  // Up-Down ~15 deg

                // Lerp smooth follow (0.08 factor as per guidelines)
                headGroup.rotation.y += (targetY - headGroup.rotation.y) * 0.08;
                headGroup.rotation.x += (targetX - headGroup.rotation.x) * 0.08;
                headGroup.rotation.z += (targetY * 0.08 - headGroup.rotation.z) * 0.08;
            }

            renderer.render(scene, camera);
        }

        animate();
        return { scene, camera, renderer, head: headGroup };
    }

    // Auto-init once DOM and Three.js are ready
    function init() {
        if (document.getElementById('robot3DContainer')) {
            initRobotInstance('robot3DContainer');
        }
        if (document.getElementById('gateRobot3DContainer')) {
            initRobotInstance('gateRobot3DContainer');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }

    // Expose for dynamic calls if needed
    window.MSOTRobot = { initRobotInstance };
})();
