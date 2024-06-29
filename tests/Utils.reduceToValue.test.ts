import { test, expect, describe } from 'vitest';

import { FlowComponentRepresentation } from '../src/interfaces/flows/index.js';

import { Utils } from '../src/index.js';

import { validFlowInitialStateWithConditional } from '../testdata/flow.js';

const utils = new Utils();

const startInput = {
  identity: { name: 'Some text here', age: 123 },
  time: '20240301',
  cancelled: true
};

function isExpected(component: FlowComponentRepresentation, input: Record<string, any>) {
  const conditions =
    component.type === 'conditional'
      ? component.input[0].conditions[0]
      : component.input.conditions[0];
  const { field, expected } = conditions;
  const fixedValue = expected === 'true' ? true : expected === 'false' ? false : expected;
  return input[field] === fixedValue;
}

/**
 * POSITIVE TESTS
 */
describe('Positive tests', () => {
  test('It should reduce a set of components with async functionality and an input to a final value', async () => {
    const expected = {
      name: 'Some text here',
      time: '20240301',
      cancelled: true,
      age: 123
    };

    // Basic approximation of actual Flow functions
    const functions = {
      start: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(startInput);
          }, 25);
        });
      },
      conditional: async (component: FlowComponentRepresentation, input: Record<string, any>) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              next: component.input[0].next,
              input
            });
          }, 25);
        });
      },
      transform: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(expected);
          }, 25);
        });
      },
      refine: async (component: FlowComponentRepresentation, input: Record<string, any>) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (isExpected(component, input)) resolve(input);
            else resolve(null);
          }, 25);
        });
      }
    };

    const result = await utils.reduceToValue(
      validFlowInitialStateWithConditional.components as any,
      functions
    );

    expect(result).toMatchObject(expected);
  });

  test('It should reduce a set of components up to and including a specific ID', async () => {
    const expected = {
      name: 'Some text here',
      age: 123,
      time: '20240301',
      cancelled: true
    };

    // Basic approximation of actual Flow functions
    const functions = {
      start: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(startInput);
          }, 25);
        });
      },
      conditional: async (component: FlowComponentRepresentation, input: Record<string, any>) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (isExpected(component, input))
              resolve({
                next: component.input[0].next,
                input
              });
            else
              resolve({
                next: '',
                input
              });
          }, 25);
        });
      },
      transform: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(expected);
          }, 25);
        });
      },
      refine: async (component: FlowComponentRepresentation, input: Record<string, any>) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (isExpected(component, input)) resolve(input);
            else resolve(null);
          }, 25);
        });
      }
    };

    const result = await utils.reduceToValue(
      validFlowInitialStateWithConditional.components as any,
      functions,
      'transform1'
    );

    expect(result).toMatchObject(expected);
  });

  test('It should handle negative matches on refine', async () => {
    const functions = {
      start: async () => ({ ...startInput, cancelled: false }),
      refine: async (component: FlowComponentRepresentation, input: Record<string, any>) => {
        if (isExpected(component, input)) return input;
        else return null;
      }
    };

    const components: any = [
      { id: 'a', type: 'start', next: 'b' },
      { id: 'b', type: 'refine', input: { conditions: [{ field: 'cancelled', expected: true }] } }
    ];

    const result = await utils.reduceToValue(components, functions);

    expect(result).toBeNull();
  });

  test('It should handle negative matches on conditionals', async () => {
    const functions = {
      start: () => startInput,
      conditional: async (component: FlowComponentRepresentation, input: Record<string, any>) => {
        return new Promise((resolve) => {
          if (isExpected(component, input)) resolve(input);
          else resolve(null);
        });
      },
      email: (_component: FlowComponentRepresentation, input: Record<string, any>) => {
        return input;
      }
    };

    const components: any = [
      { id: 'a', type: 'start', next: 'b' },
      {
        id: 'b',
        type: 'conditional',
        active: true,
        settings: {
          name: 'Conditional test'
        },
        input: [
          {
            name: 'Guest has cancelled',
            type: 'conditional',
            active: true,
            conditions: [
              {
                field: 'cancelled',
                condition: 'is',
                expected: 'false',
                active: true
              }
            ],
            next: 'c'
          }
        ],
        next: '' // Default
      },
      {
        name: '',
        id: 'c',
        type: 'email',
        settings: {},
        input: {},
        next: ''
      }
    ];

    const result = await utils.reduceToValue(components, functions);

    expect(result).toBeNull();
  });
});

/*
 * NEGATIVE TESTS
 */
describe('Negative tests', () => {
  test('It should throw an error if there an expected component does not exist', async () => {
    const functions = {
      start: async () => startInput
    };

    const components: any = [{ id: 'a', type: 'start', next: 'b' }];

    expect(async () => await utils.reduceToValue(components, functions)).rejects.toThrowError();
  });

  test('It should throw an error if attempting to revisit a component node', async () => {
    const functions = {
      start: async () => startInput,
      loop: async () => {
        return {
          abc: 123
        };
      }
    };

    const components: any = [
      { id: 'a', type: 'start', next: 'b' },
      { id: 'b', type: 'loop', next: 'a' }
    ];

    expect(async () => await utils.reduceToValue(components, functions)).rejects.toThrowError();
  });
});
