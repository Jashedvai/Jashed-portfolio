import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface ThreeHeroCanvasProps {
  pointerX: number;
  pointerY: number;
  pulseTrigger?: number;
}

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function ThreeHeroCanvas({
  pointerX,
  pointerY,
  pulseTrigger = 0,
}: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const spinImpulseRef = useRef(0);

  useEffect(() => {
    targetPointerRef.current = { x: pointerX, y: pointerY };
  }, [pointerX, pointerY]);

  useEffect(() => {
    if (pulseTrigger > 0) {
      spinImpulseRef.current = 1.8;
    }
  }, [pulseTrigger]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 7.2);

    // Zero-dependency procedural studio reflection map for metallic copper PBR
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Warm studio lighting rig
    const ambient = new THREE.AmbientLight(0xfff1e8, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffdfc4, 2.2);
    keyLight.position.set(4.5, 4.0, 5.0);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd39a6a, 4.0, 18);
    rimLight.position.set(-4.0, -2.5, 3.0);
    scene.add(rimLight);

    // Composite Architectural 3D Rig (6 coordinated parts)
    const rig = new THREE.Group();
    rig.position.set(1.35, 0.1, 0);
    scene.add(rig);

    const disposables: Array<{ dispose: () => void }> = [];

    // 1. Dark satin obsidian-bronze core polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x3e1f0f,
      metalness: 0.65,
      roughness: 0.48,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rig.add(coreMesh);
    disposables.push(coreGeo, coreMat);

    // 2. Burnished copper wireframe cage around core
    const cageSourceGeo = new THREE.IcosahedronGeometry(1.38, 0);
    const cageEdgesGeo = new THREE.EdgesGeometry(cageSourceGeo);
    cageSourceGeo.dispose();
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xd39a6a,
      transparent: true,
      opacity: 0.58,
    });
    const cageLines = new THREE.LineSegments(cageEdgesGeo, cageMat);
    rig.add(cageLines);
    disposables.push(cageEdgesGeo, cageMat);

    // 3. Primary brushed copper gimbal ring
    const ring1Geo = new THREE.TorusGeometry(1.92, 0.042, 20, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd39a6a,
      metalness: 0.92,
      roughness: 0.18,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.set(Math.PI / 3.2, Math.PI / 6, 0);
    rig.add(ring1);
    disposables.push(ring1Geo, ring1Mat);

    // 4. Secondary oxidized bronze gimbal ring
    const ring2Geo = new THREE.TorusGeometry(2.38, 0.028, 16, 96);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x9a5a2e,
      metalness: 0.82,
      roughness: 0.34,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(-Math.PI / 3.8, -Math.PI / 5, Math.PI / 8);
    rig.add(ring2);
    disposables.push(ring2Geo, ring2Mat);

    // 5. Outer fine precision calibration ring
    const ring3Geo = new THREE.TorusGeometry(2.85, 0.014, 12, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xfff1e8,
      metalness: 0.65,
      roughness: 0.42,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.set(Math.PI / 2.3, 0, Math.PI / 4);
    rig.add(ring3);
    disposables.push(ring3Geo, ring3Mat);

    // 6. Instanced precision octahedral orbital nodes
    const nodeCount = 12;
    const nodeGeo = new THREE.OctahedronGeometry(0.065, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.88,
      roughness: 0.22,
    });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const dummy = new THREE.Object3D();
    const tintPalette = [
      new THREE.Color(0xd39a6a),
      new THREE.Color(0xfff1e8),
      new THREE.Color(0x9a5a2e),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.85;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 0.28,
        Math.sin(angle) * radius
      );
      const s = 0.85 + (i % 3) * 0.14;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);
      nodes.setColorAt(i, tintPalette[i % tintPalette.length]);
    }
    nodes.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
    rig.add(nodes);
    disposables.push(nodeGeo, nodeMat);

    // 7. Subtle 3D spatial copper particle field
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
    }
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMat = new THREE.PointsMaterial({
      color: 0xd39a6a,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const pointField = new THREE.Points(pointGeo, pointMat);
    scene.add(pointField);
    disposables.push(pointGeo, pointMat);

    // Responsive rig framing on resize
    const updateFraming = (w: number, h: number) => {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      rig.position.x = w < 900 ? 0 : 1.55;
      rig.scale.setScalar(w < 640 ? 0.78 : 1);
    };
    updateFraming(width, height);

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth || window.innerWidth;
      const nh = container.clientHeight || window.innerHeight;
      updateFraming(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Software WebGL safe pacing helper
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    let currentRotX = 0;
    let currentRotY = 0;

    function tick() {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.05);

      if (!reducedMotion) {
        const boost = spinImpulseRef.current;
        spinImpulseRef.current = Math.max(0, boost - dt * 2.4);

        coreMesh.rotation.y += dt * (0.26 + boost * 1.4);
        coreMesh.rotation.x += dt * 0.14;

        cageLines.rotation.y -= dt * (0.18 + boost * 0.8);
        cageLines.rotation.z += dt * 0.08;

        ring1.rotation.z += dt * (0.28 + boost * 0.9);
        ring2.rotation.x += dt * (0.22 + boost * 0.6);
        ring3.rotation.y -= dt * 0.16;
        nodes.rotation.y += dt * (0.2 + boost * 0.7);
        pointField.rotation.y += dt * 0.03;

        const targetX = targetPointerRef.current.y * 0.35;
        const targetY = targetPointerRef.current.x * 0.45;
        currentRotX += (targetX - currentRotX) * Math.min(1, dt * 4);
        currentRotY += (targetY - currentRotY) * Math.min(1, dt * 4);
        rig.rotation.x = currentRotX;
        rig.rotation.y = currentRotY;
      }

      renderer.render(scene, camera);

      if (reducedMotion) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      disposables.forEach((d) => d.dispose());
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-85"
    />
  );
}
