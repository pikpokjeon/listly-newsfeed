
import { App } from './app.js'
import { Store } from './lib/store.js'

const initStorage = {
    token: '',
    key: '',
    fetchedData: {}
}

const store = Store( initStorage )

App( store )