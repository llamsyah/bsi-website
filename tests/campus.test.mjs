import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { campus } from '../src/data/campus.ts';
import { margondaAFacilities, margondaBDocumentation } from '../src/data/facilities.ts';
import { navigation } from '../src/config/navigation.ts';

test('campus data retains the two confirmed Margonda addresses', () => {
  assert.deepEqual(campus.buildings.map(({ id, address }) => ({ id, address })), [
    { id: 'margonda-a', address: 'Jl. Margonda Raya No. 8, Pondok Cina, Beji, Depok' },
    { id: 'margonda-b', address: 'Jl. Margonda Raya No. 471, Pancoran Mas, Depok' },
  ]);
  assert.ok(campus.buildings.every(building => building.mapsUrl.startsWith('https://www.google.com/maps/search/')));
});

test('Margonda A exposes exactly the eight verified facilities with local assets', () => {
  assert.deepEqual(margondaAFacilities.map(facility => facility.name), [
    'Ruang Dosen',
    'Ruang Kelas',
    'Laboratorium',
    'Perpustakaan',
    'Area Parkir',
    'Musholla',
    'Ruang Meeting',
    'Parkiran Gedung',
  ]);
  assert.equal(new Set(margondaAFacilities.map(facility => facility.id)).size, 8);
  for (const facility of margondaAFacilities) {
    const asset = fileURLToPath(new URL(`../public${facility.image}`, import.meta.url));
    assert.equal(existsSync(asset), true, `missing local facility asset: ${facility.image}`);
  }
});

test('Margonda B remains a prepared documentation boundary without invented facilities', () => {
  assert.equal(margondaBDocumentation.facadeStatus, 'PROJECT_CONFIRMED');
  assert.equal(margondaBDocumentation.assetStatus, 'PROJECT PENDING');
  assert.deepEqual(margondaBDocumentation.facilities, []);
});

test('shared navigation follows the approved campus-first journey', () => {
  assert.deepEqual(navigation.map(item => item.label), [
    'Beranda',
    'Kampus Margonda',
    'Program Studi',
    'Biaya & Beasiswa',
    'Panduan PMB',
  ]);
});
