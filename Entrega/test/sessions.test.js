const chai = require("chai")
const supertest = require("supertest")
const { expect } = chai
const requester = supertest("http://localhost:8080/")

describe("Sessions Test", async () => {
  let cookie
  it("Login", async () => {
    const login = await requester.post("session/login").send({
      email: "adminCoder@coder.com",
      password: "adminCod3r123",
    })
    expect(login.body.role).to.equal("admin")
    const cookies = login.headers["set-cookie"][0]
    cookie = {
      name: cookies.split("=")[0],
      value: cookies.split("=")[1].split(";")[0],
    }
    expect(cookies).to.be.ok
    expect(cookie.name).to.equal("accessToken")
    expect(cookie.value).to.be.ok
    expect(login.body).to.be.an("object")
    expect(login.body.role).to.equal("admin" || "user")
  })

  it("Register", async () => {
    const user = await requester.post("session/register").send({
      username: "test",
      password: "test123",
      email: "test@test.com",
      firstName: "test",
      lastName: "test",
    })
    expect(user.body).to.be.an("object")
    expect(user.body.status).to.equal("success")
  })

  it("Forgot Password", async () => {
    const forgotPassword = await requester.post("session/forgotPassword").send({
      email: "test@test.com",
      password: "test1234",
    })
    expect(forgotPassword.body).to.be.an("object")
  })

  it("Delete User", async () => {
    const deleteUser = await requester
      .delete("session/deleteUser")
      .set("Cookie", [`${cookie.name} = ${cookie.value}`])
      .send({
        email: "test@test.com",
      })
    expect(deleteUser.body).to.be.an("object")
    expect(deleteUser.body.status).to.equal("success")
  })
})
