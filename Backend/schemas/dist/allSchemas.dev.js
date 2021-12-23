"use strict";

var Ajv = require("ajv");

var ajv = new Ajv();
exports.addOrEditPetSchemaAJV = {
  type: 'object',
  properties: {
    type: {
      type: "string",
      maxLength: 15
    },
    adoptionStatus: {
      type: "string",
      maxLength: 10
    },
    name: {
      type: "string",
      maxLength: 15
    },
    colour: {
      type: "string",
      maxLength: 30
    },
    height: {
      type: "string",
      minLength: 1,
      maxLength: 3
    },
    weight: {
      type: "string",
      minLength: 1,
      maxLength: 2
    },
    bio: {
      type: "string",
      maxLength: 200
    },
    hypoallergenic: {
      type: "string",
      minLength: 4,
      maxLength: 5
    },
    dietryRestrictions: {
      type: "string",
      maxLength: 100
    },
    breed: {
      type: "string",
      maxLength: 20
    },
    petID: {
      type: "string",
      maxLength: 50
    },
    adminEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    oldPicturePath: {
      type: "string"
    }
  },
  required: ['type', 'adoptionStatus', 'name', 'colour', 'height', 'weight', 'bio', 'hypoallergenic', 'dietryRestrictions', 'breed', 'adminEmail'],
  additionalProperties: false
};
exports.editPetWithoutPhotoSchemaAJV = {
  type: 'object',
  properties: {
    type: {
      type: "string",
      maxLength: 15
    },
    adoptionStatus: {
      type: "string",
      maxLength: 10
    },
    name: {
      type: "string",
      maxLength: 15
    },
    colour: {
      type: "string",
      maxLength: 30
    },
    height: {
      type: "number"
    },
    weight: {
      type: "number"
    },
    bio: {
      type: "string",
      maxLength: 200
    },
    hypoallergenic: {
      type: "boolean"
    },
    dietryRestrictions: {
      type: "string",
      maxLength: 100
    },
    breed: {
      type: "string",
      maxLength: 20
    },
    petID: {
      type: "string",
      maxLength: 50
    },
    adminEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    }
  },
  required: ['type', 'adoptionStatus', 'name', 'colour', 'height', 'weight', 'bio', 'hypoallergenic', 'dietryRestrictions', 'breed', 'adminEmail'],
  additionalProperties: false
};
exports.petIDSchemaAJV = {
  type: 'object',
  properties: {
    petID: {
      type: "string",
      maxLength: 50
    }
  },
  required: ['petID'],
  additionalProperties: false
};
exports.fosterAndAdoptionSchemaAJV = {
  type: 'object',
  properties: {
    petID: {
      type: "string",
      maxLength: 50
    },
    type: {
      type: "string",
      maxLength: 15
    },
    name: {
      type: "string",
      maxLength: 15
    },
    userEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    }
  },
  required: ['petID', 'type', 'name', 'userEmail'],
  additionalProperties: false
};
exports.signUpSchemaAJV = {
  type: 'object',
  properties: {
    email: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    },
    rePassword: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    },
    firstName: {
      type: "string",
      maxLength: 20
    },
    lastName: {
      type: "string",
      maxLength: 20
    },
    phoneNumber: {
      type: "string",
      minLength: 12,
      maxLength: 12,
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
    },
    admin: {
      type: "boolean"
    },
    adminCode: {
      type: "string"
    }
  },
  required: ['email', 'password', 'rePassword', 'firstName', 'lastName', 'phoneNumber', 'admin'],
  additionalProperties: false
};
exports.loginSchemaAJV = {
  type: 'object',
  properties: {
    email: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    }
  },
  required: ['email', 'password'],
  additionalProperties: false
};
exports.updateProfileSchemaAJV = {
  type: 'object',
  properties: {
    email: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    firstName: {
      type: "string",
      maxLength: 20
    },
    lastName: {
      type: "string",
      maxLength: 20
    },
    phoneNumber: {
      type: "string",
      minLength: 12,
      maxLength: 12,
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
    },
    bio: {
      type: "string",
      maxLength: 200
    }
  },
  required: ['email', 'firstName', 'lastName', 'phoneNumber', 'bio'],
  additionalProperties: false
};
exports.updatePasswordSchemaAJV = {
  type: 'object',
  properties: {
    oldPassword: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    },
    rePassword: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    }
  },
  required: ['oldPassword', 'password', 'rePassword'],
  additionalProperties: false
};
exports.enquiryPostSchemaAJV = {
  type: 'object',
  properties: {
    email: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    firstName: {
      type: "string",
      maxLength: 20
    },
    lastName: {
      type: "string",
      maxLength: 20
    },
    phone: {
      type: "string",
      minLength: 12,
      maxLength: 12,
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
    },
    enquiry: {
      type: "string",
      maxLength: 300
    }
  },
  required: ['email', 'firstName', 'lastName', 'phone', 'enquiry'],
  additionalProperties: false
};
exports.changeEnquiryStatusSchemaAJV = {
  type: 'object',
  properties: {
    adminEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    userEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    enquiryID: {
      type: "string",
      maxLength: 50
    }
  },
  required: ['adminEmail', 'enquiryID', 'userEmail'],
  additionalProperties: false
};
exports.makeAdminSchemaAJV = {
  type: 'object',
  properties: {
    adminEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    publicUserEmail: {
      type: "string",
      format: 'email',
      maxLength: 50
    },
    publicUserID: {
      type: "string",
      maxLength: 50
    }
  },
  required: ['adminEmail', 'publicUserEmail', 'publicUserID'],
  additionalProperties: false
};
exports.lastSeenPetsSchemaAJV = {
  type: 'object',
  properties: {
    allPetArrayIDsString: {
      type: "string"
    }
  },
  required: ['allPetArrayIDsString'],
  additionalProperties: false
};