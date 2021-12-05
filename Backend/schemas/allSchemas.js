const Ajv = require("ajv");
const ajv = new Ajv()

exports.registerSchemaAJV = {
  type: 'object',
  properties: {
    email: {
      type: "string", format: 'email'
    },
    password: {
      type: "string", minLength: 5 
    },
    repassword: {
      type: "string", minLength: 5 
    },
    username:{
      type:"string"
    },
    role:{
      type:"string"
    }
   
  },
  required: ['email', 'password', 'repassword', 'username', "role"],
  additionalProperties: false,
};

exports.loginSchemaAJV = {
  type: 'object',
  properties: {
    email: {
      type: "string", format: 'email'
    },
    password: {
      type: "string", minLength: 5 
    }
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

exports.postSubmitSchemaAJV = {
  type: 'object',
  properties: {
    title: {
      type: "string"
    },
    tags: {
      type: "string",  maxLength: 15 
    },
    post: {
      type: "string"
    }

  },
  required: ['title', 'tags', 'post'],
  additionalProperties: false,
};

exports.editPostSchemaAJV = {
  type: 'object',
  properties: {
    postID: {
      type: "string"
    },
    title: {
      type: "string"
    },
    tags: {
      type: "string",  maxLength: 15 
    },
    post: {
      type: "string"
    }

  },
  required: ['postID','title', 'tags', 'post'],
  additionalProperties: false,
};

exports.searchTermSchemaAJV = {
  type: 'object',
  properties: {
    searchTerm: {
      type: "string"
    }

  },
  required: ['searchTerm'],
  additionalProperties: false,
};

exports.commentSchemaAJV = {
  type: 'object',
  properties: {
    postID: {
      type: "string"
    },
    comment: {
      type: "string"
    }

  },
  required: ['postID', 'comment'],
  additionalProperties: false,
};





