import { TESTS_KEY } from '../constants';
import { ITestContext } from '../types';
import { isArray } from './types';
import { isObject } from './types/isObject';

export function hasContextTests(value: unknown): value is ITestContext {
  return isObject(value) && isArray(value[TESTS_KEY]);
}
