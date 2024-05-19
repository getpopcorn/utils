import { MikroCompare } from 'mikrocompare';
import { MikroFormat } from 'mikroformat';

import { Condition, FilterCondition } from './interfaces/index.js';
import { ConditionalConfiguration, ConditionalResult } from './interfaces/flows/Conditional.js';
import { FlowComponentRepresentation } from './interfaces/flows/index.js';
import { FormatFunction, FormatOptions, FormatType } from './interfaces/flows/Format.js';
import { ProcessFunction, ProcessInput } from './interfaces/flows/Process.js';
import { RefineFilterResult } from './interfaces/flows/Refine.js';
import { RequestInput } from './interfaces/flows/Request.js';

import {
  TransformConfiguration,
  TransformOperation,
  TransformResult,
  TransformSettings
} from './interfaces/flows/Transform.js';
import { DatasetInputValidationResult, Field, Header } from './interfaces/Dataset.js';

/**
 * @description Utils are, as you can guess, utilities that
 * are generic and shared in nature.
 *
 * @example
 * const utils = new Utils();
 */
export class Utils {
  private readonly compare: MikroCompare;
  private readonly format: MikroFormat;

  constructor() {
    this.compare = new MikroCompare();
    this.format = new MikroFormat();
  }

  /**
   * @description Run a set of functions on Flow components to reduce down to their final value.
   */
  // eslint-disable-next-line
  public reduceToValue(components: FlowComponentRepresentation[], functions: Record<string, Function>) {
    return components.reduce(
      async (
        result: Record<string, any>[] | Promise<Record<string, any>>,
        component: FlowComponentRepresentation
      ) => {
        const fn = functions[component.type];
        if (fn) return await fn(component, await result);
      },
      components
    );
  }

  /**
   * @description Wait for a number of seconds.
   */
  public async sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  /**
   * @description Retrieve a value as a "cleaned" unit, meaning a "true/false" will
   * be an actual boolean value, and if it's a numeric string, then it's retrieved
   * as a real number.
   *
   * If it can't be coerced then the value is returned as-is.
   */
  public expectedAsCleanedUnit(input: string) {
    if (input === 'true') return true;
    if (input === 'false') return false;
    if (!isNaN(input as any) && !isNaN(parseFloat(input))) return parseFloat(input);
    return input;
  }

  /**
   * @description Returns example data from a list of input objects.
   */
  public getExampleDataFromInput(inputs: Record<string, any>[]) {
    const data = {};

    inputs.forEach((input: Record<string, any>) => {
      const { field, type } = input;
      const fields = field.split('.');

      this.createNestedValues(fields, this.getExampleValue(type), data);
    });

    return data;
  }

  /**
   * @description Gets the nested value from an object.
   *
   * @example
   * const value = this.utils.getNestedValue('preferences.allergies', { preferences: { allergies: true } });
   */
  public getNestedValue(input: string, data: Record<string, any>) {
    if (!input.includes('.') && data.hasOwnProperty(input))
      return data[input] !== undefined ? data[input] : '__KEY_NOT_FOUND__';

    return input.split('.').reduce((acc: any, segment: string) => {
      if (acc !== '__KEY_NOT_FOUND__' && acc.hasOwnProperty(segment)) return acc[segment];
      else return '__KEY_NOT_FOUND__';
    }, data);
  }

  /**
   * @description Deletes a nested key from an object.
   */
  public deleteNestedKey(path: string, obj: Record<string, any>) {
    const keys = path.split('.');

    const deleteKey = (currentObj: Record<string, any>, keyIndex: number) => {
      // If we're at the last key, delete it.
      if (keyIndex === keys.length - 1) {
        delete currentObj[keys[keyIndex]];
        return;
      }

      if (currentObj[keys[keyIndex]]) {
        deleteKey(currentObj[keys[keyIndex]], keyIndex + 1);

        if (Object.keys(currentObj[keys[keyIndex]]).length === 0) delete currentObj[keys[keyIndex]];
      }
    };

    return deleteKey(obj, 0);
  }

  /**
   * @description Creates several nested values in an object.
   */
  public createNestedValues(
    fields: string[],
    replacementValue: unknown,
    start: Record<string, any>
  ) {
    return fields.reduce((acc: any, segment: string, index: number) => {
      if (index < fields.length - 1) {
        if (!acc[segment] || typeof acc[segment] !== 'object') acc[segment] = {};
        return acc[segment];
      } else {
        acc[segment] = replacementValue;
        return acc;
      }
    }, start);
  }

