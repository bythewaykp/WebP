function simplify(L) {
    let G ={}

    function getMin(arr) {
        var minInd = Object.keys(arr)[0];
        for (let i in arr) {
            if (arr[i] < arr[minInd]) minInd = i;
        }
        return minInd;
    }

    function getMax(arr) {
        var maxInd = Object.keys(arr)[0];
        for (let i in arr) {
            if (arr[i] > arr[maxInd]) maxInd = i;
        }
        return maxInd;
    }

    function minOf2(x, y) {
        return x < y ? x : y;
    }

    function minCashFlowRec(db) {
        let mxCredit = getMax(db),
            mxDebit = getMin(db);

        if (db[mxCredit] == 0 && db[mxDebit] == 0) {
            return G;
        }
        var min = minOf2(-db[mxDebit], db[mxCredit]);

        db[mxCredit] -= min;
        db[mxDebit] += min;

        G[mxDebit] ?? (G[mxDebit] = {});
        G[mxDebit][mxCredit] = min;
        G[mxCredit] ?? (G[mxCredit] = {});
        G[mxCredit][mxDebit] = -min;

        minCashFlowRec(db);
    }

    // console.log(L);
    let db = {};
    Object.keys(L).forEach((i) => {
        Object.keys(L).forEach((j) => {
            let a = (L[j]?.[i] ?? 0) - (L[i]?.[j] ?? 0);
            if (!db[i]) db[i] = a;
            else db[i] += a;
        });
    });

    minCashFlowRec(db);
    return G;
}

module.exports = simplify;
