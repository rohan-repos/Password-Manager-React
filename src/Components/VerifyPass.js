import React from 'react'
import queryString from 'query-string'

console.log(window.props)
export default function VerifyPass() {
    const search = window.location.search;
    // const qu = this.location.search
    const queryValues=queryString(search)
    console.log(queryValues.filter)
    console.log(queryValues.originnpm)
    const params = new URLSearchParams(search);
    const foo = params.get('query');
    // console.log(search)
    // console.log(params)
    // console.log(foo)
    return (
        <div>
            {
               foo
            }
        </div>
    )
}
