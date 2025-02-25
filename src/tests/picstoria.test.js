const request = require('supertest');
require('./jest.setup');
const app = require('../../index');
const { User, Photo, SearchHistory } = require('../../models');

describe('Picstoria API Tests', () => {

    afterEach(async () => {
        await Photo.destroy({ where: {} });
        await SearchHistory.destroy({ where: {} });
      });

    // Test User Creation
    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({
                    username: "Bad",
                    email: "bad333@gmail.com"
                });

            expect(res.statusCode).toBe(500);
        });

        it('should reject invalid email', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({
                    username: 'testuser',
                    email: 'invalid-email'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    // Test Photo Search
    describe('GET /api/photos/tag/search', () => {
        beforeEach(async () => {
            await Photo.create({
                imageUrl: 'https://images.unsplash.com/photo-1',
                description: 'Test photo',
                tags: ['nature'],
                userId: 1
            });
        });

        it('should return photos by tag', async () => {
            const res = await request(app)
                .get('/api/photos/tag/search')
                .query({ tags: 'nature' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('photos');
            expect(res.body.photos.length).toBeGreaterThan(0);
        });

        it('should return 404 for non-existent tag', async () => {
            const res = await request(app)
                .get('/api/photos/tag/search')
                .query({ tags: 'nonexistent' });

            expect(res.statusCode).toBe(404);
        });
    });

    // Test Search History
    describe('GET /api/search-history', () => {
        beforeEach(async () => {
            await SearchHistory.create({
                userId: 1,
                query: 'nature'
            });
        });

        it('should return user search history', async () => {
            const res = await request(app)
                .get('/api/search-history')
                .query({ userId: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('searchHistory');
            expect(res.body.searchHistory.length).toBeGreaterThan(0);
        });

        it('should require userId parameter', async () => {
            const res = await request(app)
                .get('/api/search-history');

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    // Cleanup after tests
    afterAll(async () => {
        await User.destroy({ where: {} });
        await Photo.destroy({ where: {} });
        await SearchHistory.destroy({ where: {} });
    });
});