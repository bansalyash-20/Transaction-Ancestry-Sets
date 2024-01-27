const APIHelper = require('./APIHelper');
const helper = require('./helper');
const constants = require('./constants');

async function main(){

    let blockHash;
    let allTransactions;

    try {
        
        blockHash = await APIHelper.getBlock(constants.BLOCK_HEIGHT);


        allTransactions = await APIHelper.getAllTransactions(blockHash);


    } catch (error) {
        throw new Error('Fatal error when trying API calls: ' + error);
    }

    let mapOfTxToInputs = helper.mapTxToInputs(allTransactions);

    let txAncestries = helper.FindAllTxAncestries(mapOfTxToInputs);

    let largestAncestrySets = helper.getlargestAncestrySets(txAncestries,10);

    console.log(largestAncestrySets);
}

main();