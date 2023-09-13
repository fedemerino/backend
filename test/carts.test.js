const chai = require("chai")
const supertest = require("supertest")
const { expect } = chai
const requester = supertest("https://sneakers-r0yz.onrender.com//")

describe("Carts Test", async () => {
  let createdCart
  beforeEach(function () {
    this.timeout(5000)
  })
  it("Get all carts", async () => {
    requester
      .get("api/carts")
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.be.an("object")
        expect(res.body.status).to.equal("success")
        expect(res.body.carts).to.be.an("array")
        expect(res.body.carts.length).to.be.greaterThan(0)
      })
  })
  it("Get a cart by id", async () => {
    requester
      .get("api/carts/64d59a228b4a7f11c2173c7f")
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.be.an("object")
        expect(res.body.status).to.equal("success")
        expect(res.body.products).to.be.an("array")
      })
  })
  it("Create a cart", async () => {
    const login = await requester.post("session/login").send({
      email: "adminCoder@coder.com",
      password: "adminCod3r123",
    })
    expect(login.body.role).to.equal("admin")
    const cookies = login.headers["set-cookie"][0]
    cookie = {
      name: cookies.split("=")[0],
      value: cookies.split("=")[1].split("")[0],
    }
    expect(cookies).to.be.ok
    expect(cookie.name).to.equal("accessToken")
    expect(cookie.value).to.be.ok
    expect(login.body).to.be.an("object")
    expect(login.body.role).to.equal("admin" || "user")
    requester
      .post("api/carts")
      .set("Cookie", [`${cookie.name} = ${cookie.value}`])
      .send({
        username: "test",
        products: [],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.be.an("object")
        expect(res.body.status).to.equal("success")
        expect(res.body.cart).to.be.an("object")
      })
  })
  it("Get a cart by username", async () => {
    const response = await requester.get("api/carts/user/test").expect(200)
    const responseBody = response.body
    expect(responseBody).to.be.an("object")
    expect(responseBody.status).to.equal("success")
    expect(responseBody.payload).to.be.an("object")
    createdCart = responseBody.payload._id
  })
  it("Modify a cart", async () => {
    requester
      .put(`api/carts/${createdCart}/product/646127712f535d4715af83ba`)
      .send({
        quantity: 9,
      })
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.be.an("object")
        expect(res.body.status).to.equal("success")
      })
  })
   it("Delete a cart", async () => {
    requester
      .delete(`api/carts/${createdCart}`)
      .expect(200)
      .end((err, res) => {
        if (err) throw err
      })
  }) 
})
