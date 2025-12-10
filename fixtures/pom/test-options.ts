import { test as base, mergeTests } from "@playwright/test";
import { test as pageObjectFixture } from "./page-object-fixtures";

const test = mergeTests(pageObjectFixture);

const expect = base.expect;
export { test, expect };
