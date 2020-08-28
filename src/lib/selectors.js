import { createSelector } from 'reselect'

const getState = state => state.issues

const getIssueDetails = createSelector(getState, state => state.issueDetails)
const getIssueList = createSelector(getState, state => state.issueList)
const getIssueDetail = createSelector(getState, state => state.issueDetail)


export {
    getIssueDetails,
    getIssueList,
    getIssueDetail
}
