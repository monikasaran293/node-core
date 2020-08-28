import React from "react"
import { ConnectClass } from "../../utils"
import { fetchIssueDetails, fetchIssueList, fetchIssueDetail } from '../../lib/actions'
import { getIssueDetails, getIssueList, getIssueDetail } from '../../lib/selectors'
import Header from "./header"
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { CancelOutlined, InfoOutlined } from '@material-ui/icons'

import './issues-detail-container.css'

class IssuesContainer extends React.Component {

    static mapDispatchToProps = {
        fetchIssueDetails,
        fetchIssueDetail
    }

    static mapStateToProps = (state) => ({
        issueDetails: getIssueDetails(state),
        issueDetail: getIssueDetail(state),
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
        const { fetchIssueDetails, fetchIssueDetail, issueDetails, match: {params} } = this.props
        
        this.setState({loading: true})
        if (!Object.keys(issueDetails).length){
            await fetchIssueDetails()
        }
        const { issueId } = params
        await fetchIssueDetail(issueId)
        this.setState({loading: false, issueId})
    }

    renderLabel = () => {
        const { issueDetail } = this.props
        if(!Object.keys(issueDetail).length)
            return null
        const { labels } = issueDetail
        return (
            labels.map((label, idx) => {
                const { color, name } = label
                const labelstyle = {
                    backgroundColor: `#${color}`,
                    borderRadius: '2em',
                    padding: '0 5px',
                    margin: '5px'
                  };
                return <span style={labelstyle} key={`${name}-${idx}`}>{name}</span>
            })
        )
    }

    renderDetailHeader = () => {
        const { issueDetail } = this.props
        const { title, number, body, state, user } = issueDetail
        return (
            <div>
                <div className='IssueTitle'>
                    <h2>{title} </h2><h2 className="IssueNumber"> # {number}</h2> 
                </div>
                <div className="TagLine">
                    {
                        state === 'open'
                        ? <div className="OpenIcon">
                            <InfoOutlined /><span className='StateIcon'>Open</span>
                        </div>
                        : <div className="CloseIcon">
                            <CancelOutlined /><span className='StateIcon'>Closed</span>
                        </div>
                    }
                    <span>{user.login} opened this issue</span>
                </div>
                <Card>
                    <CardHeader></CardHeader>
                    <CardContent className="CardContent">
                        <div className="BodyContent" dangerouslySetInnerHTML={{__html: body}}/>
                        <div className="Labels">
                            <div>Labels</div>
                            <div>
                                {this.renderLabel()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    render() {
        const { issueDetails, history} = this.props
        const { loading } = this.state
        if(loading) {
            return <div>Loading...</div>
        }
        const { full_name } = issueDetails
        return (
            <div>
                <Header name={full_name} history={history}/>
                { this.renderDetailHeader()}
            </div>
        )
    }

}


export default ConnectClass(IssuesContainer)