  /**
   * @description Get example values for the Transform component.
   */
  public getExampleValue(type: string) {
    if (type === 'true_false') return true;
    if (type === 'number') return 123;
    if (type === 'text') return 'Some text here';
    if (type === 'multiple_choice') return ['First thing', 'Second thing'];
    if (type === 'url') return 'https://does-not-exist.random.xyz';
    if (type === 'email') return 'sam.person@random.xyz';
    if (type === 'date') return '20240301';
  }

  /**
   * @description Does a deep merge across several objects.
   */
  public deepMerge(...objects: Record<string, any>[]) {
    return objects
      .map((object) => JSON.parse(JSON.stringify(object)))
      .reduce((merged, current) => ({ ...merged, ...current }), {});
  }

  /**
   * @description Converts an input object to a Dataset payload, according
   * to the mapping in the configuration, and the expectations set by the
   * Dataset Headers (schema).
   *
   * Note that it does not fail on extraneous properties, as it picks only
   * what the configuration expects (as references) and/or provides as directly assigned values.
   *
   * @example
   * const input = {
   *   name: 'Sam Person',
   *   site: {
   *     time: '10:00',
   *     location: 'Central'
   *   },
   *   priority: 2,
   *   caseCode: 46
   * };
   *
   * const headers = [
   *   {
   *     id: 'j2d8y22d',
   *     type: 'short_text',
   *     name: 'Name',
   *     isRequired: true,
   *     position: 0,
   *     lastChangedBy: 'user123'
   *   },
   *   {
   *     id: 'kjhf298y',
   *     type: 'short_text',
   *     name: 'Time',
   *     isRequired: true,
   *     position: 1,
   *     lastChangedBy: 'user123'
   *   },
   *   {
   *     id: 'f2oifh9q',
   *     type: 'short_text',
   *     name: 'Location',
   *     isRequired: true,
   *     position: 2,
   *     lastChangedBy: 'user123'
   *   },
   *   {
   *     id: 'fb1891g2',
   *     type: 'number',
   *     name: 'Priority',
   *     isRequired: true,
   *     position: 3,
   *     lastChangedBy: 'user123'
   *   },
   *   {
   *     id: 'mbhwf8ax',
   *     type: 'number',
   *     name: 'Case Code',
   *     isRequired: false,
   *     position: 4,
   *     lastChangedBy: 'user123'
   *   }
   * ];
   *
   * const config = {
   *   j2d8y22d: '{input.name}',
   *   kjhf298y: '{input.site.time}',
   *   f2oifh9q: '{input.site.location}',
   *   fb1891g2: '{input.priority}',
   *   mbhwf8ax: '{input.caseCode}'
   * };
   *
   * const { success, errors } = inputToDatasetPayload(input, headers, config);
   */
  public inputToDatasetPayload(
    input: Record<string, any>,
    headers: Header[],
    config: Record<string, any>
  ): DatasetInputValidationResult {
    const errors: string[] = [];
    let requiredHeaders = headers?.filter((header) => header.isRequired) || [];
    const payload: Field[] = [];

    if (!config || JSON.stringify(config) === '{}') errors.push('No configuration provided');
    else {
      Object.entries(config).forEach(([headerRef, configValue]) => {
        const header = headers.find((header) => header.id === headerRef) as Header;
        const value = this.getReferencedValue(configValue, input);

        const exists = value !== undefined && value !== '__KEY_NOT_FOUND__';
        if (!exists && header.isRequired) errors.push(`Missing value for "${configValue}"`);

        const isValidType = this.validateType(header.type, value);
        if (exists && !isValidType) errors.push(`Invalid type for "${value}"`);

        if (exists) {
          payload.push({ headerRef, value });
          requiredHeaders = requiredHeaders.filter((header) => header.id !== headerRef);
        }
      });
    }

    const success = requiredHeaders.length === 0;
    return { success, errors, payload: success ? payload : [] };
  }

  /**
   * @description Verify that the Header type and the value match.
   */
  private validateType = (type: string, value: unknown) => {
    if (type === 'short_text' && typeof value === 'string') return true;
    if (type === 'number' && typeof value === 'number') return true;
    if (type === 'boolean' && typeof value === 'boolean') return true;
  };

  /**
   * @description Get the referenced value, either literally or if used within a variable-type format.
   */
  public getReferencedValue(value: unknown, input: Record<string, any>) {
    const isString = typeof value === 'string';
    const inputStart = '{input.';
    const isReferenceValue = isString ? value.startsWith(inputStart) : false;
    const fixedValue =
      isString && isReferenceValue ? value.replace(inputStart, '').replace('}', '') : value;

    if (typeof fixedValue === 'string' && isString && isReferenceValue)
      return this.getNestedValue(fixedValue, input);

    return fixedValue;
  }

