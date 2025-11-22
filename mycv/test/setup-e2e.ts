import { rm } from 'fs/promises';
import { join } from 'path';

/**
 * Before each end-to-end test, remove the test database file to ensure a clean state.
 */
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test-database.sqlite'), { force: true });
  } catch (err) {}
});