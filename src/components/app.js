import { fragment, createEl, _ } from '../lib/utils'
import { Container, li, span } from '../dom'
import { Fetch } from "../lib/api"


const InputBox = createEl( 'div', { class: 'input-box' } )
const InputBox2 = createEl( 'div', { class: 'input-box' } )
const Input = ( id ) => createEl( 'input', { class: 'input-field', type: 'APISearch', placeholder: `${id}를 입력하세요` } )
const Button = createEl( 'div', { class: 'APISearch-button' } )
const HistoryContainer = createEl( 'ul', { class: 'APISearch-history-container' } )

const APIDataInput = ( store ) =>
{
    const handleKeyword = store.action( ( id, e, { token, key } ) =>
    {
        console.log( '[APIDataInput] handleKeyword e.data >', e.data, )
        console.log( 'token, key', token, key )
        // _.id( `input-${id}` ).value = id === 'token' ? token : key
        return ( { [id]: _.id( `input-${id}` ).value } )
    } )

    const { token, key } = store.getState()

    const InputField = ( { onTyping, id } ) =>
        Input( id )( { id: `input-${id}`, value: `${id === 'token' ? token : key}`, onchange: ( e ) => onTyping( id, e ) } )
    // Input( { id: `input-${id}`, onkeyup: ( e ) => onTyping( e ) }, `${keyword}` )

    return (
        fragment( [
            Container( { class: 'APISearch-input-container' }, [
                InputBox( [
                    // InputField( { onTyping: handleKeyword } )
                    InputField( { onTyping: handleKeyword, id: 'token' } ),
                    InputField( { onTyping: handleKeyword, id: 'key' } ),

                ] ),
            ] ),
        ] ) )
}


const APISearch = ( store ) =>
{

    const fetchData = ( { token, key } ) => store.action( async () =>
    {
        return ( {
            token, key
        } )
    } )

    const setKeywordData = store.action( async ( e, { data } ) =>
    {
        const token = _.id( 'input-token' ).value
        const key = _.id( 'input-key' ).value
        const extractedData = await Fetch( token, key )
        // history.push( keyword )
        fetchData( { token, key } )()
        return ( { data: extractedData } )
    } )

    const { data } = store.getState()

    const HistoryList = Object.entries( data ).map( ( k, i ) =>
        li( { class: `history-list-${i}` },
            [span( `${k}` )
            ] ) )


    const SubmitButton = ( { onSummit } ) =>
        Button( { onclick: ( e ) => onSummit( e ) }, 'APISearch' )

    return (
        fragment( [
            Container( { class: 'APISearch-container' },
                [SubmitButton( { onSummit: setKeywordData } ),
                ] ),
            HistoryContainer( { id: 'history-list' }, [...HistoryList] )
        ] ) )
}




export { APIDataInput, APISearch }