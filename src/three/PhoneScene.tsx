import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { LoopControl } from './LoopControl'

/*
 * Téléphone 3D du hero, inspiré de l'iPhone 17 Pro Max : coins très arrondis,
 * tranches arrondies, aluminium bleu profond, plateau photo pleine largeur au dos.
 * progress (0 → 1, piloté par GSAP ScrollTrigger) :
 *   le téléphone, présenté de dos, pivote pour montrer l'écran ;
 *   l'écran (DOM) passe du tableau de bord à l'alerte, puis à la promo appliquée.
 * L'écran est un vrai élément DOM (rendu par React dans <Hero>) projeté en 3D
 * avec CSS3DRenderer : texte net et lisible, synchronisé avec le téléphone.
 */

// Écran DOM de 340 × 736 px → 1 px = 0,005 unité.
const PX = 0.005

// Gabarit (proportions réelles ≈ 78 × 163 mm)
const W = 1.84 // largeur du boîtier
const H = 3.82 // hauteur du boîtier
const R = 0.33 // rayon des coins
const D = 0.24 // épaisseur
const EDGE = 0.07 // arrondi des tranches
const GLASS_W = 1.76
const GLASS_H = 3.74
const GLASS_T = 0.014
const FRONT = D / 2 + GLASS_T - 0.003 // surface de l'écran

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => {
  const x = clamp01(t)
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

/** Plaque aux coins arrondis et aux tranches adoucies (extrusion biseautée, normales lissées). */
function slab(w: number, h: number, r: number, depth: number, bevel: number) {
  const shape = roundedRect(w - 2 * bevel, h - 2 * bevel, Math.max(0.001, r - bevel))
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.0001, depth - 2 * bevel),
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 10,
    curveSegments: 40,
  })
  geo.center()
  const smooth = toCreasedNormals(geo, Math.PI / 3)
  geo.dispose()
  return smooth
}

function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

function makeShadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  rg.addColorStop(0, 'rgba(6,43,91,0.38)')
  rg.addColorStop(1, 'rgba(6,43,91,0)')
  g.fillStyle = rg
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

/** Projette l'élément DOM de l'écran sur l'ancre 3D, avec la même caméra que la scène. */
function CssScreen({ element, anchor }: { element: HTMLElement; anchor: MutableRefObject<THREE.Object3D | null> }) {
  const { camera, size, gl } = useThree()
  const { renderer, scene, object } = useMemo(() => {
    const renderer = new CSS3DRenderer()
    Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none', zIndex: '2' })
    const object = new CSS3DObject(element)
    const scene = new THREE.Scene()
    scene.add(object)
    return { renderer, scene, object }
  }, [element])

  useEffect(() => {
    const host = gl.domElement.parentElement?.parentElement
    host?.appendChild(renderer.domElement)
    return () => {
      renderer.domElement.remove()
    }
  }, [gl, renderer])

  useEffect(() => renderer.setSize(size.width, size.height), [renderer, size])

  const m = useMemo(() => new THREE.Matrix4(), [])
  const normal = useMemo(() => new THREE.Vector3(), [])
  const toCamera = useMemo(() => new THREE.Vector3(), [])
  const toPx = useMemo(() => new THREE.Matrix4().makeScale(PX, PX, PX), [])
  useFrame(() => {
    const a = anchor.current
    if (!a) return
    a.updateWorldMatrix(true, false)
    m.copy(a.matrixWorld).multiply(toPx)
    m.decompose(object.position, object.quaternion, object.scale)
    object.scale.multiplyScalar(0.985)
    // L'écran disparaît quand le téléphone est de dos (backface-visibility n'est pas fiable ici).
    normal.set(0, 0, 1).applyQuaternion(object.quaternion)
    toCamera.copy(camera.position).sub(object.position)
    const facing = normal.dot(toCamera) > 0
    element.style.visibility = facing ? 'visible' : 'hidden'
    renderer.render(scene, camera)
  })
  return null
}

type Props = { progress: MutableRefObject<number>; reducedMotion: boolean; screen: HTMLElement | null }

// Rotation : de dos (trois-quarts) → face à l'écran, en tournant dans le même sens.
const START_Y = Math.PI - 0.5
const END_Y = Math.PI * 2 - 0.16

