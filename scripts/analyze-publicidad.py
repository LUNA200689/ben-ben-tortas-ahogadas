"""
Analiza la imagen de la publicidad de BEN-BEN que Luis compartió
para extraer el verde exacto que usa en su publicidad actual.
"""
from PIL import Image
from collections import Counter
import numpy as np

IMG_PATH = '/home/z/my-project/upload/retouch_2026112119395781.jpg'

def analyze_image():
    img = Image.open(IMG_PATH).convert('RGB')
    w, h = img.size
    print(f"Tamaño: {w}x{h}")

    arr = np.array(img)

    # Histograma de colores - encontrar los más comunes
    pixels = arr.reshape(-1, 3)

    # Buscar píxeles verdes (G > R y G > B)
    green_mask = (pixels[:, 1] > pixels[:, 0]) & (pixels[:, 1] > pixels[:, 2])
    green_pixels = pixels[green_mask]
    print(f"\nTotal píxeles verdes: {len(green_pixels)} ({len(green_pixels)/len(pixels)*100:.2f}%)")

    if len(green_pixels) > 0:
        # Promedio
        avg = green_pixels.mean(axis=0).astype(int)
        print(f"\nVerde promedio: RGB({avg[0]}, {avg[1]}, {avg[2]}) = #{avg[0]:02X}{avg[1]:02X}{avg[2]:02X}")

        # Moda (más común)
        green_tuples = [tuple(p) for p in green_pixels]
        counter = Counter(green_tuples)
        most_common = counter.most_common(15)
        print(f"\nVerdes más comunes (top 15):")
        for color, count in most_common:
            r, g, b = color
            hex_color = f"#{r:02X}{g:02X}{b:02X}"
            print(f"  RGB({r:3d}, {g:3d}, {b:3d}) = {hex_color} (count: {count}, {count/len(green_pixels)*100:.1f}%)")

        # Mediana
        med = np.median(green_pixels, axis=0).astype(int)
        print(f"\nVerde mediano: RGB({med[0]}, {med[1]}, {med[2]}) = #{med[0]:02X}{med[1]:02X}{med[2]:02X}")

        # Los más oscuros (probablemente el verde principal)
        dark_greens = green_pixels[green_pixels[:, 1] < 150]
        if len(dark_greens) > 0:
            dark_avg = dark_greens.mean(axis=0).astype(int)
            print(f"\nVerde OSCURO promedio: RGB({dark_avg[0]}, {dark_avg[1]}, {dark_avg[2]}) = #{dark_avg[0]:02X}{dark_avg[1]:02X}{dark_avg[2]:02X}")
            print(f"Total píxeles verdes oscuros: {len(dark_greens)} ({len(dark_greens)/len(green_pixels)*100:.1f}% de los verdes)")

            # Los más comunes oscuros
            dark_tuples = [tuple(p) for p in dark_greens]
            dark_counter = Counter(dark_tuples)
            print(f"\nVerdes oscuros más comunes (top 10):")
            for color, count in dark_counter.most_common(10):
                r, g, b = color
                hex_color = f"#{r:02X}{g:02X}{b:02X}"
                print(f"  RGB({r:3d}, {g:3d}, {b:3d}) = {hex_color} (count: {count})")

        # Los más vivos/saturados
        # Saturación = diferencia entre max y min
        sat = green_pixels.max(axis=1) - green_pixels.min(axis=1)
        vibrant_mask = sat > 60
        vibrant = green_pixels[vibrant_mask]
        if len(vibrant) > 0:
            vib_avg = vibrant.mean(axis=0).astype(int)
            print(f"\nVerde VIVO/saturado promedio: RGB({vib_avg[0]}, {vib_avg[1]}, {vib_avg[2]}) = #{vib_avg[0]:02X}{vib_avg[1]:02X}{vib_avg[2]:02X}")
            print(f"Total píxeles verdes vivos: {len(vibrant)}")

def compare_with_current():
    """Compara el verde de la imagen con los verdes actuales del menú"""
    print("\n\n=== COMPARACIÓN CON VERDES ACTUALES ===")
    print(f"Verde anterior (mio):     #0F5132 = RGB(15, 81, 50)")
    print(f"Verde del logo original:  #20551F = RGB(32, 85, 31)")
    print(f"Verde de la publicidad:   [ver análisis arriba]")

if __name__ == '__main__':
    print("=== ANÁLISIS DE LA PUBLICIDAD DE BEN-BEN ===\n")
    analyze_image()
    compare_with_current()
