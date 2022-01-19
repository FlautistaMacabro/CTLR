// Funções e estruturas relativas à gramática

/*
//exemplo de estrutura de grammar
rules = {
    // S: passa para A, ou termina a string com 'b'
    S: ["A", "b"],
    // acrescenta 'b' e passa para A. Ou passa para B, ou finaliza a string
    A: ["bA", "B", ""],
    // acrescenta 'a' e passa para A
    B: ["aA"]
}
*/

// função para acrescentar novas regras contidas em uma ruleString, na ruleKey presente na estrutura de regras rules
function addRulesForKey(rules, ruleKey, ruleString){
    let newRules = parseRuleString(ruleString);
    for(let nr in newRules)
        rules[ruleKey].push(nr);
    return(rules);
}

// Função auxiliar para processar regras contidas em uma string de regras, com pipe sendo o separador e espaços sendo ignorados
function parseRuleString(ruleString){
    let processed = "";
    let rules = {};
    // Remove os espaços
    processed = ruleString.split(" ").join("");
    // Divide as regras usando o pipe como delimitador
    rules = processed.split("|");

    return(rules);
}

// função recursiva para verificar se a sentença pertence à gramática
// as condições de terminação são chegar ao fim da sentença ou não haver mais próximas regras válidas
// parâmetro noConsumptionCount: quantidade de vezes que a funcão foi chamada sem consumir letra da sentença
function verifySentenceForGrammar(rules, sentence, startRule, noConsumptionCount = 0){
    if(noConsumptionCount >= 200) return(false);
    let sentenceLength = sentence.length;
    let nextRules = [];

    // próximas regras possíveis são obtidas, lembrando que isto eh com a regra recebida na chamada da função
    if(startRule != "") nextRules = verifyCharWithRule(rules[startRule], sentence.charAt(0));

    ////////////////////////////
    //condições de terminação://
    ////////////////////////////
    if((sentenceLength > 0) && (nextRules.length <= 0)) return(false);

    for(const nr of nextRules.filter((ruleToCheckIfNull) => {
        return((ruleToCheckIfNull != 'NaN') &&  (ruleToCheckIfNull != null));
    }
    )){
        let verified = false;

        if(sentenceLength > 1){
            if(nr === "") verified = false;
            else if(nr.charAt(1) === "|") verified = verifySentenceForGrammar(rules, sentence, nr.charAt(0), ++noConsumptionCount);
            else verified = verifySentenceForGrammar(rules, sentence.slice(1), nr.charAt(0));
        }
        else{
            if(nr === "") verified = true;
            else if(nr.charAt(1) === "|") verified = verifySentenceForGrammar(rules, sentence, nr.charAt(0), ++noConsumptionCount);
        }

        if(verified) return(verified);
    }
    // em nenhum momento a condição de sucesso foi alcançada, portanto retornar false
    return(false);
}

// retorna quais são as próximas regras possíveis, dada uma regra e um caractere da string
function verifyCharWithRule(ruleVar, ch){
    if(!(ruleVar != null))
        console.error("ruleVar is null/undefined");
    let nextRules = [];
    for(const atomRule of ruleVar){
        let receivedRule = verifyWithAtomRule(atomRule, ch);

        if(receivedRule != "-1")
            nextRules.push(receivedRule);  
    }
    return(nextRules);
}

// retorna "-1" caso falhe, a regra que se segue após essa no caso de sucesso - com um pipe no fim para indicar se o caractere foi consumido da sentença analisada, ou a regra vazia, que indica fim da checagem da gramática com sucesso.
function verifyWithAtomRule(atomRule, sentenceLetter){

    finalRuleChar = atomRule.slice(-1);
    hasNextRule = false;
    // funciona para string vazia
    // se possui a variável para próxima regra, a qual pode ser vazia
    if(finalRuleChar === finalRuleChar.toUpperCase()) hasNextRule = true;

    // a regra possui unicamente a próxima regra, portanto não é necessário checar pela letra da sentença
    if(atomRule.length <= 1 && hasNextRule){
        if(atomRule.length === 1) return(finalRuleChar+"|");
        else return(""); // grrrrrrr
    }
    else
    // a regra possui o terminal, o qual deve ser checado
    if(atomRule.charAt(0) === sentenceLetter){
        if(hasNextRule) return(finalRuleChar);
        else return(""); // a sentença que seja foi aprovada caso a sentença tenha terminado aqui
    }
    // o caractere não passou no teste
    else return("-1");
}



//export {addRulesForKey, parseRuleString, verifySentenceForGrammar, verifyCharWithRule, verifyWithAtomRule};