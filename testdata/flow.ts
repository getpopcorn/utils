// https://www.mockachino.com/spaces/6e5778ca-638a-4c
const endpointBase = 'https://www.mockachino.com/6e5778ca-638a-4c';

export const validFlowInitialStateSmall = {
  id: 'abc123',
  settings: { description: 'Some description here.' },
  components: [
    {
      name: 'Start',
      id: 'xyz123',
      type: 'start',
      settings: {
        triggers: {
          http: true,
          event: false,
          time: false
        },
        path: '/convertReservations',
        method: 'GET'
      },
      input: [],
      next: ''
    }
  ]
};

export const validFlowSettings = {
  id: 'abc123',
  settings: { description: 'Some description here.' },
  components: []
};

export const validFlowInitialState1 = {
  id: '2gg28s',
  settings: { description: 'Some description here.' },
  components: [
    {
      name: 'Start',
      id: 'abc123',
      type: 'start',
      settings: {
        triggers: {
          http: true,
          event: false,
          time: false
        },
        path: '/convertReservations',
        method: 'GET'
      },
      input: [
        {
          field: 'identity.name',
          type: 'text',
          validation: [],
          isRequired: true
        },
        {
          field: 'identity.age',
          type: 'number',
          validation: [],
          isRequired: true
        },
        {
          field: 'time',
          type: 'date',
          validation: ['timeHhMm'],
          isRequired: true
        },
        {
          field: 'cancelled',
          type: 'true_false',
          validation: [],
          isRequired: true
        }
      ],
      next: 'xyz123'
    },
    {
      name: '',
      id: 'xyz123',
      type: 'refine',
      settings: {
        active: true,
        conditions: [
          {
            field: 'reservations',
            condition: 'lessThan',
            expected: '5',
            active: true
          }
        ]
      },
      input: {
        active: true,
        conditions: [
          {
            field: 'cancelled',
            condition: 'is',
            expected: 'true',
            active: true
          }
        ]
      },
      next: 'asdf123'
    },
    {
      name: '',
      id: 'asdf123',
      type: 'transform',
      settings: {
        nonExistingValueHandling: 'drop',
        currency: {
          symbol: 'EUR',
          locale: 'sv-SE',
          precision: 8
        },
        dateStyle: 'date'
      },
      input: {
        active: true,
        fields: [
          {
            field: 'name',
            value: 'identity.name',
            type: 'keep',
            active: true
          }
        ]
      },
      next: ''
    }
  ]
};

export const validFlowInitialState2 = {
  id: '2gg28s',
  settings: { description: 'Some description here.' },
  components: [
    {
      name: 'Start',
      id: 'abc123',
      type: 'start',
      settings: {
        triggers: {
          http: true,
          event: false,
          time: false
        },
        path: '/convertReservations',
        method: 'GET'
      },
      input: [
        {
          field: 'identity.name',
          type: 'text',
          validation: [],
          isRequired: true
        },
        {
          field: 'identity.age',
          type: 'number',
          validation: [],
          isRequired: true
        },
        {
          field: 'time',
          type: 'date',
          validation: ['timeHhMm'],
          isRequired: true
        },
        {
          field: 'cancelled',
          type: 'true_false',
          validation: [],
          isRequired: true
        }
      ],
      next: 'asdf123'
    },
    {
      name: '',
      id: 'asdf123',
      type: 'transform',
      settings: {
        nonExistingValueHandling: 'drop',
        currency: {
          symbol: 'EUR',
          locale: 'sv-SE',
          precision: 8
        },
        dateStyle: 'date'
      },
      input: {
        active: true,
        fields: [
          {
            field: 'name',
            value: 'identity.name',
            type: 'keep',
            active: true
          }
        ]
      },
      next: 'xyz123'
    },
    // Purposefully unordered to verify that Flow ordering logic works
    {
      name: '',
      id: 'xyz321',
      type: 'transform',
      settings: {
        nonExistingValueHandling: 'drop',
        currency: {
          symbol: 'EUR',
          locale: 'sv-SE',
          precision: 8
        },
        dateStyle: 'date'
      },
      input: {
        active: true,
        fields: [
          {
            field: 'age',
            value: 'identity.age',
            type: 'toString',
            active: true
          }
        ]
      },
      next: ''
    },
    {
      name: '',
      id: 'xyz123',
      type: 'refine',
      settings: {},
      input: {
        active: true,
        conditions: [
          {
            field: 'cancelled',
            condition: 'is',
            expected: 'true',
            active: true
          }
        ]
      },
      next: 'xyz321'
    }
  ]
};

export const validFlowInitialStateWithProcess = {
  id: '2gg28s',
  settings: { description: 'Some description here.' },
  components: [
    {
      name: 'Start',
      id: 'abc123',
      type: 'start',
      settings: {
        triggers: {
          http: true,
          event: false,
          time: false
        },
        path: '/convertReservations',
        method: 'GET'
      },
      input: [
        {
          field: 'identity.name',
          type: 'text',
          validation: [],
          isRequired: true
        },
        {
          field: 'identity.age',
          type: 'number',
          validation: [],
          isRequired: true
        },
        {
          field: 'time',
          type: 'date',
          validation: ['timeHhMm'],
          isRequired: true
        },
        {
          field: 'cancelled',
          type: 'true_false',
          validation: [],
          isRequired: true
        }
      ],
      next: 'aaa111'
    },
    {
      name: '',
      id: 'aaa111',
      type: 'process',
      settings: {
        repeats: false
      },
      input: {},
      next: 'bbb222'
    },
    {
      name: '',
      id: 'bbb222',
      type: 'transform',
      settings: {
        nonExistingValueHandling: 'drop',
        currency: {
          symbol: 'EUR',
          locale: 'sv-SE',
          precision: 8
        },
        dateStyle: 'date'
      },
      input: {
        active: true,
        fields: [
          {
            field: 'age',
            value: 'identity.age',
            type: 'keep',
            active: true
          }
        ]
      },
      isPartOfProcess: 'aaa111',
      next: 'ccc333'
    },
    {
      name: '',
      id: 'ccc333',
      type: 'transform',
      settings: {
        nonExistingValueHandling: 'drop',
        currency: {
          symbol: 'EUR',
          locale: 'sv-SE',
          precision: 8
        },
        dateStyle: 'date'
      },
      input: {
        active: true,
        fields: [
          {
            field: 'name',
            value: 'identity.name',
            type: 'keep',
            active: true
          }
        ]
      },
      isPartOfProcess: 'aaa111',
      next: ''
    }
  ]
};

export const validFlowInitialStateWithProcessComplex = (() => {
  const previousState = {
    id: validFlowInitialStateWithProcess.id,
    settings: validFlowInitialStateWithProcess.settings
  };

  const previousComponents = [...validFlowInitialStateWithProcess.components];
  previousComponents[3].next = 'ddd444';

  return {
    ...previousState,
    components: [
      ...previousComponents,
      {
        name: '',
        id: 'ddd444',
        type: 'datasetGet',
        settings: { endpoint: `${endpointBase}/get`, dataset: '' },
        input: {},
        next: ''
      }
    ]
  };
})();
