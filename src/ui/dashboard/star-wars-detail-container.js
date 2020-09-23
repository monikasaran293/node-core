import React from "react"
import { ConnectClass } from "../../utils"
import { fetchStarWarsData } from '../../lib/actions'
import { getStarWarsDataByType } from '../../lib/selectors'
import Header from "../common/header"
import { Accordion, AccordionSummary, AccordionDetails, Grid, CircularProgress } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import DashboardCard from "../common/dashboard-card";

import './star-wars-detail-container.css'

class StarWarsDetailContainer extends React.Component {

    static mapDispatchToProps = {
        fetchStarWarsData
    }

    static mapStateToProps = (state) => ({
        getStarWarsDataByType: getStarWarsDataByType(state),
    })


    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            expanded: null,
            peopleMap: ['characters', 'residents', 'pilots']
        }
    }

    async componentDidMount () {
        const { fetchStarWarsData, getStarWarsDataByType, match: {params} } = this.props
        const { type, id } = params

        this.setState({loading: true})
        if (!getStarWarsDataByType(type)){
            await fetchStarWarsData(type)
        }
        const url = `http://swapi.dev/api/${type}/${id}/`
        this.setState({loading: false, type, url})
    }

    async componentDidUpdate(prevProps) {
        const oldParams = prevProps.match.params
        const newParams = this.props.match.params
        if(JSON.stringify(oldParams) !== JSON.stringify(newParams)) {
            const { type, id } = newParams
            const url = `http://swapi.dev/api/${type}/${id}/`
            this.setState({type, url})
        }
    }

    handleAccordianChange = async(expanded) => {
        const { fetchStarWarsData, getStarWarsDataByType } = this.props
        const { peopleMap } = this.state
        this.setState({loading: true, expanded})
        expanded = peopleMap.includes(expanded) ? 'people' : expanded

        if (!getStarWarsDataByType(expanded)) {
            await fetchStarWarsData(expanded)
        }
        this.setState({loading: false})
    }

    onClickCard = ({url}, type) => {
        const { history } = this.props
        const delimiter = url.split('/').filter(s=> s!== '')
        const id = delimiter[delimiter.length-1]
        history.push(`/star-wars/${type}/${id}`)
    }

    renderDetailContent = () => {
        const { getStarWarsDataByType } = this.props
        const { type, url } = this.state
        if (! (type && url)) {
            return null
        }
        const detailData = getStarWarsDataByType(type, url)
        return (
            <div className="DetailContent">
                {
                    Object.keys(detailData).map((key, idx) => {
                        if (typeof detailData[key] !== 'string') return null
                        return (
                            <div className="DetailPaper" key={`${url}-${idx}`}>
                                <Grid container>
                                    <Grid item xs={2}>{key}</Grid>
                                    <Grid item xs={10}>{detailData[key]}</Grid>
                                </Grid>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    renderDetailSet = () => {
        const { getStarWarsDataByType } = this.props
        const { type, url, expanded, loading, peopleMap } = this.state
        if (! (type && url)) {
            return <div className="Loader"><CircularProgress /></div>
        }
        const detailData = getStarWarsDataByType(type, url)
        return (
            <div className="DetailContent">
                {
                    Object.keys(detailData).map((key, idx) => {
                        if (typeof detailData[key] !== 'object') return null
                        const detailType = peopleMap.includes(key) ? 'people' : key
                        if (!detailData[key] || !detailData[key].length) return null
                        return (
                            <Accordion 
                                square
                                key={`accordion-${idx}`}
                                className="DetailAccordian"
                                key={detailData[key]['url']}
                                expanded={expanded === key} 
                                onChange={() => this.handleAccordianChange(key)}>
                                <AccordionSummary expandIcon={<ExpandMore />} id={key}>
                                    {key.toUpperCase()}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        loading || !getStarWarsDataByType(detailType)
                                        ? <div className="Loader"><CircularProgress /></div>
                                        : <Grid container spacing={3}>
                                            {
                                                detailData[key].map((urlId) => {
                                                    const dashboardData = getStarWarsDataByType(detailType, urlId)
                                                    return (
                                                        <Grid item xs={2} key={urlId}>
                                                            <DashboardCard
                                                                type={detailType}
                                                                data={dashboardData}
                                                                onClick={() => this.onClickCard(dashboardData, detailType)} />
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        const { history } = this.props
        return (
            <div className="DetailContainer">
                <Header history={history}/>
                {this.renderDetailContent()}
                {this.renderDetailSet()}
            </div>
        )
    }

}


export default ConnectClass(StarWarsDetailContainer)