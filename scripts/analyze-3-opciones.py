"""
Análisis completo de las 3 imágenes que Luis compartió:
1. Menú con fondo verde limón (1795375939811.jpg)
2. Menú con fondo negro (1795431060598.jpg)
3. Uniforme real: playera negra + mandil verde (MVIMG_20261122_121536.jpg)

Extrae los colores dominantes de cada imagen para comparar.
"""
from PIL import Image
from collections import Counter
import numpy as np

def analyze_image(path, label):
    print(f"\n{'='*60}")
    print(f"ANÁLISIS: {label}")
    print(f"{'='*60}")
    img = Image.open(path).convert('RGB')
    w, h = img.size
    print(f"Tamaño: {w}x{h}")

    arr = np.array(img)
    pixels = arr.reshape(-1, 3)

    # Color más común (sin contar blanco y negro puro)
    tuples = [tuple(p) for p in pixels[::50]]  # muestra cada 50 píxeles
    counter = Counter(tuples)
    print(f"\nColores más comunes (top 15):")
    for color, count in counter.most_common(15):
        r, g, b = color
        # Calcular saturación
        mx, mn = max(color), min(color)
        sat = (mx - mn) / mx if mx > 0 else 0
        # Luminosidad
        lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        hex_color = f"#{r:02X}{g:02X}{b:02X}"
        print(f"  RGB({r:3d}, {g:3d}, {b:3d}) = {hex_color}  sat={sat:.2f}  lum={lum:.2f}  (count: {count})")

    # Buscar verdes
    green_mask = (pixels[:, 1] > pixels[:, 0] + 10) & (pixels[:, 1] > pixels[:, 2] + 10)
    greens = pixels[green_mask]
    if len(greens) > 0:
        avg = greens.mean(axis=0).astype(int)
        print(f"\nVerde promedio: RGB({avg[0]}, {avg[1]}, {avg[2]}) = #{avg[0]:02X}{avg[1]:02X}{avg[2]:02X}")
        print(f"Total píxeles verdes: {len(greens)} ({len(greens)/len(pixels)*100:.1f}%)")

    # Buscar negros
    black_mask = (pixels[:, 0] < 30) & (pixels[:, 1] < 30) & (pixels[:, 2] < 30)
    blacks = pixels[black_mask]
    if len(blacks) > 0:
        print(f"Píxeles negros: {len(blacks)} ({len(blacks)/len(pixels)*100:.1f}%)")

    # Rojos
    red_mask = (pixels[:, 0] > pixels[:, 1] + 30) & (pixels[:, 0] > pixels[:, 2] + 30)
    reds = pixels[red_mask]
    if len(reds) > 0:
        avg = reds.mean(axis=0).astype(int)
        print(f"Rojo promedio: RGB({avg[0]}, {avg[1]}, {avg[2]}) = #{avg[0]:02X}{avg[1]:02X}{avg[2]:02X}")

if __name__ == '__main__':
    # 1. Menú verde limón
    analyze_image('/home/z/my-project/upload/1795375939811.jpg', 'Menú con FONDO VERDE LIMÓN')

    # 2. Menú negro
    analyze_image('/home/z/my-project/upload/1795431060598.jpg', 'Menú con FONDO NEGRO')

    # 3. Uniforme
    analyze_image('/home/z/my-project/upload/MVIMG_20261122_121536.jpg', 'UNIFORME real del personal')
