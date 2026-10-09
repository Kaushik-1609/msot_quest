// ==========================================================
// PIXEL GRID CURSOR TRAIL ANIMATION (Orange Plus-Shape Grid)
// ==========================================================
(function () {
    const cv = document.getElementById('pixel-trail');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let CELL = 100, FADE = 0.018, W = 0, H = 0, dpr = 1;
    const cells = new Map();
    let last = null;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth;
        H = window.innerHeight;
        cv.width = W * dpr;
        cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        CELL = W < 600 ? 60 : 100;
    }
    window.addEventListener('resize', resize);
    resize();

    function light(cx, cy, v) {
        const k = cx + ',' + cy;
        if (v > (cells.get(k) || 0)) cells.set(k, v);
    }

    function hit(x, y) {
        const cx = Math.floor(x / CELL);
        const cy = Math.floor(y / CELL);
        // Center active square (full brightness orange #e8742a)
        light(cx, cy, 1);
        // 4 Neighboring squares (cross / plus shape glow)
        light(cx + 1, cy, 0.28);
        light(cx - 1, cy, 0.28);
        light(cx, cy + 1, 0.28);
        light(cx, cy - 1, 0.28);
    }

    function move(e) {
        const x = e.clientX;
        const y = e.clientY;

        // Also update CSS variables for Blackbox-style card spotlight illumination
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        const cursorGlow = document.getElementById('cursorGlow');
        if (cursorGlow) {
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        }

        // Fast movement linear interpolation (prevents gaps)
        if (last) {
            const dx = x - last.x;
            const dy = y - last.y;
            const n = Math.ceil(Math.sqrt(dx * dx + dy * dy) / (CELL / 2));
            for (let i = 1; i <= n; i++) {
                hit(last.x + (dx * i) / n, last.y + (dy * i) / n);
            }
        } else {
            hit(x, y);
        }
        last = { x: x, y: y };
    }

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    window.addEventListener('pointerleave', () => { last = null; });

    function frame() {
        ctx.clearRect(0, 0, W, H);
        cells.forEach((v, k) => {
            const p = k.split(',');
            // Orange (#e8742a -> rgb(232, 116, 42)) fade fill
            ctx.fillStyle = 'rgba(232, 116, 42,' + (v * v * 0.85).toFixed(3) + ')';
            ctx.fillRect(+p[0] * CELL, +p[1] * CELL, CELL, CELL);
            v -= FADE;
            if (v <= 0.01) {
                cells.delete(k);
            } else {
                cells.set(k, v);
            }
        });
        requestAnimationFrame(frame);
    }
    frame();
})();
