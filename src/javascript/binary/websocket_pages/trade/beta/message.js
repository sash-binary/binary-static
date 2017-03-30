const TradingAnalysis_Beta = require('./analysis').TradingAnalysis_Beta;
const Purchase_Beta        = require('./purchase').Purchase_Beta;
const processActiveSymbols_Beta = require('./process').processActiveSymbols_Beta;
const processContract_Beta      = require('./process').processContract_Beta;
const forgetTradingStreams_Beta = require('./process').forgetTradingStreams_Beta;
const processTick_Beta          = require('./process').processTick_Beta;
const processProposal_Beta      = require('./process').processProposal_Beta;
const processTradingTimes_Beta  = require('./process').processTradingTimes_Beta;
const displayCurrencies = require('../currency').displayCurrencies;
const Notifications     = require('../notifications').Notifications;
const Symbols           = require('../symbols').Symbols;
const Tick              = require('../tick').Tick;
const AssetIndexUI    = require('../../resources/asset_index/asset_index.ui');
const TradingTimesUI  = require('../../resources/trading_times/trading_times.ui');
const PortfolioInit   = require('../../user/account/portfolio/portfolio.init');
const ProfitTableInit = require('../../user/account/profit_table/profit_table.init');
const StatementInit   = require('../../user/account/statement/statement.init');
const State  = require('../../../base/storage').State;
const GTM    = require('../../../base/gtm');
const Client = require('../../../base/client');

/*
 * This Message object process the response from server and fire
 * events based on type of response
 */
const Message_Beta = (function () {
    'use strict';

    const process = function (msg) {
        const response = JSON.parse(msg.data);
        if (!State.get('is_beta_trading')) {
            forgetTradingStreams_Beta();
            return;
        }
        if (response) {
            const type = response.msg_type;
            if (type === 'active_symbols') {
                processActiveSymbols_Beta(response);
                AssetIndexUI.setActiveSymbols(response);
                TradingTimesUI.setActiveSymbols(response);
            } else if (type === 'contracts_for') {
                Notifications.hide('CONNECTION_ERROR');
                processContract_Beta(response);
                window.contracts_for = response;
            } else if (type === 'payout_currencies' && response.hasOwnProperty('echo_req') && (!response.echo_req.hasOwnProperty('passthrough') || !response.echo_req.passthrough.hasOwnProperty('handler'))) {
                Client.set('currencies', response.payout_currencies.join(','));
                displayCurrencies();
                Symbols.getSymbols(1);
            } else if (type === 'proposal') {
                processProposal_Beta(response);
            } else if (type === 'buy') {
                Purchase_Beta.display(response);
                GTM.pushPurchaseData(response);
            } else if (type === 'tick') {
                processTick_Beta(response);
            } else if (type === 'history') {
                const digit_info = TradingAnalysis_Beta.digit_info();
                if (response.req_id === 1 || response.req_id === 2) {
                    digit_info.show_chart(response.echo_req.ticks_history, response.history.prices);
                } else {
                    Tick.processHistory(response);
                }
            } else if (type === 'asset_index') {
                AssetIndexUI.setAssetIndex(response);
            } else if (type === 'trading_times') {
                processTradingTimes_Beta(response);
                TradingTimesUI.setTradingTimes(response);
            } else if (type === 'statement') {
                StatementInit.statementHandler(response);
            } else if (type === 'profit_table') {
                ProfitTableInit.profitTableHandler(response);
            } else if (type === 'error') {
                $('.error-msg').text(response.error.message);
            } else if (type === 'portfolio') {
                PortfolioInit.updatePortfolio(response);
            } else if (type === 'proposal_open_contract') {
                PortfolioInit.updateIndicative(response);
            } else if (type === 'transaction') {
                PortfolioInit.transactionResponseHandler(response);
            } else if (type === 'oauth_apps') {
                PortfolioInit.updateOAuthApps(response);
            }
        } else {
            console.log('some error occured');
        }
    };

    return {
        process: process,
    };
})();

module.exports = {
    Message_Beta: Message_Beta,
};
