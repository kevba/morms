import { required, integer, float, greaterThan, lesserThan, base, maxLength, minLength } from "./validators";

import { expect } from 'chai';
import 'mocha';

describe('Required validator', () => {
    const tests = [{
        value: "some string",
        expectedValid: true, 
    },{
        value: 12312,
        expectedValid: true, 
    },{
        value: "",
        expectedValid: false, 
    },{
        value: undefined,
        expectedValid: false, 
    },{
        value: null,
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"
        it(`${desc} when the value is ${t.value}`, () => {
            const result = required()(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }
})

describe('Integer validator', () => {
    const tests = [{
        value: 10,
        expectedValid: true, 
    },{
        value: 0,
        expectedValid: true, 
    },{
        value: -70,
        expectedValid: true, 
    },{
        value: "10",
        expectedValid: true, 
    },{
        value: "0",
        expectedValid: true, 
    },{
        value: "-70",
        expectedValid: true, 
    },{
        value: "",
        expectedValid: true, 
    },{
        value: null,
        expectedValid: true, 
    },{
        value: undefined,
        expectedValid: true, 
    },{
        value: "some string",
        expectedValid: false, 
    },{
        value: 9.61,
        expectedValid: false, 
    },{
        value: -100.1,
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"
        it(`${desc} when the value is ${t.value}`, () => {
            const result = integer()(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }
}) 

describe('Float validator', () => {
    const tests = [{
        value: .10,
        expectedValid: true, 
    },{
        value: 0,
        expectedValid: true, 
    },{
        value: 10,
        expectedValid: true, 
    },{
        value: 10.,
        expectedValid: true, 
    },{
        value: 10.1,
        expectedValid: true, 
    },{
        value: 10.11,
        expectedValid: true, 
    },{
        value: -10.11,
        expectedValid: true, 
    },{
        value: "0",
        expectedValid: true, 
    },{
        value: "10",
        expectedValid: true, 
    },{
        value: "10.",
        expectedValid: true, 
    },{
        value: "10.1",
        expectedValid: true, 
    },{
        value: "10.11",
        expectedValid: true, 
    },{
        value: "-10.11",
        expectedValid: true, 
    },{
        value: "10,11",
        expectedValid: true,
    },{
        value: "10a11",
        expectedValid: false, 
    },{
        value: "10..11",
        expectedValid: false, 
    },{
        value: ".10",
        expectedValid: false, 
    },{
        value: "aaa",
        expectedValid: false, 
    },{
        value: "10.1.",
        expectedValid: false, 
    },{
        value: "10.a",
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"
        it(`${desc} when the value is ${t.value}`, () => {
            const result = float()(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }
}) 

describe('Greater than validator', () => {
    const tests = [{
        max: 5,
        value: 1,
        expectedValid: true, 
    },{
        max: 5,
        value: 5,
        expectedValid: true, 
    },{
        max: 5,
        value: -100,
        expectedValid: true, 
    },{
        max: 5,
        value: 7,
        expectedValid: false, 
    },{
        max: 5,
        value: 999999999999,
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"

        it(`${desc} if ${t.value} is smaller then ${t.max}`, () => {
            const result = greaterThan(t.max)(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }  
})

describe('Lesser than validator', () => {
    const tests = [{
        min: 5,
        value: "",
        expectedValid: true, 
    },{
        min: 5,
        value: 7,
        expectedValid: true, 
    },{
        min: 5,
        value: 999999999999,
        expectedValid: true, 
    },{
        min: 5,
        value: 5,
        expectedValid: true,
    },{
        min: 5,
        value: "5",
        expectedValid: true,
    },{
        min: 5,
        value: 1,
        expectedValid: false, 
    },{
        min: 5,
        value: -100,
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"
        it(`${desc} if ${t.value} is larger then ${t.min}`, () => {
            const result = lesserThan(t.min)(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }  
})

describe('Max length validator', () => {
    const tests = [{
        max: 2,
        value: "",
        expectedValid: true, 
    },{
        max: 2,
        value: "aa",
        expectedValid: true, 
    },{
        max: 2,
        value: "aaa",
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"

        it(`${desc} if ${t.value} is longer then ${t.max}`, () => {
            const result = maxLength(t.max)(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }  
})

describe('Min length validator', () => {
    const tests = [{
        min: 2,
        value: "",
        expectedValid: true, 
    },{
        min: 2,
        value: "aa",
        expectedValid: true, 
    },{
        min: 2,
        value: "aaa",
        expectedValid: true, 
    },{
        min: 2,
        value: "a",
        expectedValid: false, 
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"

        it(`${desc} if ${t.value} is shorter then ${t.min}`, () => {
            const result = minLength(t.min)(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }  
})

describe('Base validator', () => {
    const tests = [{
        value: "0000",
        expectedValid: true, 
        base: 2
    },{
        value: "1101",
        expectedValid: true, 
        base: 2
    },{
        value: "1102",
        expectedValid: false, 
        base: 2
    },{
        value: "1600",
        expectedValid: true, 
        base: 16
    },{
        value: "ffff",
        expectedValid: true, 
        base: 16
    },{
        value: "g111",
        expectedValid: false, 
        base: 16
    }]

    for (const t of tests) {
        const desc =  t.expectedValid ? "Should be valid" :  "Should be invalid"
        it(`${desc} when the value is ${t.value}`, () => {
            const result = base(t.base)(t.value)
            expect(result.valid).to.equal(t.expectedValid)
        })
    }
}) 
