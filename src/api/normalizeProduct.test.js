import { describe, expect, it } from 'vitest';

import { normalizeProduct } from './normalizeProduct';

describe('normalizeProduct', () => {
    it('maps a full detail response to the internal product shape', () => {
        const raw = {
            id: 'abc',
            brand: 'Acer',
            model: 'Iconia Talk S',
            price: '170',
            imgUrl: 'https://example.com/acer.jpg',
            cpu: 'Quad-core 1.3 GHz Cortex-A53',
            ram: '2 GB RAM',
            os: 'Android 6.0 (Marshmallow)',
            displaySize: '720 x 1280 pixels (~210 ppi pixel density)',
            battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
            primaryCamera: ['13 MP', 'autofocus'],
            secondaryCmera: ['2 MP', '720p'],
            dimentions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
            weight: 260,
            options: {
                storages: [
                    { code: 2000, name: '16 GB' },
                    { code: 2001, name: '32 GB' },
                ],
                colors: [{ code: 1000, name: 'Black' }],
            },
        };

        expect(normalizeProduct(raw)).toEqual({
            id: 'abc',
            brand: 'Acer',
            model: 'Iconia Talk S',
            price: 170,
            image: 'https://example.com/acer.jpg',
            cpu: 'Quad-core 1.3 GHz Cortex-A53',
            ram: '2 GB RAM',
            os: 'Android 6.0 (Marshmallow)',
            screenResolution: '720 x 1280 pixels (~210 ppi pixel density)',
            battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
            cameras: '13 MP, autofocus / 2 MP, 720p',
            dimensions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
            weight: '260 g',
            storageOptions: [
                { code: '2000', label: '16 GB' },
                { code: '2001', label: '32 GB' },
            ],
            colorOptions: [{ code: '1000', label: 'Black' }],
        });
    });

    it('converts the price string to a number', () => {
        expect(normalizeProduct({ price: '999' }).price).toBe(999);
    });

    it('defaults storage and color options to empty array when options are missing', () => {
        const product = normalizeProduct({ id: '1', brand: 'Acme', model: 'X' });

        expect(product.storageOptions).toEqual([]);
        expect(product.colorOptions).toEqual([]);
    });

    it('leaves cameras undefined when no camera field is present', () => {
        expect(normalizeProduct({ id: '1' }).cameras).toBeUndefined();
    });

    it('builds the cameras string from only the present camera fields', () => {
        expect(normalizeProduct({ primaryCamera: ['13 MP'] }).cameras).toBe('13 MP');
    });

    it('leaves weight undefined when the API does not report one', () => {
        expect(normalizeProduct({ weight: undefined }).weight).toBeUndefined();
        expect(normalizeProduct({ weight: 0 }).weight).toBeUndefined();
    });

    it('maps the list-endpoint shape, which only has summary fields', () => {
        const raw = {
            id: 'ZmGrkLRPXOTpxsU4jjAcv',
            brand: 'Acer',
            model: 'Iconia Talk S',
            price: '170',
            imgUrl: 'https://example.com/acer.jpg',
        };

        const product = normalizeProduct(raw);

        expect(product.id).toBe('ZmGrkLRPXOTpxsU4jjAcv');
        expect(product.price).toBe(170);
        expect(product.image).toBe('https://example.com/acer.jpg');
        expect(product.storageOptions).toEqual([]);
    });
});
