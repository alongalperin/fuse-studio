const config = require('config')
const { withAccount } = require('@utils/account')
const { createNetwork } = require('@utils/web3')
const { fetchTokenByCommunity } = require('@utils/graph')
const request = require('request-promise-native')
const lodash = require('lodash')

const bonus = withAccount(async (account, { communityAddress, bonusInfo }, job) => {
  const { web3 } = createNetwork('home', account)
  try {
    console.log(`Requesting token bonus for wallet: ${bonusInfo.receiver} and community: ${communityAddress}`)
    let tokenAddress, originNetwork
    if (lodash.get(job.attrs.data.transactionBody, 'tokenAddress', false) && lodash.get(job.attrs.data.transactionBody, 'originNetwork', false)) {
      tokenAddress = lodash.get(job.attrs.data.transactionBody, 'tokenAddress')
      originNetwork = lodash.get(job.attrs.data.transactionBody, 'originNetwork')
    } else {
      const token = await fetchTokenByCommunity(communityAddress)
      tokenAddress = web3.utils.toChecksumAddress(token.address)
      originNetwork = token.originNetwork
    }
    request.post(`${config.get('funder.urlBase')}bonus/token`, {
      json: true,
      body: { phoneNumber: bonusInfo.phoneNumber, identifier: bonusInfo.identifier, accountAddress: bonusInfo.receiver, tokenAddress, originNetwork, bonusInfo, communityAddress }
    }, (err, response, body) => {
      if (err) {
        console.error(`Error on token bonus for wallet: ${bonusInfo.receiver}`, err)
        job.fail(err)
      } else if (body.error) {
        console.error(`Error on token bonus for wallet: ${bonusInfo.receiver}`, body.error)
        job.fail(body.error)
      } else if (lodash.has(body, 'job._id')) {
        job.attrs.data.funderJobId = body.job._id
      }
      job.save()
    })
  } catch (e) {
    console.error(`Error on token bonus for wallet: ${bonusInfo.receiver}`, e)
  }
})

module.exports = {
  bonus
}
