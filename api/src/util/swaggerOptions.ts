export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Certificate affiliation API',
      version: '1.2.0',
      description: 'A simple express library API'
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token'
        }
      },
      schemas: {
        LoginSchema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              minLength: 6
            }
          },
          example: {
            email: 'admin@example.com',
            password: '123456'
          }
        },
        UserSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              minLength: 3
            },
            firstname: {
              type: 'string',
              minLength: 3,
              maxLength: 20
            },
            lastname: {
              type: 'string',
              minLength: 3,
              maxLength: 20
            },
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              minLength: 6
            },
            roles: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
          example: {
            username: 'tholland',
            firstname: 'Tom',
            lastname: 'Holland',
            email: 'admin@example.com',
            password: '123456',
            roles: ['admin', 'user']
          }
        },
        IdentitySchema: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string',
              minLength: 3,
              maxLength: 20
            },
            lastname: {
              type: 'string',
              minLength: 3,
              maxLength: 20
            },
            sexo: {
              type: 'string',
              enum: ['Masculino', 'Femenino']
            },
            fechaNacimiento: {
              type: 'string',
              format: 'date'
            },
            nroDocumento: {
              type: 'string',
              minLength: 5,
              maxLength: 10
            },
            complemento: {
              type: 'string',
              maxLength: 2
            },
            department: {
              type: 'string',
              enum: [
                'Beni',
                'Chuquisaca',
                'Cochabamba',
                'La Paz',
                'Oruro',
                'Potosi',
                'Pando',
                'Santa Cruz',
                'Tarija',
                'Exterior'
              ]
            }
          },
          example: {
            firstname: 'Ryan',
            lastname: 'Reynolds Doe',
            sexo: 'Masculino',
            fechaNacimiento: '1976-10-23',
            nroDocumento: '8544512',
            complemento: 'A2',
            department: 'Beni'
          }
        },
        UserNotFoundSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'User not found'
            }
          },
          example: {
            message: 'User not found'
          }
        },
        IdentityNotFoundSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Identity not found'
            }
          },
          example: {
            message: 'Identity not found'
          }
        },
        IdentityAlreadyExistsSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Identity already exists'
            }
          },
          example: {
            message: 'Identity already exists'
          }
        },
        TestAffiliationSchema: {
          type: 'object',
          properties: {
            documentos: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
          example: {
            documentos: ['9189645', '8544512']
          }
        },
        AffiliationSchema: {
          type: 'object',
          properties: {
            _id: {
              type: 'string'
            },
            success: {
              type: 'boolean'
            },
            testResponse: {
              type: 'object',
              properties: {
                url: {
                  type: 'string'
                },
                public_id: {
                  type: 'string'
                }
              }
            },
            testVideo: {
              type: 'object',
              properties: {
                url: {
                  type: 'string'
                },
                public_id: {
                  type: 'string'
                }
              }
            },
            testError: {
              type: 'object'
            },
            user: {
              $ref: '#/components/schemas/UserSchema'
            },
            identity: {
              $ref: '#/components/schemas/IdentitySchema'
            }
          },
          example: {
            _id: '627987b8e498aafdae2bb3c8',
            success: true,
            testResponse: {
              url: 'https://res.cloudinary.com/deqnmn50h/image/upload/v1652131750/affiliation-api/pdf/twaasq7wb02zxmv1zt7y.pdf',
              public_id: 'affiliation-api/pdf/twaasq7wb02zxmv1zt7y'
            },
            testVideo: {
              url: 'https://res.cloudinary.com/deqnmn50h/video/upload/v1652131758/affiliation-api/video/gabgfz2idkkyf3ogoam2.webm',
              public_id: 'affiliation-api/video/gabgfz2idkkyf3ogoam2'
            },
            testError: null,
            user: {
              _id: '62787bf3130c8a368535a977',
              username: 'rreynolds',
              firstname: 'Ryan',
              lastname: 'Reynolds',
              email: 'ryan@example.com',
              password: '$2a$10$n3GuoMIS0O6abCPe2g4SeO0SesI83mUHko3uTHe4HHNoNDwdoaeQi',
              roles: [
                {
                  name: 'user'
                },
                {
                  name: 'admin'
                }
              ]
            },
            identity: {
              _id: '62787c9bb08622ccdb0e4e83',
              firstname: 'Fernando',
              lastname: 'Mendoza Escobar',
              fechaNacimiento: '1994-05-30',
              sexo: 'Masculino',
              nroDocumento: '9189645',
              department: 'La Paz'
            },
            createdAt: '2022-05-09T21:29:29.007Z',
            updatedAt: '2022-05-09T21:29:29.007Z'
          }
        },
        AffiliationRoleUserSchema: {
          type: 'object',
          properties: {
            _id: {
              type: 'string'
            },
            success: {
              type: 'boolean'
            },
            testResponse: {
              type: 'object',
              properties: {
                url: {
                  type: 'string'
                },
                public_id: {
                  type: 'string'
                }
              }
            },
            testVideo: {
              type: 'object',
              properties: {
                url: {
                  type: 'string'
                },
                public_id: {
                  type: 'string'
                }
              }
            },
            testError: {
              type: 'object'
            },
            identity: {
              $ref: '#/components/schemas/IdentitySchema'
            }
          },
          example: {
            _id: '627987b8e498aafdae2bb3c8',
            success: true,
            testResponse: {
              url: 'https://res.cloudinary.com/deqnmn50h/image/upload/v1652131750/affiliation-api/pdf/twaasq7wb02zxmv1zt7y.pdf',
              public_id: 'affiliation-api/pdf/twaasq7wb02zxmv1zt7y'
            },
            testError: null,
            identity: {
              _id: '62787c9bb08622ccdb0e4e83',
              firstname: 'Fernando',
              lastname: 'Mendoza Escobar',
              fechaNacimiento: '1994-05-30',
              sexo: 'Masculino',
              nroDocumento: '9189645',
              department: 'La Paz'
            },
            createdAt: '2022-05-09T21:29:29.007Z',
            updatedAt: '2022-05-09T21:29:29.007Z'
          }
        },
        AffiliationNotFoundSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Affiliation not found'
            }
          },
          example: {
            message: 'Affiliation not found'
          }
        },
        SuccesTestAffiliationSchema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean'
            },
            testResponse: {
              type: 'object',
              properties: {
                url: {
                  type: 'string'
                },
                public_id: {
                  type: 'string'
                }
              }
            },
            testError: {
              type: 'object'
            }
          },
          example: [
            {
              _id: '627987b8e498aafdae2bb3c8',
              success: true,
              testResponse: {
                url: 'https://res.cloudinary.com/deqnmn50h/image/upload/v1651857521/affiliation-api/pdf/yi5ac0h7ujxy0vywt5qb.pdf',
                public_id: 'affiliation-api/pdf/yi5ac0h7ujxy0vywt5qb'
              },
              testError: null,
              identity: {
                nroDocumento: '45788554'
              }
            }
          ]
        },
        ErrorTestAffiliationSchema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean'
            },
            testError: {
              type: 'object'
            }
          },
          example: [
            {
              success: false,
              testError: {
                message: 'The document does not exist'
              }
            }
          ]
        },
        ErrorAffiliationRolesSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'User or document number not found'
            }
          },
          example: {
            message: 'Document number not found'
          }
        }
      }
    },
    paths: {
      '/api/signup': {
        post: {
          summary: 'Register a new user',
          description: 'Sign up',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserSchema'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Sign up success'
            }
          },
          tags: ['Authentication'],
          security: []
        }
      },
      '/api/signin': {
        post: {
          summary: 'Login a user',
          description: 'Sign in',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginSchema'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Sign in success'
            }
          },
          tags: ['Authentication'],
          security: []
        }
      },
      '/api/affiliations': {
        get: {
          summary: 'Get cetificates of affiliations',
          description: 'Get cetificates of affiliation',
          responses: {
            '200': {
              description: 'Get cetificates of affiliation success'
            }
          },
          tags: ['Certificate of affiliation'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        post: {
          summary: 'Test certificate of affiliation',
          parameters: [
            {
              in: 'query',
              name: 'caja',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Caja to test'
            }
          ],
          description: 'Test certificate of affiliation',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestAffiliationSchema'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Test certificate of affiliation success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/SuccesTestAffiliationSchema'
                  }
                }
              }
            },
            '201': {
              description:
                'Test certificate of affiliation success but the document does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorTestAffiliationSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Certificate of affiliation'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/affiliations/{id}': {
        get: {
          summary: 'Get certificate of affiliation',
          description: 'Get certificate of affiliation',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            '200': {
              description: 'Get certificate of affiliation success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AffiliationSchema'
                  }
                }
              }
            },
            '404': {
              description: 'The certificate of affiliation does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AffiliationNotFoundSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Certificate of affiliation'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        delete: {
          summary: 'Delete certificate of affiliation',
          description: 'Delete certificate of affiliation',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            '204': {
              description: 'Delete certificate of affiliation success'
            },
            '404': {
              description: 'The certificate of affiliation does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AffiliationNotFoundSchema'
                  }
                }
              },
              '500': {
                description: 'Some server error'
              }
            }
          },
          tags: ['Certificate of affiliation'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/affiliationsRoleAdmin': {
        get: {
          summary: 'Get affiliations by role (Admin)',
          description: 'Get affiliations of role (Admin)',
          parameters: [
            {
              in: 'query',
              name: 'username',
              schema: {
                type: 'string'
              },
              required: false,
              description: 'Username to get affiliations'
            },
            {
              in: 'query',
              name: 'nroDocumento',
              schema: {
                type: 'string'
              },
              required: false,
              description: 'Document number to get affiliations'
            },
            {
              in: 'query',
              name: 'success',
              schema: {
                type: 'boolean'
              },
              required: false,
              description: 'Success to get affiliations'
            }
          ],
          responses: {
            '200': {
              description: 'Get affiliations by role admin success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AffiliationSchema'
                  }
                }
              }
            },
            '404': {
              description: 'The affiliations of user or document number does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorAffiliationRolesSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Get affiliations by roles'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/affiliationsRoleUser': {
        get: {
          summary: 'Get affiliations by role (User)',
          description: 'Get affiliations of role (User)',
          parameters: [
            {
              in: 'query',
              name: 'nroDocumento',
              schema: {
                type: 'string'
              },
              required: false,
              description: 'Document number to get affiliations'
            },
            {
              in: 'query',
              name: 'success',
              schema: {
                type: 'boolean'
              },
              required: false,
              description: 'Success to get affiliations'
            }
          ],
          responses: {
            '200': {
              description: 'Get affiliations by role user success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AffiliationRoleUserSchema'
                  }
                }
              }
            },
            '404': {
              description: 'The affiliations of document number does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorAffiliationRolesSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Get affiliations by roles'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/affiliationsRoleModerator': {
        get: {
          summary: 'Get affiliations by role (Moderator)',
          description: 'Get affiliations of role (Moderator)',
          parameters: [
            {
              in: 'query',
              name: 'username',
              schema: {
                type: 'string'
              },
              required: false,
              description: 'Username to get affiliations'
            }
          ],
          responses: {
            '200': {
              description: 'Get affiliations by role moderator success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AffiliationRoleUserSchema'
                  }
                }
              }
            },
            '404': {
              description: 'The affiliations of username does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorAffiliationRolesSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Get affiliations by roles'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/users': {
        get: {
          summary: 'Get users',
          description: 'Get users',
          responses: {
            '200': {
              description: 'Get users success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['User'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/users/{id}': {
        get: {
          summary: 'Get user',
          description: 'Get user',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            '200': {
              description: 'Get user success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserSchema'
                  }
                }
              }
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserNotFoundSchema'
                  }
                }
              }
            }
          },
          tags: ['User'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        put: {
          summary: 'Update user',
          description: 'Update user',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserSchema'
                }
              }
            }
          },
          responses: {
            '204': {
              description: 'Update user success'
            },
            '404': {
              description: 'The user does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserNotFoundSchema'
                  }
                }
              }
            }
          },
          tags: ['User'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        delete: {
          summary: 'Delete user',
          description: 'Delete user',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            '204': {
              description: 'Delete user success'
            },
            '404': {
              description: 'The user does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserNotFoundSchema'
                  }
                }
              }
            }
          },
          tags: ['User'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/identities': {
        get: {
          summary: 'Get identities',
          description: 'Get identities',
          responses: {
            '200': {
              description: 'Get identities success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentitySchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Identity'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        post: {
          summary: 'Create identity',
          description: 'Create identity',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IdentitySchema'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Create identity success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentitySchema'
                  }
                }
              }
            },
            '400': {
              description: 'The document already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentityAlreadyExistsSchema'
                  }
                }
              }
            },
            '500': {
              description: 'Some server error'
            }
          },
          tags: ['Identity'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      },
      '/api/identities/{id}': {
        get: {
          summary: 'Get identity',
          description: 'Get identity',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            '200': {
              description: 'Get identity success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentitySchema'
                  }
                }
              }
            },
            '404': {
              description: 'Identity not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentityNotFoundSchema'
                  }
                }
              }
            }
          },
          tags: ['Identity'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        put: {
          summary: 'Update identity',
          description: 'Update identity',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IdentitySchema'
                }
              }
            }
          },
          responses: {
            '204': {
              description: 'Update identity success'
            },
            '404': {
              description: 'The identity does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentityNotFoundSchema'
                  }
                }
              }
            }
          },
          tags: ['Identity'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        },
        delete: {
          summary: 'Delete identity',
          description: 'Delete identity',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'string'
              },
              required: true
            }
          ],
          responses: {
            '204': {
              description: 'Delete identity success'
            },
            '404': {
              description: 'The identity does not exist',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/IdentityNotFoundSchema'
                  }
                }
              }
            }
          },
          tags: ['Identity'],
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      }
    }
  },
  apis: [__filename]
}