  /**
   * @description Get all Conditions that are set to active.
   */
  public getActiveConditions(conditions: Condition[]) {
    return conditions.filter((condition: Condition) => condition.active === true);
  }

  /**
   * @description Get all matches for a set of inputs.
   *
   * @example
   * const inputs = [{
   *   email: 'sam.person@random.xyz',
   *   allergies: true,
   * }];
   *
   * const activeConditions = [
   *   {
   *     field: 'allergies',
   *     condition: 'is',
   *     expected: 'false',
   *     active: true
   *   }
   * ];
   *
   * const matchResults = this.utils.getMatchesForInputs(inputs, activeConditions);
   */
  public getMatchesForInputs(
    inputs: Record<string, any>[],
    activeConditions: Condition[],
    getItems = false
  ) {
    return inputs.flatMap((item: Record<string, any>) => {
      let conditionMatches = 0;

      activeConditions.forEach((condition: Condition) => {
        let value = this.getNestedValue(condition.field, item);

        // This handles cases where a value is expected to not exist
        if (value === '__KEY_NOT_FOUND__') {
          if (condition.expected === 'true') return;
          else value = false;
        }

        const expected = this.expectedAsCleanedUnit(condition.expected);

        const check = (value: string) => {
          const matches = this.getComparison(condition.condition, value, expected);
          if (matches) conditionMatches++;
        };

        if (Array.isArray(value)) value.forEach((value: string) => check(value));
        else check(value);
      });

      const allConditionsMet = conditionMatches === activeConditions.length;

      if (getItems && allConditionsMet) return item;
      if (!getItems) return allConditionsMet;
    });
  }

  /**
   * @description Checks whether a value compares correctly toward an expected value.
   */
  private getComparison(condition: FilterCondition, value: any, expected: any) {
    const comparisonFunctions: Record<FilterCondition, any> = {
      contains: () => this.compare.contains([value], expected),
      endsWith: () => this.compare.endsWith(value, expected),
      exists: () => this.compare.exists(value, expected),
      includes: () => this.compare.includes(value, expected),
      is: () => this.compare.is(value, expected),
      lessThan: () => this.compare.lessThan(value, expected),
      lessThanOrEqual: () => this.compare.lessThanOrEqual(value, expected),
      moreThan: () => this.compare.moreThan(value, expected),
      moreThanOrEqual: () => this.compare.moreThanOrEqual(value, expected),
      startsWith: () => this.compare.startsWith(value, expected)
    };

    const fn = comparisonFunctions[condition];
    if (fn) return fn();
  }

  /**
   * @description Reformats a value to another type.
   */
  public reformat(options: FormatOptions): boolean | string | number | null | void {
    const { type, value, currency, dateStyle } = options;

    const formatFunctions: Record<FormatType, FormatFunction> = {
      toBoolean: () => this.format.toBoolean(value),
      toCamelCase: () => this.format.toCamelCase(value as string),
      toCurrency: () =>
        this.format.toCurrency({
          value: value as number,
          precision: currency.precision,
          locale: currency.locale,
          currency: currency.symbol
        }),
      toDate: () => this.format.toDate(value as string, dateStyle),
      toDecimal: () => this.format.toDecimal(value as string | number),
      toInteger: () => this.format.toInteger(value as string | number),
      toJSON: () => this.format.toJSON(value as string),
      toPercent: () => this.format.toPercent(value as string | number),
      toSlug: () => this.format.toSlug(value as string),
      toSnakeCase: () => this.format.toSnakeCase(value as string),
      toString: () => this.format.toString(value),
      toTitleCase: () => this.format.toTitleCase(value as string)
    };

    const fn = formatFunctions[type];
    if (fn) return fn();
  }

  /**
   * @description Filter out all inputs that match all provided, active conditions.
   */
  public filter(input: Record<string, any>[], conditions: Condition[]): RefineFilterResult {
    const activeConditions = this.getActiveConditions(conditions);

    return this.getMatchesForInputs(input, activeConditions, true).filter((item: unknown) => item);
  }

  /**
   * @description Run the functions from the Process queue.
   * The resulting value is not passed between iterations.
   */
  public async runProcess(input: ProcessInput) {
    const { startInput, queue, repeats, count } = input;

    const result: any = [];

    if (repeats && count && count > 0) {
      for (let iteration = 0; iteration < count; iteration++)
        result.push(await this.processQueue(queue, startInput));
    } else result.push(await this.processQueue(queue, startInput));

    return result.flatMap((item: any) => item);
  }