// Objectifs en triangle (vus de dos, en haut à gauche) : x positif = gauche vu de dos.
const LENSES: [number, number][] = [
  [0.4, 1.6],
  [0.4, 1.12],
  [-0.02, 1.36],
]
const PLATEAU_Y = H / 2 - 0.07 - 0.48
const PLATEAU_Z = -D / 2 - 0.0275
const LENS_Z = PLATEAU_Z - 0.0375

function Phone({ progress, reducedMotion, screen }: Props) {
  const group = useRef<THREE.Group>(null!)
  const anchor = useRef<THREE.Object3D>(null)
  const shadow = useRef<THREE.Mesh>(null!)
  const pointer = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  const compact = size.width < 600

  const mats = useMemo(
    () => ({
      alu: new THREE.MeshPhysicalMaterial({ color: '#2c3a59', metalness: 0.85, roughness: 0.34, clearcoat: 0.35, clearcoatRoughness: 0.3 }),
      backGlass: new THREE.MeshPhysicalMaterial({ color: '#2b3858', metalness: 0.6, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 }),
      glass: new THREE.MeshPhysicalMaterial({ color: '#040508', roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.03 }),
      ring: new THREE.MeshPhysicalMaterial({ color: '#3a4766', metalness: 1, roughness: 0.2 }),
      lensGlass: new THREE.MeshPhysicalMaterial({ color: '#07080d', roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02 }),
      lensCore: new THREE.MeshPhysicalMaterial({ color: '#121735', metalness: 0.4, roughness: 0.06, clearcoat: 1, iridescence: 0.8 }),
      flash: new THREE.MeshStandardMaterial({ color: '#f3ead2', roughness: 0.35, emissive: '#3a3324' }),
      black: new THREE.MeshStandardMaterial({ color: '#0b0c10', roughness: 0.5 }),
      control: new THREE.MeshPhysicalMaterial({ color: '#1f2940', metalness: 0.6, roughness: 0.12, clearcoat: 1 }),
      shadow: new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false }),
    }),
    [],
  )

  const geos = useMemo(
    () => ({
      body: slab(W, H, R, D, EDGE),
      glass: slab(GLASS_W, GLASS_H, R - 0.04, GLASS_T, 0.005),
      plateau: slab(W - 0.14, 0.96, 0.26, 0.075, 0.03),
      backPanel: new THREE.ShapeGeometry(roundedRect(W - 0.22, 2.56, 0.22), 24),
      ring: new THREE.CylinderGeometry(0.2, 0.205, 0.04, 56),
      lensGlass: new THREE.CylinderGeometry(0.158, 0.158, 0.046, 56),
      lensCore: new THREE.CircleGeometry(0.07, 40),
      dot: new THREE.CylinderGeometry(0.066, 0.066, 0.02, 32),
      mic: new THREE.CircleGeometry(0.018, 16),
      buttonLong: new THREE.CapsuleGeometry(0.028, 0.34, 6, 16),
      buttonVol: new THREE.CapsuleGeometry(0.028, 0.24, 6, 16),
      buttonShort: new THREE.CapsuleGeometry(0.028, 0.1, 6, 16),
      control: new THREE.CapsuleGeometry(0.03, 0.24, 6, 16),
      port: new THREE.CapsuleGeometry(0.034, 0.16, 6, 16),
    }),
    [],
  )

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      Object.values(mats).forEach((m) => m.dispose())
      Object.values(geos).forEach((g) => g.dispose())
    }
  }, [mats, geos])

  // Pose de départ (posée une seule fois : ensuite, seul useFrame pilote la rotation).
  useLayoutEffect(() => {
    group.current.rotation.set(0.14, reducedMotion ? END_Y : START_Y, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20)
    const p = reducedMotion ? 1 : progress.current
    const t = state.clock.elapsedTime
    const k = ease(p / 0.42) // pivote sur la première partie de l'intro

    const idle = reducedMotion ? 0 : 1
    const ry = THREE.MathUtils.lerp(START_Y, END_Y, k) + idle * (pointer.current.x * 0.08 + Math.sin(t * 0.6) * 0.04)
    const rx = THREE.MathUtils.lerp(0.14, 0.03, k) + idle * pointer.current.y * 0.05
    const rz = THREE.MathUtils.lerp(-0.06, 0, k)
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 5, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 5, dt)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, rz, 5, dt)
    const float = idle * Math.sin(t * 1.1) * 0.05
    g.position.y = 0.12 + float
    const s = (compact ? 0.92 : 1) * THREE.MathUtils.lerp(0.95, 1, k)
    g.scale.setScalar(s)
    shadow.current.scale.set(2.6 * s, 0.9 * s, 1)
    mats.shadow.opacity = 0.85 - float * 2
  })

  const side = W / 2 + 0.004
  const toZ: [number, number, number] = [Math.PI / 2, 0, 0] // cylindres orientés vers l'arrière

  return (
    <>
      <group ref={group}>
        {/* boîtier aluminium */}
        <mesh geometry={geos.body} material={mats.alu} />

        {/* face avant : verre noir, bordures fines */}
        <mesh geometry={geos.glass} material={mats.glass} position={[0, 0, D / 2 + GLASS_T / 2 - 0.004]} />
        <object3D ref={anchor} position={[0, 0, FRONT + 0.002]} />

        {/* dos : panneau verre + plateau photo pleine largeur */}
        <mesh geometry={geos.backPanel} material={mats.backGlass} position={[0, -0.5, -D / 2 - 0.002]} rotation={[0, Math.PI, 0]} />
        <mesh geometry={geos.plateau} material={mats.alu} position={[0, PLATEAU_Y, PLATEAU_Z]} />
        {LENSES.map(([x, y]) => (
          <group key={`${x}-${y}`} position={[x, y, LENS_Z]}>
            <mesh geometry={geos.ring} material={mats.ring} rotation={toZ} position={[0, 0, -0.012]} />
            <mesh geometry={geos.lensGlass} material={mats.lensGlass} rotation={toZ} position={[0, 0, -0.016]} />
            <mesh geometry={geos.lensCore} material={mats.lensCore} position={[0, 0, -0.04]} rotation={[0, Math.PI, 0]} />
          </group>
        ))}
        <mesh geometry={geos.dot} material={mats.flash} rotation={toZ} position={[-0.56, 1.58, LENS_Z - 0.002]} />
        <mesh geometry={geos.dot} material={mats.black} rotation={toZ} position={[-0.56, 1.14, LENS_Z - 0.002]} />
        <mesh geometry={geos.mic} material={mats.black} position={[-0.3, 1.36, LENS_Z - 0.0005]} rotation={[0, Math.PI, 0]} />

        {/* boutons : alimentation + Camera Control à droite, Action + volume à gauche */}
        <mesh geometry={geos.buttonLong} material={mats.alu} position={[side, 0.72, 0]} scale={[1, 1, 1.3]} />
        <mesh geometry={geos.control} material={mats.control} position={[W / 2 - 0.004, -0.46, 0]} scale={[0.8, 1, 1.6]} />
        <mesh geometry={geos.buttonShort} material={mats.alu} position={[-side, 1.14, 0]} scale={[1, 1, 1.3]} />
        <mesh geometry={geos.buttonVol} material={mats.alu} position={[-side, 0.76, 0]} scale={[1, 1, 1.3]} />
        <mesh geometry={geos.buttonVol} material={mats.alu} position={[-side, 0.38, 0]} scale={[1, 1, 1.3]} />

        {/* port USB-C */}
        <mesh geometry={geos.port} material={mats.black} position={[0, -H / 2 + 0.006, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.7]} />
      </group>
      {screen && <CssScreen element={screen} anchor={anchor} />}
      <mesh ref={shadow} position={[0, -2.25, -0.4]} rotation={[-Math.PI / 2, 0, 0]} material={mats.shadow}>
        <planeGeometry args={[1, 1]} />
      </mesh>
    </>
  )
}

export default function PhoneScene({ active, onReady, ...props }: Props & { active: boolean; onReady?: () => void }) {
  return (
    <Canvas
      className="hero__canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping
        requestAnimationFrame(() => onReady?.())
      }}
    >
      <LoopControl active={active} />
      <Environment />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.7} />
      <directionalLight position={[-5, 2, -3]} intensity={1.4} color="#9cc3ff" />
      <directionalLight position={[0, 3, -6]} intensity={1.1} color="#ffffff" />
      <Phone {...props} />
    </Canvas>
  )
}
