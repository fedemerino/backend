const chai = require("chai")
const supertest = require("supertest")
const { expect } = chai
const requester = supertest("http://localhost:8080/")

describe("Products Test", async () => {

  let cookie
  let pid

  it("Get all products", async () => {
    requester
      .get("api/products")
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.be.an("object")
        expect(res.body.status).to.equal("success")
        expect(res.body.payload).to.be.an("array")
        expect(res.body.payload.length).to.be.greaterThan(0)
      })
  })

  it("Get a product by id", async () => {
    requester
      .get("api/products/646127712f535d4715af83ba")
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.be.an("object")
        expect(res.body.status).to.equal("success")
        expect(res.body.payload).to.be.an("object")
        expect(res.body.payload._id.toString()).to.equal(
          "646127712f535d4715af83ba"
        )
      })
  })

  it("Create a product", async () => {
    const login = await requester.post("session/login").send({
      email: "adminCoder@coder.com",
      password: "adminCod3r123",
    })
    expect(login.body.role).to.equal("admin")
    const cookies = login.headers["set-cookie"][0]
    cookie = {
      name: cookies.split("=")[0],
      value: cookies.split(";")[0].split("=")[1],
    }
    expect(cookies).to.be.ok
    expect(cookie.name).to.equal("accessToken")
    expect(cookie.value).to.be.ok

    const productSent = await requester
      .post("api/products")
      .set("Cookie", [`${cookie.name} = ${cookie.value}`])
      .send({
        title: "Wireless Earbuds Sony WF-1000XM4 Black Edition",
        description:
          "The latest wireless earbuds from Sony, with noise-cancelling and up to 8 hours of battery life",
        code: "13579",
        price: 279.99,
        status: true,
        stock: 4,
        category: "Electronics",
        thumbnail: ["https://example.com/images/sony_wf_1000xm4_1.jpg"],
        featured: false,
      })
    pid = productSent.body.payload._id
    expect(productSent.body.status).to.equal("success")
  })
  it("Update a product", async () => {
    const productSent = await requester
      .put(`api/products/${pid}`)
      .set("Cookie", [`${cookie.name} = ${cookie.value}`])
      .send({
        title: "Wireless Earbuds Sony WF-1000XM4 Black Edition",
        description:
          "The latest wireless earbuds from Sony, with noise-cancelling and up to 8 hours of battery life",
        code: "13579",
        price: 299.99,
        status: true,
        stock: 6,
        category: "Electronics",
        thumbnail: ["https://example.com/images/sony_wf_1000xm4_1.jpg"],
        featured: false,
      })
    expect(productSent.body.status).to.equal("success")
  })
  it("Delete a product", async () => {
    const productSent = await requester
      .delete(`api/products/${pid}`)
      .set("Cookie", [`${cookie.name} = ${cookie.value}`])
    expect(productSent.body.status).to.equal("success")
  })
})
