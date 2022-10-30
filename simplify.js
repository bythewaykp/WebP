

function intToChar(int) {
    const code = "a".charCodeAt(0);
    return String.fromCharCode(code + int);
}


function getMin(arr) {
    var minInd = 0;
    for (i = 1; i < arr.length; i++) if (arr[i] < arr[minInd]) minInd = i;
    return minInd;
}

function getMax(arr) {
    var maxInd = 0;
    for (i = 1; i < arr.length; i++) if (arr[i] > arr[maxInd]) maxInd = i;
    return maxInd;
}

function minOf2(x, y) {
    return x < y ? x : y;
}

function minCashFlowRec(amount) {
    var mxCredit = getMax(amount),
        mxDebit = getMin(amount);

    if (amount[mxCredit] == 0 && amount[mxDebit] == 0) return;

    var min = minOf2(-amount[mxDebit], amount[mxCredit]);
    amount[mxCredit] -= min;
    amount[mxDebit] += min;

    console.log(`${intToChar(mxDebit)} owes ${intToChar(mxCredit)} an amount of ${min}`);

    minCashFlowRec(amount);
}

function simplify(L) {
    let N =Object.keys(L).length

    let amount = new Array(N).fill(0)

    for (i = 0; i < N; i++) {
        let k = intToChar(i);
        for (j = 0; j < N; j++) {
            let l = intToChar(j);
            amount[i] += Number(L[l]?.[k] ?? 0) - Number(L[k]?.[l] ?? 0);
        }
    }

    minCashFlowRec(amount);
}



module.exports = simplify
