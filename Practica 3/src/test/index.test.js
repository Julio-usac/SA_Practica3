const request =  require('supertest')
const server =  require('../log')
const server2 =  require('../cliente')
const server3 =  require('../resturante')
const server4 =  require('../repartidor')
describe('Log Endpoints', () => {
    it('Get', async () => {
        const res =  await  request(server)
        .get('/')
        .send({
            userId:  1
        });
        expect(res.body).toEqual('Log');
    })
    it('Post', async () => {
        const res =  await  request(server)
        .post('/log')
        .send({
            descripcion:  "prueba "
        });
        expect(res.body).toEqual('listo');
    })
})

describe('Cliente Endpoints', () => {
    it('Get', async () => {
        const res =  await  request(server2)
        .get('/')
        .send({
            userId:  1
        });
        expect(res.body).toEqual('Servidor cliente');
    })
    it('Get', async () => {
        const res =  await  request(server2)
        .get('/ordenar')
        .send({
            descripcion:  "prueba "
        });
        expect(res.body).toHaveProperty('id');
    })
})

describe('resturante Endpoints', () => {
    it('Get', async () => {
        const res =  await  request(server3)
        .get('/')
        .send({
            userId:  1
        });
        expect(res.body).toEqual('Servidor restaurante');
    })
    it('Post', async () => {
        const res =  await  request(server3)
        .post('/recibir')
        .send({
            id:  201
        });
        expect(res.body).toEqual('recibido');
    })
})

describe('repartidor Endpoints', () => {
    it('Get', async () => {
        const res =  await  request(server4)
        .get('/')
        .send({
            userId:  1
        });
        expect(res.body).toEqual('Servidor repartidor');
    })
    it('Post', async () => {
        const res =  await  request(server4)
        .post('/recibir')
        .send({
            orden:  201
        });
        expect(res.body).toEqual('recibido');
    })
})

afterAll(async() => {
    server.close();
});

afterAll(async() => {
    server2.close();
});

afterAll(async() => {
    server3.close();
});

afterAll(async() => {
    server4.close();
});

