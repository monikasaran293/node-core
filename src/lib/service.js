export const IssueService = {
    fetchIssueDetails: () => {
        const endpoint = `https://api.github.com/repos/angular/angular`
        return fetch(endpoint)
            .then((response) => response.json())
    },
    fetchIssueDetail: (id) => {
        const endpoint = `https://api.github.com/repos/angular/angular/issues/${id}`
        return fetch(endpoint)
            .then((response) => response.json())
    },
    fetchIssueList: (per_page=10, page=1, state=null) => {
        const q = state ? 'repo:angular/angular/node+type:issue+state:open' : 'repo:angular/angular/node+type:issue'
        const endpoint = `https://api.github.com/search/issues?q=${q}&per_page=${per_page}&page=${page}`
        return fetch(endpoint)
            .then((response) => response.json())
    }
}
