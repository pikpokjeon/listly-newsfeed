

import { APIDataInput, APISearch } from './components/app.js'
import { renderTo } from './lib/utils.js'

const App = ( store ) =>
{
    store.subscribe(
        () =>
        {
            renderTo(
                document.querySelector( "#api-input" ),
                APIDataInput( store )
            )
        }
    )
    store.subscribe(
        () =>
        {
            renderTo(
                document.querySelector( "#api-submit" ),
                APISearch( store )
            )
        }
    )
    // renderTo( document.querySelector( "#search-box" ), SearchInput( store ) )

}


export { App }