  /**
   * @description Runs each process off of the queue and reduces
   * the result to one final value which is returned.
   */
  private async processQueue(queue: ProcessFunction[], startInput: unknown) {
    return await queue.reduce(
      async (
        result: Promise<Record<string, any>>,
        processComponent: Record<string, any>,
        index: number
      ) => {
        const input = index === 0 ? startInput : await result;
        const componentConfig = processComponent.input;
        return await processComponent.fn(componentConfig, input);
      },
      Promise.resolve({})
    );
  }

  /**
   * @description Determines if input matches a set of ConditionalConfigurations.
   * The result is mapped to either the name of the ConditionalConfiguration,
   * or if to match any of them, to the `default` object in the result.
   */
  public getConditionals(inputs: Record<string, any>[], config: ConditionalConfiguration[]) {
    const results: ConditionalResult = { default: [] };

    const assignResult = (matchIndex: number, inputIndex: number) => {
      if (matchIndex >= 0) {
        const name = config[matchIndex].name;
        if (!results[name]) results[name] = [];
        results[name].push(inputs[inputIndex]);
      } else results['default'].push(inputs[inputIndex]);
    };

    inputs.forEach((input: Record<string, any>, index: number) => {
      const matches = this.conditionalMatches(config, input);
      const matchIndex = matches.findIndex((result: boolean) => result === true);
      assignResult(matchIndex, index);
    });

    return results;
  }

  /**
   * @description Checks each ConditionalConfiguration for whether or not
   * the input matches all active conditions.
   */
  private conditionalMatches(
    config: ConditionalConfiguration[],
    input: Record<string, any>
  ): boolean[] {
    return config.map((config: ConditionalConfiguration) => {
      const { conditions } = config;

      const activeConditions = this.getActiveConditions(conditions);
      const matchResults = this.getMatchesForInputs([input], activeConditions);

      return matchResults.every((result: boolean) => result === true);
    });
  }

  /**
   * @description Transform input data according to a set of TransformFieldOperations.
   * It only changes data that transform operations are expected to modify.
   */
  public transform(
    input: Record<string, any> | Record<string, any>[] = {},
    config: TransformConfiguration,
    settings: TransformSettings
  ): TransformResult | TransformResult[] {
    const results: TransformResult = [];

    if (Array.isArray(input)) {
      for (let iterations = 0; iterations < input.length; iterations++)
        results.push(this.transformed(input[iterations], config, settings));

      return results;
    }

    return this.transformed(input, config, settings);
  }

  /**
   * @description Returns a transform value based on input, configuration, and settings.
   */
  private transformed(
    input: Record<string, any>,
    config: TransformConfiguration,
    settings: TransformSettings
  ) {
    const result: TransformResult = {};

    const usedFields: string[] = [];

    config.fields.forEach((operation: TransformOperation) => {
      const { field, value, type, active } = operation;
      if (!active) return;

      const fields = field.split('.');

      const nestedValue = this.getNestedValue(value, input);
      if (nestedValue === '__KEY_NOT_FOUND__') return;

      const formatOptions = {
        type: type as FormatType,
        value: nestedValue,
        currency: settings.currency,
        dateStyle: settings.dateStyle
      };

      this.createNestedValues(
        fields,
        type === 'keep' ? nestedValue : this.reformat(formatOptions),
        result
      );

      // Ensure that retained, but reformatted, fields aren't removed
      if (field !== value || type === 'drop') usedFields.push(value);
    });

    const transformedResult = this.deepMerge(input, result);

    usedFields.forEach((field: string) => this.deleteNestedKey(field, transformedResult));

    return transformedResult;
  }

  /**
   * @description HTTPS request helper function.
   *
   * @example
   * await request({ endpoint: 'https://api.mydomain.com', method: 'GET' });
   * await request({ endpoint: 'https://api.mydomain.com', method: 'POST', message: 'Hey', headers: { 'x-some-key': 'value' } });
   */
  public async request(input: RequestInput) {
    const { message, endpoint, method } = input;

    const headers = input.headers || {};
    const body = (this.isJson(message as string) ? message : JSON.stringify(message)) as string;

    return await fetch(endpoint, {
      headers,
      method,
      body
    })
      .then((response: any) => {
        if (response.status >= 200 && response.status < 300) return response.text();
        else {
          const errorMessage = `Not OK: Status code is "${response.status}" at URL "${endpoint}" (using method "${method}")`;
          console.error(errorMessage);
          return { popcorn_error: errorMessage };
        }
      })
      .then((response: any) => (this.isJson(response) ? JSON.parse(response) : response));
  }

  /**
   * @description Check if a string input can be unwrapped as a JSON object.
   */
  private isJson = (str: string): Record<string, unknown> | boolean => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
}
