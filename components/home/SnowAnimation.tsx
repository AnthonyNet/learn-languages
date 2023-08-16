import React, { useEffect, useRef } from "react";

interface Snowflake {
	x: number;
	y: number;
	size: number;
	speed: number;
}

const SnowfallAnimation: React.FC = () => {

	const canvasRef = useRef<HTMLCanvasElement | any>(null);
	const snowflakes: Snowflake[] = [];

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		function createSnowflake(): Snowflake {
			return {
				x: Math.random() * canvas.width,
				y: 0,
				size: Math.random() * 2 + 2,
				speed: Math.random() * 1 + 1,
			};
		}

		function drawSnowflakes() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			 const snowflakeColor = getComputedStyle(
					document.documentElement
				).getPropertyValue("--color-main");

				ctx.fillStyle = snowflakeColor;

			snowflakes.forEach((snowflake) => {
				ctx.beginPath();
				ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
				ctx.fill();

				snowflake.y += snowflake.speed;
				if (snowflake.y > canvas.height) {
					snowflake.y = 0;
					snowflake.x = Math.random() * canvas.width;
				}
			});

			requestAnimationFrame(drawSnowflakes);
		}

		for (let i = 0; i < 10; i++) {
			snowflakes.push(createSnowflake());
		}

		// Set initial canvas height based on viewport height
		canvas.height = window.innerHeight;

		drawSnowflakes();

		// Update canvas height when window is resized
		const handleResize = () => {
			if (!canvas) return;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <canvas ref={canvasRef} style={{ display: "block", position: "absolute", width: "100%", opacity: 0.3, zIndex: -50}} />;
};

export default SnowfallAnimation;
