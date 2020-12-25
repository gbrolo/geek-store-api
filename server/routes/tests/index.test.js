import { expect } from 'chai'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../app'

describe("GET /", () => {
  it ("should render homepage", async () => {
    const response = await request(app).get('/')
    expect(response.status).to.eql(200)
  })
})

describe("GET /products?search=star", () => {
  it ("should return 5 products that match star", async () => {
    const response = await request(app).get('/products?search=star')    
    expect(response.status).to.eql(200)
    expect(response.header['total-count']).to.eql('5')
  })
})

after(function(done) {
  mongoose.connection.close(done)
})