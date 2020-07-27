import { required, integer, float, greaterThan, lesserThan } from "./validators";

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
