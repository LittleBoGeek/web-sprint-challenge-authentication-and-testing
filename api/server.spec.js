const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');
const { intersect } = require('../database/dbConfig');
const { expectCt } = require('helmet');
const testUser = { username:"testing", password:'testing '}


describe('server.js', () => {
    describe('Get request for jokes', () => {
        it('should return status code 400 when not logged in', async () => {
            const res = await request(server).get("/api/jokes")
            expect(res.status).toBe(400);
        })
    }) 
    it('should return json', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.type).toBe('application/json')
   })
   describe('registering new user', () => {
       it('should return status code 201', async () => {
           await db('users').truncate();
           const res = await request(server)
           .post('/api/auth/register')
           .send(testUser)
           expect(res.status).toBe(201)
       }); 
       it('should return status 500 when user is invalid', async () => {
           const res = await request(server)
           .post('/api/auth/register')
           .send({user:'test', pass:'test'});
           expect(res.status).toBe(500);
       });
   });  
   describe("login with user", () => {
       it('should return a status code of 200 with test user ', async () => {
           const res = await request(server)
           .post('/api/auth/login')
           .send(testUser);
           expect(res.status).toBe(200 )
       }) 
       it('should return with status code of 401 for an invalid user', async () => {
           const res = await request(server)
           .post("/api/auth/login")
           .send({username: 'doesnt exist', password:'does not exist'})
            
       })
   })

})






// describe("register new user", () => {
//     it('should return with status code of 201', async () => {
// await db('users').truncate()
// const res = await request(server)
// .post('api/auth/register')
// .send(testUser)
// expect(res.status).toBe(201)
//     })
//     it('should return with status code 500 when user is invalid', async () => {
//         const res = await request(server)
//         .post('api/auth/register')
//         .send({user: testUser, pass:'test'})
//         expect(res.status).toBe(500);
//     })

// })
// describe('login with user', () => {
//     it("should return status code 0f 200 with test users", async () => {
//         const res = await request(server)
//         .post('/api/auth/login')
//         .send(testUser)
//         expect(res.status).toBe(200)        })
// })
// it ('should return status coe of 401 with invalid user', async () => {
//     const res = await request(server)
//     .post('api/auth/login')
//     .send({username: 'does not exist', password:'does not exist'})
// })