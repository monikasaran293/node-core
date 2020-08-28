import React from "react"
import { ConnectClass } from "../../utils"
import { fetchIssueDetails, fetchIssueList } from '../../lib/actions'
import { getIssueDetails, getIssueList } from '../../lib/selectors'
import Header from "./header"
import IssueCard from "./issue-card";
import Pagination from '@material-ui/lab/Pagination'
import { Button } from '@material-ui/core'

import './issues-container.css'

class IssuesContainer extends React.Component {

    static mapDispatchToProps = {
        fetchIssueDetails,
        fetchIssueList
    }

    static mapStateToProps = (state) => ({
        issueDetails: getIssueDetails(state),
        issueList: getIssueList(state),
    })

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            loading: false,
            state: null
        }
    }

    async componentDidMount () {
        const { fetchIssueDetails, fetchIssueList } = this.props
        this.setState({loading: true})
        await Promise.all([
            fetchIssueDetails(),
            fetchIssueList()
        ])
        this.setState({loading: false})
    }

    handlePageChange = async(event, page) => {
        const { state } = this.state
        const { fetchIssueList } = this.props
        this.setState({ page, loading: true })
        await fetchIssueList(10, page, state)
        this.setState({loading: false})
    }

    searchOpenIssues = async() => {
        const { page } = this.state
        const { fetchIssueList } = this.props
        this.setState({ loading: true, state: 'open' })
        await fetchIssueList(10, page, 'open')
        this.setState({ loading: false })

    }

    openDetailPage = (id) => {
        const { history } = this.props
        history.push(`/issues/${id}`)
    }

    renderIssueHeader = () => {
        const { issueDetails } = this.props
        const { open_issues } = issueDetails
        return (
            <div>
                <Button variant="contained" onClick={this.searchOpenIssues}>{open_issues} Open</Button>
            </div>
        )
    }

    renderIssues = () => {
        const { issueList } = this.props
        const { page } = this.state
        const items = issueList[page]
        if (items)
            return (
                items.map((item, idx) => {
                    const { title, id, user, labels, state, number } = item
                    return <IssueCard
                        onClick={() => this.openDetailPage(number)}
                        key={`id-${idx}`}
                        title={title}
                        id={id}
                        user={user}
                        labels={labels}
                        state={state}/>
                })
            )
        return null
    }

    renderPagination = () => {
        const { issueList } = this.props
        const { total_count }  = issueList
        const { page } = this.state
        const count = Math.ceil(total_count/10)
        return (
            <div className="PaginationContainer">
                <Pagination count={count} page={page} shape="rounded" onChange={this.handlePageChange}/>
            </div>
        )
    }

    render() {
        const { issueDetails, history } = this.props
        const { loading } = this.state
        if(loading) {
            return <div>Loading...</div>
        }
        const { full_name } = issueDetails
        return (
            <div>
                <Header name={full_name} history={history} />
                { this.renderIssueHeader() }
                { this.renderIssues() }
                { this.renderPagination()}
            </div>
        )
    }

}


export default ConnectClass(IssuesContainer)