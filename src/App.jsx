import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [showEmail, setShowEmail] = useState(false);

  
  useEffect(() => {
    generateStars();
  }, []);

  const links = [
    { title: "GitHub", url: "https://github.com/Visheshjha11" },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/visheshjha11/" },
    { title: "LeetCode", url: "https://leetcode.com" }
  ];

  return (
    <div className="page">
      <canvas id="space" />

      <div className="container">
        <img
          className="avatar"
          src="/vj-pfp.jpg"
          alt="dev"
        />

        <h1 className="name">Vishesh Jha</h1>
        <p className="role">Full-Stack Developer</p>

        <div className="links">
          {links.map((l, i) => (
            <a
              key={i}
              className="link-btn"
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.title}
            </a>
          ))}

          {/* Contact Button */}
          <div
            className="link-btn"
            onClick={() => setShowEmail(!showEmail)}
            style={{ cursor: "pointer" }}
          >
            Contact me
          </div>

          {showEmail && (
            <div className="email-box">
              visheshjha456@gmail.com
            </div>
          )}
        </div>

        <div className="socials">
          <a href="https://github.com/Visheshjha11" target="_blank"><i className="fa-brands fa-github" /></a>
          <a href="https://www.linkedin.com/in/visheshjha11/" target="_blank"><i className="fa-brands fa-linkedin" /></a>
          <a href="https://www.instagram.com/vishesh_jha11/" target="_blank"><i className="fa-brands fa-instagram" /></a>
          <a href="https://twitter.com" target="_blank"><i className="fa-brands fa-x-twitter" /></a>
        </div>
      </div>
    </div>
  );
}

/* ⭐ STAR ANIMATION */
function generateStars() {
  const canvas = document.getElementById("space");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const stars = [];
  const count = 180;

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,              // smoother sizing
      speed: Math.random() * 0.4 + 0.1,           // smoother falling
      alpha: Math.random() * 0.5 + 0.5,           // base brightness
      twinkleSpeed: Math.random() * 0.02 + 0.005  // smooth twinkle
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      // smooth twinkling effect
      star.alpha += (Math.random() - 0.5) * star.twinkleSpeed;
      star.alpha = Math.max(0.2, Math.min(1, star.alpha));

      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = "#fff";

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // falling movement
      star.y += star.speed;

      // reset star to top smoothly
      if (star.y > canvas.height + 5) {
        star.y = -5;
        star.x = Math.random() * canvas.width;
      }
    });

    ctx.globalAlpha = 1; // RESET ALPHA (important fix!)
    requestAnimationFrame(animate);
  }

  animate();
}
