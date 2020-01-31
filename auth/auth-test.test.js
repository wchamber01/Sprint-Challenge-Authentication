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
        .post("/api/register")
        .send({ userName: "bob", password: "tomato", department: "vegetable" })
        .then(res => {
          expect(res.body.userName).toEqual("bob");
          expect(res.body.password).toBeTruthy();
          expect(res.body.department).toEqual("vegetable");
        });
    });
    // it("should login", async function() {
    //   let tbl = await db("users");
    //   expect(tbl).toHaveLength(1);
    //   return request(server)
    //     .post("/api/login")
    //     .send({ userName: "bob", password: res.body.password })
    //     .then(res => {
    //       console.log(res.body);
    //       expect(res.body.userName).toBe("bob");
    //       expect(res.body.department).toBe("vegetable");
    //     });
    // });
  });
});
