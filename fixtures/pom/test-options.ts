import { test as base, mergeTests } from "@playwright/test";
import { test as pageObjectFixtures } from ".//page-object-fixtures";

const test = mergeTests(pageObjectFixtures);

const expect = base.expect;
export { test, expect };
