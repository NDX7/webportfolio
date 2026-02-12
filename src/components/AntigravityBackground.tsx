"use strict";
"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSystem({ count = 150 }) {
    const points = useRef<THREE.Points>(null!);
    const { mouse, viewport } = useThree();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = THREE.MathUtils.randFloatSpread(viewport.width * 2);
            const y = THREE.MathUtils.randFloatSpread(viewport.height * 2);
            const z = THREE.MathUtils.randFloatSpread(10) - 5;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, [count, viewport]);

    const velocities = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push(
                THREE.MathUtils.randFloatSpread(0.01),
                THREE.MathUtils.randFloat(0.005, 0.02), // Floating upwards
                THREE.MathUtils.randFloatSpread(0.01)
            );
        }
        return new Float32Array(temp);
    }, [count]);

    useFrame(() => {
        const positions = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Antigravity upward motion
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3] += velocities[i3];

            // Reset when they float off the top
            if (positions[i3 + 1] > viewport.height / 2 + 1) {
                positions[i3 + 1] = -viewport.height / 2 - 1;
                positions[i3] = THREE.MathUtils.randFloatSpread(viewport.width * 2);
            }

            // Mouse repulsion
            const mx = (mouse.x * viewport.width) / 2;
            const my = (mouse.y * viewport.height) / 2;
            const dx = positions[i3] - mx;
            const dy = positions[i3 + 1] - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 2) {
                const force = (2 - dist) * 0.02;
                positions[i3] += (dx / dist) * force;
                positions[i3 + 1] += (dy / dist) * force;
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
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
            <pointsMaterial
                size={0.03}
                color="#ffffff"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function AntigravityBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ParticleSystem count={200} />
            </Canvas>
        </div>
    );
}
