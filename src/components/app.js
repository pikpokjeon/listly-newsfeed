import { fragment, createEl, _ } from '../lib/utils'
import { Container, li, span, section } from '../dom'
import { Fetch } from "../lib/api"


const InputBox = createEl( 'div', { class: 'input-box' } )
const DataSection = createEl( 'section', { class: 'data-box' } )
const Input = ( id ) => createEl( 'input', { class: 'input-field', type: 'APISearch', placeholder: `${id}를 입력하세요` } )
const Button = createEl( 'div', { class: 'APISearch-button' } )
const HistoryContainer = createEl( 'ul', { class: 'APISearch-history-container' } )
const DataUnit = createEl( 'div', { class: 'data-unit' } )

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
        return ( { fetchedData: extractedData } )
    } )

    const { fetchedData } = store.getState()

    const DataElements = value => Object.entries( value ).map( ( [labelIndex, data] ) =>
    {
        console.log( labelIndex, data )
        const dataLists = Object.entries( data ).map( ( [_labelIndex, _data], _i ) =>
        {
            console.log( _labelIndex, _data )
            console.log( _data.content )
            return DataUnit( { id: `data-unit-${_i}` }, `${_data.content}` )
        } )

        return DataSection( [`${labelIndex}`, ...dataLists] )
    } )
    console.log( fetchedData )
    const HistoryList = fetchedData ? Object.entries( fetchedData )
        .reduce( ( group, [key, value], i ) =>
        {
            console.log( key, value )
            if ( key === 'data' )
            {
                group.push( DataElements( value ) )
                return group
            }
            const element = section( { class: `history-list-${i}` },
                [span( `${key}` ), span( `${value}` )]
            )
            group.push( element )
            return group
        }, [] ) : []


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