const permify = require("@permify/permify-node");

const client = new permify.grpc.newClient({
    endpoint: "localhost:3478",
})

client.schema.write({
    tenantId: "t1",
    schema: "entity user {} \n\nentity organization {\n\n    // roles \n    relation admin @user    \n    relation member @user    \n    relation manager @user    \n    relation agent @user  \n\n    // organization files access permissions\n    permission view_files = admin or manager or (member not agent)\n    permission delete_file = admin \n\n    // vendor files access permissions\n    permission view_vendor_files = admin or manager or agent\n    permission delete_vendor_file = agent\n\n} "
}).then((response) => {
    // handle response
    console.log(response)
})