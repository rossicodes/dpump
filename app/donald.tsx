"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function AnimatedModel({ url }: { url: string }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    // Play the first animation by default using optional chaining
    const firstKey = Object.keys(actions ?? {})[0];
    actions?.[firstKey]?.play();
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      position={[0, -3, 0]}
      scale={[2, 2, 2]} // Adjust to your desired size
    />
  );
}

export default function Donald() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Autoplay audio on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);
  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} src="/pump.mp3" loop />
      <div className="w-[300px] h-[300px] m-20">
        {" "}
        {/* Set the size of the canvas */}
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <AnimatedModel url="/trump.glb" />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
