import { createRequestTypes, createEntityAction, createTransactionRequestTypes, requestAction, action } from './utils'

export const entityName = 'tokens'
const tokenAction = createEntityAction(entityName)
const communitiesAction = createEntityAction('communities')

export const CLEAR_TRANSACTION_STATUS = createRequestTypes('CLEAR_TRANSACTION_STATUS')
export const CLEAR_TRANSACTION = createRequestTypes('CLEAR_TRANSACTION')

export const FETCH_TOKENS = createRequestTypes('FETCH_TOKENS')
export const FETCH_TOKENS_BY_OWNER = createRequestTypes('FETCH_TOKENS_BY_OWNER')
export const FETCH_FEATURED_COMMUNITIES = createRequestTypes('FETCH_FEATURED_COMMUNITIES')

export const FETCH_TOKEN = createRequestTypes('FETCH_TOKEN')
export const FETCH_TOKEN_TOTAL_SUPPLY = createRequestTypes('FETCH_TOKEN_TOTAL_SUPPLY')
export const FETCH_COMMUNITY_DATA = createRequestTypes('FETCH_COMMUNITY_DATA')

export const FETCH_TOKEN_FROM_ETHEREUM = createRequestTypes('FETCH_TOKEN_FROM_ETHEREUM')

export const FETCH_FUSE_TOKEN = createRequestTypes('FETCH_FUSE_TOKEN')

export const CREATE_TOKEN = createTransactionRequestTypes('CREATE_TOKEN')
export const CREATE_TOKEN_WITH_METADATA = createTransactionRequestTypes('CREATE_TOKEN_WITH_METADATA')

export const DEPLOY_TOKEN = createRequestTypes('DEPLOY_TOKEN')

export const DEPLOY_EXISTING_TOKEN = createRequestTypes('DEPLOY_EXISTING_TOKEN')

export const FETCH_TOKEN_PROGRESS = createRequestTypes('FETCH_TOKEN_PROGRESS')
export const FETCH_DEPLOY_PROGRESS = createRequestTypes('FETCH_DEPLOY_PROGRESS')

export const TRANSFER_TOKEN = createTransactionRequestTypes('TRANSFER_TOKEN')
export const TRANSFER_TOKEN_TO_FUNDER = createTransactionRequestTypes('TRANSFER_TOKEN_TO_FUNDER')
export const MINT_TOKEN = createTransactionRequestTypes('MINT_TOKEN')
export const BURN_TOKEN = createTransactionRequestTypes('BURN_TOKEN')
export const ADD_MINTER = createTransactionRequestTypes('ADD_MINTER')

export const fetchTokens = (networkType, page) => tokenAction(FETCH_TOKENS.REQUEST, { networkType, page })
export const fetchTokensByOwner = (networkType, owner) => tokenAction(FETCH_TOKENS_BY_OWNER.REQUEST, { networkType, owner })
export const fetchFeaturedCommunities = (options) => communitiesAction(FETCH_FEATURED_COMMUNITIES.REQUEST, { options })

export const fetchToken = (tokenAddress, options) => tokenAction(FETCH_TOKEN.REQUEST, { tokenAddress, options })
export const fetchTokenTotalSupply = (tokenAddress, options) => requestAction(FETCH_TOKEN_TOTAL_SUPPLY, { tokenAddress, options })
export const fetchCommunity = (communityAddress, options) => communitiesAction(FETCH_COMMUNITY_DATA.REQUEST, { communityAddress, options })

export const fetchTokenFromEthereum = (tokenAddress) => tokenAction(FETCH_TOKEN_FROM_ETHEREUM.REQUEST, { tokenAddress })

export const fetchFuseToken = () => tokenAction(FETCH_FUSE_TOKEN.REQUEST)

export const createToken = (tokenData) => requestAction(CREATE_TOKEN, tokenData)
export const createTokenWithMetadata = (tokenData, metadata, tokenType, steps, options) => requestAction(CREATE_TOKEN_WITH_METADATA, { tokenData, metadata, tokenType, steps, options })

export const deployExistingToken = (metadata, steps, options) => requestAction(DEPLOY_EXISTING_TOKEN, { metadata, steps, options })

export const transferTokenToFunder = (tokenAddress, value) => requestAction(TRANSFER_TOKEN_TO_FUNDER, { tokenAddress, value, options: { desiredNetworkType: 'fuse' } })
export const transferToken = (tokenAddress, to, value) => requestAction(TRANSFER_TOKEN, { tokenAddress, to, value })
export const mintToken = (tokenAddress, value, options) => requestAction(MINT_TOKEN, { tokenAddress, value, options })
export const burnToken = (tokenAddress, value, options) => requestAction(BURN_TOKEN, { tokenAddress, value, options })
export const addMinter = (tokenAddress, minterAddress, options) => requestAction(ADD_MINTER, { tokenAddress, minterAddress, options })

export const fetchTokenProgress = (communityAddress) => requestAction(FETCH_TOKEN_PROGRESS, { communityAddress })
export const fetchDeployProgress = (id) => requestAction(FETCH_DEPLOY_PROGRESS, { id })

export const clearTransactionStatus = (transactionStatus) => action(CLEAR_TRANSACTION_STATUS.REQUEST, { transactionStatus })
export const clearTransaction = () => action(CLEAR_TRANSACTION.REQUEST)
