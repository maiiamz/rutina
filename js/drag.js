document.addEventListener("DOMContentLoaded", () => {
    const cartas = document.querySelectorAll(".carta");

    cartas.forEach(carta => {
        let startX, startY, startLeft, startTop, moved;

        // give each carta absolute positioning within its section
        const section = carta.parentElement;
        section.style.position = "relative";

        carta.style.position = "absolute";
        carta.style.cursor = "grab";
        carta.style.userSelect = "none";

        carta.addEventListener("mousedown", e => {
            e.preventDefault();
            moved = false;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = carta.offsetLeft;
            startTop = carta.offsetTop;
            carta.style.cursor = "grabbing";
            carta.style.zIndex = 99;

            const onMove = e => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
                carta.style.left = (startLeft + dx) + "px";
                carta.style.top = (startTop + dy) + "px";
            };

            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
                carta.style.cursor = "grab";
                carta.style.zIndex = 1;
                if (!moved) carta.click(); // treat as a click if barely moved
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        });

        // touch support
        carta.addEventListener("touchstart", e => {
            const t = e.touches[0];
            moved = false;
            startX = t.clientX;
            startY = t.clientY;
            startLeft = carta.offsetLeft;
            startTop = carta.offsetTop;
        }, { passive: true });

        carta.addEventListener("touchmove", e => {
            const t = e.touches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
            carta.style.left = (startLeft + dx) + "px";
            carta.style.top = (startTop + dy) + "px";
            e.preventDefault();
        }, { passive: false });

        carta.addEventListener("touchend", () => {
            if (!moved) carta.click();
        });
    });
});