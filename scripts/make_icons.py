"""Render PNG app icons matching icons/icon.svg (iOS ignores SVG touch icons)."""

from pathlib import Path

from PIL import Image, ImageDraw

BG = "#16130f"
GOLD = "#d4a94f"
OUT = Path(__file__).resolve().parent.parent / "icons"


def render(size: int) -> Image.Image:
    scale = 4  # supersample for smooth edges
    s = size * scale
    k = s / 512
    img = Image.new("RGB", (s, s), BG)
    draw = ImageDraw.Draw(img)
    r, w = 150 * k, 20 * k
    c = 256 * k
    draw.ellipse((c - r - w / 2, c - r - w / 2, c + r + w / 2, c + r + w / 2), outline=GOLD, width=round(w))
    star = [(256, 150), (284, 228), (362, 256), (284, 284), (256, 362), (228, 284), (150, 256), (228, 228)]
    draw.polygon([(x * k, y * k) for x, y in star], fill=GOLD)
    return img.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    for size in (192, 512):
        render(size).save(OUT / f"icon-{size}.png")
        print(f"wrote icon-{size}.png")
