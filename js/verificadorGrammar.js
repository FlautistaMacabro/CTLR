function verificaSentencaGramatica(rules, sentence, start = 'S'){
  let curRules = new Set([]);
  curRules.add(start);
  let regrasSeguintes = new Set([]);
  //primeiro loop, verifica ate que a sentenca esteja vazia
  while(sentence != ""){
    for(const linhaAtual of curRules.values()){
      for(const regraAtual of rules[linhaAtual]){
        if(regraAtual === "\\"){;}
        //1th caractere da sentenca eh igual ao 1th da regra
        else if(sentence[0] === regraAtual[0]){
          if(regraAtual[1] =! "")
            regrasSeguintes.add(regraAtual[1]);
          else
            regrasSeguintes.add("\\");
        }
        //caso seja uma regra sem literal
        else if(regraAtual =! "" && regraAtual === regraAtual.toUpper()){
          regrasSeguintes.add(regraAtual[0]);
        }
        //else Error("Unsupported rule name: "+regraAtual);
      }
    }

    //configuracao para proxima iteracao do while(externo)
    curRules = regrasSeguintes;
    if(regrasSeguintes.length() > 0){
      regrasSeguintes = new Set([]);
      sentence = sentence.slice(1);
    }else
      break;
  }

  regrasSeguintes = new Set([]);
  const maxTentativas = 100;
  let contTentativa = 0;
  //checagem do restante das regras apos o fim da sentenca
  while(contTentativa < maxTentativas){
    for(const linhaAtual of curRules){
      if(linhaAtual === "\\") return(true);
      else{
        for(const regraAtual of rules[linhaAtual]){
          if(regraAtual === "\\") return(true);
          else if(regraAtual != "" && regraAtual === regraAtual.toUpper()){
            regrasSeguintes.add(regraAtual);
          }
        }
      }
    }

    //configuracao para proxima iteracao do while(externo)
    contTentativa++;
    curRules = regrasSeguintes;
    regrasSeguintes = new Set([]);
  }

  //nada mais a tentar, portanto falhou.
  return(false); 
}
