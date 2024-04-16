// middleware/auth.js

// Import Permify client
const permify = require('@permify/permify-node');

const client = new permify.grpc.newClient({
  endpoint: "localhost:3478",
});

// Middleware function to check user's permissions
const checkPermissions = (permissionType) => {
  return async (req, res, next) => {
    try {
      // Ensure req.params.id exists
      if (!req.params.id) {
        throw new Error('User ID is missing in the request parameters');
      }

      // Convert permissionType to string if necessary
      const permTypeString = String(permissionType);

      // Prepare data for Permify check request
      const checkRes = await client.permission.check({
        tenantId: 't1',
        metadata: {
          schemaVersion: '',
          snapToken: '',
          depth: 20,
        },
        entity: {
          type: 'organization',
          id: "1", // Assuming the id is passed as a URL parameter
        },
        permission: permTypeString, // Use the converted permissionType
        subject: {
          type: 'user',
          id: req.params.id,
        },
      });

      if (checkRes.can === 1) {
        // If user is authorized
        req.authorized = 'authorized';
        next();
      } else {
        // If user is not authorized
        req.authorized = 'not authorized';
        next();
      }
    } catch (err) {
      console.error('Error checking permissions:', err.message); // Log the actual error message
      res.status(500).send(err.message); // Send the actual error message to the client
    }
  };
};

module.exports = checkPermissions;