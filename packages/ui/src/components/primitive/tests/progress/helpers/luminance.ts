export function luminance(color: string) {
    const context = document.createElement('canvas').getContext('2d');

    if (!context) {
        throw new Error('Canvas is required to resolve theme colors.');
    }

    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);

    const channels = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((channel) => {
        const value = channel / 255;

        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });

    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
