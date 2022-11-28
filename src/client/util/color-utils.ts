import Oklab from "shared/modules/oklab";

// Stolen from grilme99's tabletop-island 
// https://github.com/grilme99/tabletop-island

export namespace ColorUtil {
    export function hexColor(decimal: number) {
        return Color3.fromRGB(
            bit32.band(bit32.rshift(decimal, 16), 2 ** 8 - 1),
            bit32.band(bit32.rshift(decimal, 8), 2 ** 8 - 1),
            bit32.band(decimal, 2 ** 8 - 1),
        );
    }

    export function richTextColor(color3: Color3): string {
        return `rgb(${math.round(color3.R * 255)},${math.round(color3.G * 255)},${math.round(color3.B * 255)})`;
    }

    export function darken(color: Color3, ratio: number): Color3 {
        return new Color3(color.R * ratio, color.G * ratio, color.B * ratio);
    }

    export function brighten(color: Color3, ratio: number): Color3 {
        return new Color3(ratio + (1 - ratio) * color.R, ratio + (1 - ratio) * color.G, ratio + (1 - ratio) * color.B);
    }

    /** Lerps two Color3s with Oklab */
    export function lerp(from: Color3, to: Color3, alpha: number) {
        const fromLab = Oklab.to(from);
        const toLab = Oklab.to(to);
        return Oklab.from(fromLab.Lerp(toLab, alpha), false);
    }
}