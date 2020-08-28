
import { CreateApiType, CreateApiActions } from '../utils'
import { IssueService } from './service'


// API Action Types
const FETCH_ISSUE_DETAILS = CreateApiType('fetch-issue-details')
const FETCH_ISSUE_LIST = CreateApiType('fetch-issue-list')
const FETCH_ISSUE_DETAIL = CreateApiType('fetch-issue-detail')

// API Actions
const fetchIssueDetailsActions = CreateApiActions(FETCH_ISSUE_DETAILS)
const fetchIssueListActions = CreateApiActions(FETCH_ISSUE_LIST)
const fetchIssueDetailActions = CreateApiActions(FETCH_ISSUE_DETAIL)


const fetchIssueDetails = () => async(dispatch) => {
    dispatch(fetchIssueDetailsActions.requested())
    try {
        const response = await IssueService.fetchIssueDetails()
        dispatch(fetchIssueDetailsActions.responseReceived({response}))
    }
     catch (e) {
         dispatch(fetchIssueDetailsActions.responseReceived(e))
     }
}

const fetchIssueList = (per_page=10, page=1, state=null) => async(dispatch) => {
    dispatch(fetchIssueListActions.requested())
    try {
        const response = await IssueService.fetchIssueList(per_page, page, state)
        dispatch(fetchIssueListActions.responseReceived({response, page}))
    }
     catch (e) {
         dispatch(fetchIssueListActions.responseReceived(e))
     }
}

const fetchIssueDetail = (id) => async(dispatch) => {
    dispatch(fetchIssueDetailActions.requested())
    try {
        const response = await IssueService.fetchIssueDetail(id)
        dispatch(fetchIssueDetailActions.responseReceived({response}))
    }
     catch (e) {
         dispatch(fetchIssueDetailActions.responseReceived(e))
     }
}


export {
    FETCH_ISSUE_DETAILS,
    FETCH_ISSUE_LIST,
    FETCH_ISSUE_DETAIL,
    fetchIssueDetails,
    fetchIssueList,
    fetchIssueDetail
}