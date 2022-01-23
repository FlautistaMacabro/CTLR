function verificaSentencaGramatica(rules, sentence, start = 'S'){
  let curRules = new Set();
  curRules.add(start);
  let regrasSeguintes = new Set();
  regrasSeguintes.clear();
  //primeiro loop, verifica ate que a sentenca esteja vazia
  while(sentence !== ""){
    for(const linhaAtual of curRules.values()){
      if(linhaAtual !== "\\"){
        for(const regraAtual of rules[linhaAtual]){
          if(regraAtual === "\\"){;}
          //1th caractere da sentenca eh igual ao 1th da regra
          else if(sentence[0] === regraAtual[0]){
            if(regraAtual.length >= 2)
              regrasSeguintes.add(regraAtual[1]);
            else
              regrasSeguintes.add("\\");
          }
          //caso seja uma regra sem literal
          else if(regraAtual !== "" && regraAtual === regraAtual.toUpperCase()){
            regrasSeguintes.add(regraAtual[0]);
          }
        }
      }
    }

    //configuracao para proxima iteracao do while(externo)
    
    sentence = sentence.slice(1);
    if((regrasSeguintes.size <= 0) && (sentence.length > 0)) return false;
    else if(sentence.length > 0){
      curRules = new Set(regrasSeguintes);
      regrasSeguintes.clear();
    }else break;
  }

  curRules = new Set(regrasSeguintes);
  regrasSeguintes.clear();
  const maxTentativas = 100;
  let contTentativa = 0;
  //checagem do restante das regras apos o fim da sentenca
  while(contTentativa < maxTentativas){
    for(const linhaAtual of curRules){
      if(linhaAtual === "\\") return(true);
      else{
        for(const regraAtual of rules[linhaAtual]){
          if(regraAtual === "\\") return(true);
          else if(regraAtual !== "" && regraAtual === regraAtual.toUpperCase()){
            regrasSeguintes.add(regraAtual);
          }
        }
      }
    }

    //configuracao para proxima iteracao do while(externo)
    contTentativa++;
    curRules = new Set(regrasSeguintes);
    regrasSeguintes.clear();
  }

  //nada mais a tentar, portanto falhou.
  return(false);
}
