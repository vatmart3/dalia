import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { LoopControl } from './LoopControl'

/*
 * iPhone 3D du hero. progress (0 → 1, piloté par GSAP ScrollTrigger) :
 *   le téléphone, incliné au départ, se redresse face à vous ;
 *   l'écran (DOM) passe du tableau de bord à l'alerte, puis à la promo appliquée.
 * L'écran est un vrai élément DOM (rendu par React dans <Hero>) projeté en 3D
 * avec CSS3DRenderer : texte net et lisible, synchronisé avec le téléphone.
 */

// Écran DOM de 340 × 736 px → 1 px = 0,005 unité.
const PX = 0.005
const SW = 340 * PX
const SH = 736 * PX

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => 1 - Math.pow(1 - clamp01(t), 3)

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
  const toPx = useMemo(() => new THREE.Matrix4().makeScale(PX, PX, PX), [])
  useFrame(() => {
    const a = anchor.current
    if (!a) return
    a.updateWorldMatrix(true, false)
    m.copy(a.matrixWorld).multiply(toPx)
    m.decompose(object.position, object.quaternion, object.scale)
    object.scale.multiplyScalar(0.985)
    renderer.render(scene, camera)
  })
  return null
}

type Props = { progress: MutableRefObject<number>; reducedMotion: boolean; screen: HTMLElement | null }

function Phone({ progress, reducedMotion, screen }: Props) {
  const group = useRef<THREE.Group>(null!)
  const anchor = useRef<THREE.Object3D>(null)
  const shadow = useRef<THREE.Mesh>(null!)
  const pointer = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  const compact = size.width < 600

  const mats = useMemo(
    () => ({
      frame: new THREE.MeshPhysicalMaterial({ color: '#c3c9d2', metalness: 1, roughness: 0.26, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
      glass: new THREE.MeshPhysicalMaterial({ color: '#05070b', metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.03 }),
      button: new THREE.MeshStandardMaterial({ color: '#aab1bc', metalness: 1, roughness: 0.3 }),
      shadow: new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false }),
    }),
    [],
  )
  const geos = useMemo(
    () => ({
      frame: new RoundedBoxGeometry(SW + 0.16, SH + 0.16, 0.3, 8, 0.27),
      glass: new RoundedBoxGeometry(SW + 0.1, SH + 0.1, 0.04, 8, 0.24),
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

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20)
    const p = reducedMotion ? 1 : progress.current
    const t = state.clock.elapsedTime
    const k = ease(p / 0.45) // se redresse sur la première moitié

    const idle = reducedMotion ? 0 : 1
    const ry = THREE.MathUtils.lerp(-0.62, -0.16, k) + idle * (pointer.current.x * 0.08 + Math.sin(t * 0.6) * 0.03)
    const rx = THREE.MathUtils.lerp(0.22, 0.03, k) + idle * pointer.current.y * 0.05
    const rz = THREE.MathUtils.lerp(0.08, 0, k)
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 5, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 5, dt)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, rz, 5, dt)
    const float = idle * Math.sin(t * 1.1) * 0.05
    g.position.y = 0.12 + float + THREE.MathUtils.lerp(-0.1, 0, k)
    const s = (compact ? 0.92 : 1) * THREE.MathUtils.lerp(0.94, 1, k)
    g.scale.setScalar(s)
    shadow.current.scale.set(2.6 * s, 0.9 * s, 1)
    mats.shadow.opacity = 0.85 - float * 2
  })

  return (
    <>
      <group ref={group}>
        {/* cadre métal */}
        <mesh geometry={geos.frame} material={mats.frame} />
        {/* verre avant */}
        <mesh geometry={geos.glass} material={mats.glass} position={[0, 0, 0.14]} />
        {/* boutons */}
        <mesh position={[SW / 2 + 0.085, 0.75, 0]} material={mats.button}>
          <boxGeometry args={[0.03, 0.46, 0.09]} />
        </mesh>
        <mesh position={[-(SW / 2 + 0.085), 0.95, 0]} material={mats.button}>
          <boxGeometry args={[0.03, 0.26, 0.09]} />
        </mesh>
        <mesh position={[-(SW / 2 + 0.085), 0.5, 0]} material={mats.button}>
          <boxGeometry args={[0.03, 0.26, 0.09]} />
        </mesh>
        {/* écran */}
        <object3D ref={anchor} position={[0, 0, 0.162]} />
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} />
      <directionalLight position={[-5, 2, -3]} intensity={1.2} color="#9cc3ff" />
      <Phone {...props} />
    </Canvas>
  )
}
