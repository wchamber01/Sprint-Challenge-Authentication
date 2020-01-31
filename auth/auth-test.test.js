const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const bcrypt = require("bcryptjs");

describe("server", function() {
  describe("server", function() {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return HTML", function() {
      //make a GET request to /
      return request(server)
        .get("/")
        .then(res => {
          //check for json
          expect(res.type).toMatch(/html/i);
        });
    });

    it("should return text its alive", function() {
      //make a GET request to /
      return request(server)
        .get("/")
        .then(res => {
          //check for property in the body
          expect(res.text).toBe("It's alive!");
        });
    });
  });

  describe("register to /api/register", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });
    //make a POST request
    it("should register", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "larry", password: "cucumber" })
        .then(res => {
          expect(res.body.username).toEqual("larry");
          expect(res.body.password).toBeTruthy();
        });
    });
  });

  describe("login functionality", () => {
    it("should return status 200", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "larry", password: "cucumber" });
      expect(res.status).toBe(200);
    });
    it("should return a token", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "larry", password: "cucumber" });
      expect(res.body.token).toBeTruthy();
    });
    it("should return json", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "larry", password: "cucumber" });
      expect(res.type).toBe("application/json");
    });
  });
});
