import { useMemo } from 'react';
import './TrainScene.css';

export default function TrainScene() {
  // Generate random clouds with varied sizes, positions, and speeds
  const clouds = useMemo(() => {
    const cloudImages = [
      '/train/cloud1.png',
      '/train/cloud2.png',
      '/train/cloud3.png',
      '/train/cloud4.png',
    ];

    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      src: cloudImages[Math.floor(Math.random() * cloudImages.length)],
      top: 5 + Math.random() * 30, // 5% to 35% from top
      left: Math.random() * 100, // random starting position
      size: 80 + Math.random() * 170, // 80-250px
      duration: 20 + Math.random() * 25, // 20-45s
      delay: Math.random() * -40, // stagger start times
      opacity: 0.5 + Math.random() * 0.4, // 0.5-0.9
    }));
  }, []);

  return (
    <div className="train-scene">
      {/* Layer 1: Clouds (furthest back, parallax speeds) */}
      <div className="clouds-layer">
        {clouds.map((cloud) => (
          <img
            key={cloud.id}
            src={cloud.src}
            alt=""
            className="cloud"
            style={{
              top: `${cloud.top}%`,
              left: `${cloud.left}%`,
              width: `${cloud.size}px`,
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${cloud.delay}s`,
              opacity: cloud.opacity,
            }}
          />
        ))}
      </div>

      {/* Layer 2: Hilly background (continuous scroll) */}
      <div className="hills-layer">
        <div className="hills" />
        <div className="hills" />
      </div>

      {/* Layer 3: Train (stationary) */}
      <div className="train-layer">
        <img src="/train/train.png" alt="" className="train-car locomotive" />
        <img src="/train/cart1.png" alt="" className="train-car cart" />
        <img src="/train/cart2.png" alt="" className="train-car cart" />
        <img src="/train/rear-cart.png" alt="" className="train-car caboose" />
      </div>
    </div>
  );
}
