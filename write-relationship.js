const permify = require("@permify/permify-node");

const client = new permify.grpc.newClient({
    endpoint: "localhost:3478",
})

client.data.write({
    tenantId: "t1",
    metadata: {
        schemaVersion: ""
    },
    tuples: [{
        entity: {
            type: "organization",
            id: "1"
        },
        relation: "member",
        subject: {
            type: "user",
            id: "alice"
        }
    }]
}).then((response) => {
    // handle response
    console.log(response)
})