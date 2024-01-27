class TransactionAncestry {

    constructor(tx, noOfChildren)
    {
        this.tx=tx;
        this.noOfChildren = noOfChildren;
    }
}


function mapTxToInputs(allTransactionsInBlock){
    var transactionsMap ={};

    for(let i=1; i<allTransactionsInBlock.length;i++){
        transactionsMap[allTransactionsInBlock[i].txid]=[];

        for(let j=0; j<allTransactionsInBlock[i].vin.length; j++){
            transactionsMap[allTransactionsInBlock[i].txid].push(allTransactionsInBlock[i].vin[j].txid);   
        }
    }

    return transactionsMap;
}

function FindAllTxAncestries(mapOfTxToInputs){

    var resultMap = {}
    let allTx = Object.keys(mapOfTxToInputs);



    for(let i=0; i<allTx.length;i++){
        if(resultMap[allTx[i]]==undefined){
            resultMap[allTx[i]] = dfs(allTx[i],mapOfTxToInputs, [], resultMap);
        }
    }

    return resultMap;
}

function dfs(transaction, mapOfTxToInputs, res, resultMap){

    let children = mapOfTxToInputs[transaction];

    if(children == undefined) return;

    for (let i=0; i<children.length; i++){
        dfs(children[i], mapOfTxToInputs, res, resultMap);

        if(mapOfTxToInputs[children[i]]!= undefined){
            resultMap[children[i]]= clone(res);
        }

        if(mapOfTxToInputs[children[i]]!= undefined){
            res.push(children[i]);
        }
    }
    return res;
}

function clone(arr){
    return [...arr]
}

function getlargestAncestrySets(mapOfTxToAllInputs, count){
    var allTransactions = [];
    let res = [];

    let allTxKeys = Object.keys(mapOfTxToAllInputs);

    for(let i=0; i<allTxKeys.length; i++){
        allTransactions.push(new TransactionAncestry(allTxKeys[i], mapOfTxToAllInputs[allTxKeys[i]].length));
    }

    allTransactions.sort(function (first, second){

        if (first.noOfChildren > second.noOfChildren){
            return -1;
        }
        if (first.noOfChildren < second.noOfChildren){
            return 1;
        }
        return 0;

    });

    return allTransactions.slice(0, count);
    
}

module.exports = {
    getlargestAncestrySets,
    FindAllTxAncestries,
    mapTxToInputs
}
