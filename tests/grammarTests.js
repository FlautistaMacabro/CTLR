///grammarTests.js

//import {addRulesForKey, parseRuleString, verifySentenceForGrammar, verifyCharWithRule, verifyWithAtomRule} from '../js/grammar.js';

function assert(condition, message) {
    if (!condition)
        throw new Error(message || "Assertion failed");
    else
        console.log(message+": Assertion sucessful");
}

// função para testar verifyWithAtomRule(atomRule, sentenceLetter)
// status: correto
function testVerifyAtomRule(){
    assert(verifyWithAtomRule("a", "a") === "", "Regra \"a\" com a letra \"a\" deve retornar \"\"");

    assert(verifyWithAtomRule("A", "a") === "A|", "Regra \"A\" com a letra \"a\" deve retornar \"A|\"");

    assert(verifyWithAtomRule("B", "a") === "B|", "Regra \"B\" com a letra \"a\" deve retornar \"B|\"");

    assert(verifyWithAtomRule("a", "") === "-1", "Regra \"a\" com a letra \"\" deve retornar \"-1\"");

    assert(verifyWithAtomRule("A", "") === "A|", "Regra \"A\" com a letra \"\" deve retornar \"A|\"");

    assert(verifyWithAtomRule("aA", "a") === "A", "Regra \"aA\" com a letra \"a\" deve retornar \"A\"");

    assert(verifyWithAtomRule("aB", "a") === "B", "Regra \"aB\" com a letra \"a\" deve retornar \"B\"");

    assert(verifyWithAtomRule("aB", "b") === "-1", "Regra \"aB\" com a letra \"b\" deve retornar \"-1\"");

    assert(verifyWithAtomRule("", "b") === "", "Regra \"\" com a letra \"b\" deve retornar \"\"");
}

function testVerifyCharWithRule(){
    let rule = ["a"];
    let rule2 = ["aA"];
    let rule3 = ["a", "b"];
    let rule4 = ["a", "B"];
    let rule5 = ["A", "b"];
    let rule6 = ["A", "B", "C"];
    let rule7 = ["A"];
    let rule8 = [""];
    let rule9 = ["A", ""];
    let rule10 = ["a", ""];
    

    let rulesToTest = [
        rule, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10
    ];

    for(const ruleInTest of rulesToTest){
        console.log(`\n\"${ruleInTest}\" com letra \"a\": \n`);
        let validRules = verifyCharWithRule(ruleInTest, "a");
        console.log(JSON.stringify(validRules));
        //validRules.forEach(valRule => console.dir(valRule));

        console.log(`\n\"${ruleInTest}\" com letra \"b\": \n`);
        validRules = verifyCharWithRule(ruleInTest, "b");
        console.log(JSON.stringify(validRules));
        //validRules.forEach(valRule => console.dir(valRule));

        console.log(`\n\"${ruleInTest}\" com letra \"c\": \n`);
        validRules = verifyCharWithRule(ruleInTest, "c");
        console.log(JSON.stringify(validRules));
        //validRules.forEach(valRule => console.dir(valRule));
    }
}

function testVerifySentence(){
    let rules = {
        // S: passa para A, ou termina a string com 'b'
        S: ["A", "b"],
        // acrescenta 'b' e passa para A. Ou passa para B, ou finaliza a string
        A: ["bA", "B", ""],
        // acrescenta 'a' e passa para A
        B: ["aA"]
    }

    let rules2 = {
        S: ["A"],
        A: ["S"]
    }

    let rules3 ={
        S: ["aS", "b"]
    }

    let rules4 ={
       S: ["bA", "aA", ""],
       A:  ["b", "aA", ""]
    }

    let sentences = [
        "a", "b", "c", "ccc", "aaac", "ba", "ab", "aab", "baa", "aba", "bba", "bbb", "aaa", "aaaaab", "aaabb"
    ]

    
    sentences.forEach((sentence) => {
        console.log(`\nSentença \"${sentence}\": ${verifySentenceForGrammar(rules4, sentence, "S")}`);
    })
    
    
    //console.log(`\nSentenca \"ab\": ${verifySentenceForGrammar(rules4, "ab", "S")}`);
}