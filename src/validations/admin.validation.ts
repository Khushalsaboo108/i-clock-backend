
export const create_admin_schema = {
  body: {
    type: 'object',
    required: [
      'name',
      'site_id',
      'password',
      'status',
      'user_type',
      'horizontal_bulk_employee',
      'vertical_bulk_reader'
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 35,
        description: 'Admin name'
      },
      pin: {
        type: 'string',
        minLength: 1,
        maxLength: 20,
        description: 'Admin PIN'
      },
      permlevel: {
        type: 'number',
        description: 'Permission level'
      },
      site_id: {
        type: 'number',
        description: 'Site ID'
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 255,
        description: 'Admin password'
      },
      status: {
        type: 'string',
        enum: ['Active', 'Disabled'],
        description: 'Admin status'
      },
      user_type: {
        type: 'string',
        enum: ['Super Admin', 'Site Admin', 'Report Admin', 'Dashboard Admin'],
        description: 'User type'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Created timestamp'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Updated timestamp'
      },
      horizontal_bulk_employee: {
        type: 'string',
        enum: ['Yes', 'No'],
        description: 'Horizontal bulk employee permission'
      },
      vertical_bulk_reader: {
        type: 'string',
        enum: ['Yes', 'No'],
        description: 'Vertical bulk reader permission'
      }
    }
  }
};


export const login_schema = {
  body: {
    type: 'object',
    required: ['name', 'password'],
    properties: {
      name: {
        type: 'string',
        description: 'Admin name'
      },
      password: {
        type: 'string',
        description: 'Admin password'
      }
    }
  }
};