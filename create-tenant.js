const permify = require("@permify/permify-node");

const client = new permify.grpc.newClient({
    endpoint: "localhost:3478",
})

client.tenancy.create({
    id: "t1",
    name: "Tenant 1"
 }).then((response) => {
     // handle response
 }) 