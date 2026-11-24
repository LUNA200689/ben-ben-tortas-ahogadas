"""
Análisis más preciso del logo BEN-BEN.
Busca píxeles verdes puros en toda la imagen (no solo en el borde).
"""
from PIL import Image
from collections import Counter
import math

LOGO_PATH = '/home/z/my-project/upload/lv_0_20261120094740.jpg'

def find_darkest_green():
    img = Image.open(LOGO_PATH).convert('RGB')
    w, h = img.size
    print(f"Tamaño: {w}x{h}")

    # Buscar todos los píxeles verde oscuro en la imagen
    dark_green_pixels = []
    saturated_green_pixels = []

    for y in range(0, h, 3):  # muestrear cada 3 píxeles para ir más rápido
        for x in range(0, w, 3):
            r, g, b = img.getpixel((x, y))

            # Verde oscuro: G > R+15 y G > B+15 y G < 120
            if g > r + 15 and g > b + 15:
                saturated_green_pixels.append((r, g, b))
                if g < 120:
                    dark_green_pixels.append((r, g, b))

    print(f"\nTotal píxeles verdes saturados: {len(saturated_green_pixels)}")
    print(f"Total píxeles verdes oscuros: {len(dark_green_pixels)}")

    if dark_green_pixels:
        counter = Counter(dark_green_pixels)
        most_common = counter.most_common(10)
        print(f"\nColores verdes oscuros más comunes (top 10):")
        for color, count in most_common:
            r, g, b = color
            hex_color = f"#{r:02X}{g:02X}{b:02X}"
            print(f"  RGB({r}, {g}, {b}) = {hex_color} (count: {count})")

        # Promedio
        avg_r = sum(c[0] for c in dark_green_pixels) / len(dark_green_pixels)
        avg_g = sum(c[1] for c in dark_green_pixels) / len(dark_green_pixels)
        avg_b = sum(c[2] for c in dark_green_pixels) / len(dark_green_pixels)
        avg_hex = f"#{int(avg_r):02X}{int(avg_g):02X}{int(avg_b):02X}"
        print(f"\n  Promedio: RGB({int(avg_r)}, {int(avg_g)}, {int(avg_b)}) = {avg_hex}")

        # Verde más oscuro
        darkest = min(dark_green_pixels, key=lambda c: c[1])
        r, g, b = darkest
        hex_darkest = f"#{r:02X}{g:02X}{b:02X}"
        print(f"  Verde más oscuro: RGB({r}, {g}, {b}) = {hex_darkest}")

    if saturated_green_pixels:
        # De los saturados, también buscar el más oscuro
        darkest_sat = min(saturated_green_pixels, key=lambda c: c[1] + c[0] + c[2])
        r, g, b = darkest_sat
        hex_darkest_sat = f"#{r:02X}{g:02X}{b:02X}"
        print(f"\n  Verde más oscuro saturado: RGB({r}, {g}, {b}) = {hex_darkest_sat}")

def find_ring_color():
    """El logo tiene un anillo verde - extraer muestras de ese anillo específicamente"""
    img = Image.open(LOGO_PATH).convert('RGB')
    w, h = img.size
    cx, cy = w // 2, h // 2

    print(f"\n=== MUESTREO DEL ANILLO VERDE ===")

    # El anillo está aproximadamente al 42-46% del radio del círculo
    ring_pixels = []
    for radius_pct in [0.42, 0.44, 0.46, 0.48]:
        radius = int(min(w, h) * radius_pct)
        for angle in range(0, 360, 2):
            x = int(cx + radius * math.cos(math.radians(angle)))
            y = int(cy + radius * math.sin(math.radians(angle)))
            if 0 <= x < w and 0 <= y < h:
                ring_pixels.append(img.getpixel((x, y)))

    print(f"Muestras del anillo: {len(ring_pixels)}")

    # Filtrar píxeles que son claramente verde
    green_in_ring = []
    for r, g, b in ring_pixels:
        # Verde = componente G dominante
        if g > r and g > b:
            green_in_ring.append((r, g, b))

    print(f"Píxeles verdes en el anillo: {len(green_in_ring)}")

    if green_in_ring:
        counter = Counter(green_in_ring)
        most_common = counter.most_common(10)
        print(f"\nVerdes del anillo (top 10):")
        for color, count in most_common:
            r, g, b = color
            hex_color = f"#{r:02X}{g:02X}{b:02X}"
            print(f"  RGB({r}, {g}, {b}) = {hex_color} (count: {count})")

        avg_r = sum(c[0] for c in green_in_ring) / len(green_in_ring)
        avg_g = sum(c[1] for c in green_in_ring) / len(green_in_ring)
        avg_b = sum(c[2] for c in green_in_ring) / len(green_in_ring)
        avg_hex = f"#{int(avg_r):02X}{int(avg_g):02X}{int(avg_b):02X}"
        print(f"\n  Promedio del anillo verde: RGB({int(avg_r)}, {int(avg_g)}, {int(avg_b)}) = {avg_hex}")

        # El más oscuro del anillo (probablemente el color real)
        darkest_in_ring = min(green_in_ring, key=lambda c: c[0] + c[1] + c[2])
        r, g, b = darkest_in_ring
        hex_darkest = f"#{r:02X}{g:02X}{b:02X}"
        print(f"  Más oscuro del anillo: RGB({r}, {g}, {b}) = {hex_darkest}")

if __name__ == '__main__':
    print("=== ANÁLISIS PRECISO LOGO BEN-BEN ===\n")
    find_darkest_green()
    find_ring_color()
