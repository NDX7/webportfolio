"use strict";
"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 100 }) {
    const points = useRef<THREE.Points>(null!);
    const lines = useRef<THREE.LineSegments>(null!);
    const { mouse, viewport } = useThree();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = THREE.MathUtils.randFloatSpread(viewport.width * 2);
            const y = THREE.MathUtils.randFloatSpread(viewport.height * 2);
            const z = THREE.MathUtils.randFloatSpread(10);
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, [count, viewport]);

    const velocities = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push(THREE.MathUtils.randFloatSpread(0.01), THREE.MathUtils.randFloatSpread(0.01), 0);
        }
        return new Float32Array(temp);
    }, [count]);

    useFrame((state) => {
        const positions = points.current.geometry.attributes.position.array as Float32Array;
        const linePositions = [];
        const maxDist = 3;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Update position with velocity
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];

            // Mouse reaction (repulsion)
            const dx = positions[i3] - (mouse.x * viewport.width) / 2;
            const dy = positions[i3 + 1] - (mouse.y * viewport.height) / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 2) {
                const force = (2 - dist) * 0.05;
                positions[i3] += (dx / dist) * force;
                positions[i3 + 1] += (dy / dist) * force;
            }

            // Boundary check
            if (Math.abs(positions[i3]) > viewport.width) positions[i3] *= -0.9;
            if (Math.abs(positions[i3 + 1]) > viewport.height) positions[i3 + 1] *= -0.9;

            // Line logic
            for (let j = i + 1; j < count; j++) {
                const j3 = j * 3;
                const dxL = positions[i3] - positions[j3];
                const dyL = positions[i3 + 1] - positions[j3 + 1];
                const distL = Math.sqrt(dxL * dxL + dyL * dyL);

                if (distL < maxDist) {
                    linePositions.push(positions[i3], positions[i3 + 1], positions[i3 + 2]);
                    linePositions.push(positions[j3], positions[j3 + 1], positions[j3 + 2]);
                }
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;
        lines.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <>
            <points ref={points}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles}
                        itemSize={3}
                        args={[particles, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} />
            </points>
            <lineSegments ref={lines}>
                <bufferGeometry />
                <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </lineSegments>
        </>
    );
}

export default function InteractiveBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Particles count={60} />
            </Canvas>
        </div>
    );
}
