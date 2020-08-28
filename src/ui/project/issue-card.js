import React from 'react'
import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import { CancelOutlined, InfoOutlined } from '@material-ui/icons'

const CardContainer = styled.div`
    margin: 10px;
`
const CardTitle = styled.div`
    .CardTitle {
        padding: 0 10px;
        width: fit-content;
        float: left;
    }
`
const CardFooter = styled.div`
    color: grey;
`
const CloseIcon = styled(CancelOutlined)`
    float: left;
`
const OpenIcon = styled(InfoOutlined)`
    float: left;
`

const IssueCard = ({ id, title, state, user, labels, onClick }) => {

    const renderLabel = () => {
        
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

    return (
        <CardContainer onClick={onClick}>
            <Card variant="outlined">
                <CardContent>
                    <CardTitle>
                        {
                            state === 'open'
                            ? <OpenIcon color='primary' />
                            : <CloseIcon color='error'/>
                        }
                        <div className='CardTitle'>{title}</div>
                        {renderLabel()}
                    </CardTitle>
                    <CardFooter>
                        # {id} opened by {user.login}
                    </CardFooter>
                </CardContent>
            </Card>
        </CardContainer>
    )
}

export default IssueCard
