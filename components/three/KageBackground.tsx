"use client";

export function KageBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/80 z-10" />
      <iframe
        srcDoc={`<!DOCTYPE html>
<html>
<head>
<style>
  body { margin:0; overflow:hidden; background:#05070a; }
  canvas { display:block; width:100vw; height:100vh; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
<canvas id="c"></canvas>
<script>
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070a, 0.035);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 5);

  // Particles / Atmospheric dust
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color('#e0231c'); // Vermilion
  const color2 = new THREE.Color('#c9a24a'); // Gold

  for(let i=0; i<particleCount; i++) {
    positions[i*3] = (Math.random() - 0.5) * 20;
    positions[i*3+1] = Math.random() * 8;
    positions[i*3+2] = (Math.random() - 0.5) * 20;

    const mixed = color1.clone().lerp(color2, Math.random());
    colors[i*3] = mixed.r;
    colors[i*3+1] = mixed.g;
    colors[i*3+2] = mixed.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Ambient lighting
  const ambientLight = new THREE.AmbientLight(0xdfe7e0, 0.2);
  scene.add(ambientLight);

  const redLight = new THREE.PointLight(0xe0231c, 2, 15);
  redLight.position.set(0, 2, -2);
  scene.add(redLight);

  function animate(t) {
    requestAnimationFrame(animate);
    const time = t * 0.0005;
    
    const pos = geometry.attributes.position.array;
    for(let i=0; i<particleCount; i++) {
      pos[i*3+1] += Math.sin(time + i) * 0.002;
      pos[i*3] += Math.cos(time + i * 0.5) * 0.001;
    }
    geometry.attributes.position.needsUpdate = true;

    camera.position.x = Math.sin(time * 0.5) * 0.5;
    camera.position.y = 1.2 + Math.cos(time * 0.3) * 0.2;
    camera.lookAt(0, 1, 0);

    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
</script>
</body>
</html>`}
        className="w-full h-full border-0"
        title="Kage Scene"
      />
    </div>
  );
}
