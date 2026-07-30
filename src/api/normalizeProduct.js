export function normalizeProduct(raw) {
    const cameras = [raw.primaryCamera, raw.secondaryCmera]
        .filter(Array.isArray)
        .map((parts) => parts.join(', '))
        .filter(Boolean)
        .join(' / ');

    return {
        id: raw.id,
        brand: raw.brand,
        model: raw.model,
        price: Number(raw.price),
        image: raw.imgUrl,
        cpu: raw.cpu,
        ram: raw.ram,
        os: raw.os,
        screenResolution: raw.displaySize,
        battery: raw.battery,
        cameras: cameras || undefined,
        dimensions: raw.dimentions,
        weight: raw.weight ? `${raw.weight} g` : undefined,
        storageOptions: (raw.options?.storages ?? []).map((option) => ({
            code: String(option.code),
            label: option.name,
        })),
        colorOptions: (raw.options?.colors ?? []).map((option) => ({
            code: String(option.code),
            label: option.name,
        }))
    };
}
