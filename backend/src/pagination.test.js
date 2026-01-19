import { test, describe } from 'node:test';
import assert from 'node:assert';

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

describe('Pagination Bug Fix', () => {
    test('GET /settings with out-of-bounds page should return empty data and total count', async () => {
        const response = await fetch(`${BASE_URL}/settings?limit=10&page=8`);
        const data = await response.json();

        if (response.status === 200) {
            assert.strictEqual(Array.isArray(data.data), true, 'Data should be an array');
            assert.strictEqual(data.data.length, 0, 'Data should be empty for out-of-bounds page');
            assert.ok(data.total >= 0, 'Total count should be a non-negative number');
            assert.strictEqual(data.page, 8, 'Page number should match');
        } else {
            assert.strictEqual(data.error, 'Page out of bounds');
        }
    });

    test('GET /settings with invalid page (0) should return 400', async () => {
        const response = await fetch(`${BASE_URL}/settings?limit=10&page=0`);
        const data = await response.json();

        assert.strictEqual(response.status, 400, 'Should return 400 for invalid page');
        assert.strictEqual(data.error, 'Page and limit must be positive integers');
    });
});
