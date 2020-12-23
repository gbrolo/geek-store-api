import { expect } from 'chai'
import request from 'supertest'
import app from '../../app'

describe("GET /", () => {
  it ("should render homepage", async () => {
    const response = await request(app).get('/')
    expect(response.status).to.eql(200)
  })
})