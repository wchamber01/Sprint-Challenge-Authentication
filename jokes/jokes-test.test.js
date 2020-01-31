const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const bcrypt = require("bcryptjs");

describe("server", function() {
  describe("server", function() {
    it("should return 401", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(401);
    });

    it("should return JSON", function() {
      //make a GET request to /
      return request(server)
        .get("/api/jokes")
        .then(res => {
          //check for json
          expect(res.type).toMatch(/json/i);
        });
    });

    describe("view a joke - authenticated user", () => {
      beforeEach(async () => {
        await db("users").truncate;
      });
      it("should return status 200", async () => {
        let res = await request(server)
          .post("/api/auth/register")
          .send({ username: "bob", password: "tomato" });
        expect(res.status).toBe(201);
      });
      it("should return a token", async () => {
        res = await request(server)
          .post("/api/auth/login")
          .send({ username: "bob", password: "tomato" });
        expect(res.body.token).toBeTruthy();
      });
      it("should return jokes", async () => {
        res = await request(server)
          .get("/api/jokes")
          .auth("bob", "tomato")
          .set("Authorization", res.body.token);
        expect(res.type).toBe("application/json");
      });
    });
  });
});
