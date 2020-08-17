
export async function send_tokens(wallet, address, amount, mixin, callback) {
    let mixi = mixin >= 0 ? mixin : 6;
    console.log(`mixi ${mixi}`);
    try {
        console.log(`address ${address}`);
        console.log(`amount ${amount}`);
        let amount2 = amount * 10000000000;
        wallet.createTransaction({
            address: address,
            amount: amount2.toString(),
            tx_type: "1", //token transaction
            mixin: mixi
        }, callback)
    } catch(err) {
        console.error(err);
        console.error(`error at token transaction`);
    }
}

export async function send_cash(wallet, address, amount, mixin, callback) {
    let mixi = mixin >= 0 ? mixin : 6;
    let amount2 = amount * 10000000000;
    try {
        wallet.createTransaction({
            address: address,
            amount: amount2.toString(),
            mixin: mixi
        }, callback)
    } catch(err) {
        console.error(err);
        console.error(`error at cash transaction`)
    }
}

export async function stake_tokens(wallet, amount, mixin, callback) {
    let mixi = mixin >= 0 ? mixin : 6;
    let amount2 = amount * 10000000000;
    return wallet.createAdvancedTransaction({
        tx_type: '3',
        address: wallet.address(),
        amount: amount2.toString(),
        mixin: mixi
    }, callback)
}

export async function create_offer(wallet, username, title, price, quantity, description, mixin, callback) {
    let mixi = mixin >= 0 ? mixin : 6;
    console.log(mixin);
    let price2 = price * 10000000000;
    return wallet.createAdvancedTransaction({
        tx_type: '8',
        safex_username: username,
        safex_offer_title: title,
        safex_offer_price: price2.toString(),
        safex_offer_quantity: quantity,
        safex_offer_description: description,
        safex_offer_price_peg_used: 0,
        mixin: mixi
    }, callback)
}

export async function unstake_tokens(wallet, amount, mixin, callback) {
    let mixi = mixin >= 0 ? mixin : 6;
    return wallet.createAdvancedTransaction({
        tx_type: '4',
        address: wallet.address(),
        amount: amount * 10000000000,
        mixin: mixi
    }).then((tx) => {
        console.log(`stake tokens transaction created: ${tx.transactionsIds()}`);
        return tx;
    });
}

export async function purchase_offer(wallet, cost, offer_id, quantity, mixin, callback) {
    let mixi = mixin >= 0 ? mixin : 6;
    console.log(mixin);
    return wallet.createAdvancedTransaction({
        tx_type: '5',
        address: wallet.address(),
        amount: cost * 10000000000,
        safex_offer_id: offer_id,
        safex_purchase_quantity: quantity,
        mixin: mixi
    }).then((tx) => {
        console.log(`purchase transaction created: ${tx.transactionsIds()}`);
        return tx;
    });
}

export async function edit_offer(wallet, offerid, username, offer_title, offer_price, offer_quantity, offer_description, active, mixin) {
    let mixi = mixin >= 0 ? mixin : 6;
    return wallet.createAdvancedTransaction({
        tx_type: '9',
        safex_offer_id: offerid,
        safex_username: username,
        safex_offer_title: offer_title,
        safex_offer_price: offer_price * 10000000000,
        safex_offer_quantity: offer_quantity,
        safex_offer_description: offer_description,
        safex_offer_active: active,
        mixin: mixi
    }).then((tx) => {
        console.log(`edit offer transaction created: ${tx.transactionsIds()}`);
        return tx;
    });
}

export async function edit_account(wallet, username, data, mixin) {
    let mixi = mixin >= 0 ? mixin : 6;
    return wallet.createAdvancedTransaction({
        tx_type: '7',
        safex_username: username,
        safex_data: data,
        mixin: mixi
    }).then((tx) => {
        console.log(`edit account transaction created: ${tx.transactionsIds()}`);
        return tx;
    });
}

export async function create_price_oracle(wallet, title, creator, description, currency, rate, mixin) {
    let mixi = mixin >= 0 ? mixin : 6;
    return wallet.createAdvancedTransaction({
        tx_type: '11',
        address: wallet.address(),
        amount: 0,
        safex_price_peg_title: title,
        safex_price_peg_creator: creator,
        safex_price_peg_description: description,
        safex_price_peg_currency: currency,
        safex_price_peg_rate: rate,
        mixin: mixi
    }).then((tx) => {
        console.log(`price oracle creation transaction created: ${tx.transactionsIds()}`);
        return tx;
    });
}

export async function update_price_oracle(wallet, title, creator, description, currency, rate, mixin) {
    let mixi = mixin >= 0 ? mixin : 6;
    return wallet.createAdvancedTransaction({
        tx_type: '12',
        address: wallet.address(),
        amount: 0,
        safex_price_peg_title: title,
        safex_price_peg_creator: creator,
        safex_price_peg_description: description,
        safex_price_peg_currency: currency,
        safex_price_peg_rate: rate,
        mixin: mixi
    }).then((tx) => {
        console.log(`price oracle update transaction created: ${tx.transactionsIds()}`);
        return tx;
    });
}

export async function commit_txn(txn) {
    return txn.commit().then((commit) => {
        console.log(`commit ${commit}`);
        console.log(commit);
        return txn;
    });
}
