var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /", () => {
    it("should get all users record", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
       
    // Test to add an user
    it("should put an user", (done) => {
      chai.request(app)
        .put(`/`)
        .send({
          "UserName": "Tester",
          "Name": "Test",
          "Age": "20"
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});