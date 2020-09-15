import React from "react"
import { ConnectClass } from "../../utils"
import { fetchStarWarsData } from '../../lib/actions'
import { getStarWarsDataByType } from '../../lib/selectors'
import Header from "../common/header"
import { Tabs, Tab, Grid, CircularProgress } from '@material-ui/core'
import DashboardCard from "../common/dashboard-card";

import './star-wars-dashboard.css'

class StarWarsDashboard extends React.Component {

    static mapDispatchToProps = {
        fetchStarWarsData
    }

    static mapStateToProps = (state) => ({
        getStarWarsDataByType: getStarWarsDataByType(state),
    })

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            loading: false,
            type: 'films',
            tabList: [
                { label: 'films' },
                { label: 'people' },
                { label: 'planets' },
                { label: 'species' },
                { label: 'vehicles' },
                { label: 'starships' }
            ],
            selectedTab: 0
        }
    }

    async componentDidMount () {
        const { type } = this.state
        const { fetchStarWarsData } = this.props
        this.setState({loading: true})
        await fetchStarWarsData(type)
        this.setState({loading: false})
    }

    openDetailPage = (id) => {
        const { type } = this.state
        const { history } = this.props
        history.push(`/issues/${type}/${id}`)
    }

    handleTabChange = async(e, selectedTab) => {
        const { tabList } = this.state
        const { fetchStarWarsData, getStarWarsDataByType } = this.props
        const type = tabList[selectedTab].label
        this.setState({loading: true})
        if(!getStarWarsDataByType(type)) {
            await fetchStarWarsData(type)
        }
        this.setState({loading: false, selectedTab, type})
    }

    onClickCard = ({url}) => {
        const { type } = this.state
        const { history } = this.props
        const delimiter = url.split('/').filter(s=> s!== '')
        const id = delimiter[delimiter.length-1]
        history.push(`/star-wars/${type}/${id}`)
    }

    renderTabContent = () => {
        const { type, loading } = this.state
        const { getStarWarsDataByType } = this.props
        const results = getStarWarsDataByType(type)
        
        if(loading || !results) {
            return <div className="Loader"><CircularProgress /></div>
        }
        return (
            <Grid container spacing={1}>
                {
                    Object.keys(results).map((key, idx) => (
                        <Grid item xs={2} key={`${key}-${idx}`}>
                            <DashboardCard
                                type={type}
                                data={results[key]}
                                onClick={() => this.onClickCard(results[key])} />
                        </Grid>
                        
                    ))
                }
            </Grid>
        )
    }
    render() {
        const { history } = this.props
        const { tabList, selectedTab } = this.state
        
        return (
            <div>
                <Header history={history} />
                <Tabs value={selectedTab} onChange={this.handleTabChange}>
                    {
                        tabList.map( (tab, idx) => {
                            return <Tab key={idx} label={tab.label} />
                        })
                    }
                </Tabs>
                {this.renderTabContent()}
            </div>
        )
    }

}


export default ConnectClass(StarWarsDashboard)