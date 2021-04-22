import request from 'supertest'
import app from '../src'

describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(app).get("/reset")
            .expect(404)
            .end(done);
    });
});
