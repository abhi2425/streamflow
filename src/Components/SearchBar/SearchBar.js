import React, { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../FormComponents/FormInput/FormInput'
import { IoSearch } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'
import './style.css'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import Loader from '../UIComponents/Loader/Spinner'
import SearchResult from './SearchResult'
import { useModal } from '../../Contexts/ModalContext'

const SearchBar = memo(() => {
  const { register, watch, setValue, handleSubmit } = useForm()
  const searchTerm = watch('search')?.toLowerCase()
  const { searchLoading, searchData, setSearchData, getSearchResult } = useGeneralContext()
  const { setShowModal } = useModal()

  useEffect(() => {
    if (searchTerm?.length > 0) {
      let clear = setTimeout(() => getSearchResult(searchTerm), 650)
      return () => clearTimeout(clear)
    }
  }, [getSearchResult, searchTerm])

  return (
    <form
      style={{ position: 'relative' }}
      onSubmit={handleSubmit((data) => getSearchResult(data?.search))}>
      <i className='search-icon'>
        <IoSearch size={20} color='var(--color-dark-grey)' />
      </i>

      <FormInput
        type='text'
        name='search'
        placeholder='find your friends...'
        reference={register}
        inputStyle={{ padding: '.7rem 3rem' }}
      />
      {searchLoading ? (
        <i className='search-reset'>
          <Loader styles='loader-small' />
        </i>
      ) : (
        searchTerm && (
          <i
            className='search-reset'
            onClick={() => {
              setValue('search', '')
              setSearchData([])
            }}>
            <MdCancel size={20} color='var(--color-dark-grey)' />
          </i>
        )
      )}
      <div
        onClick={() => setSearchData([])}
        className={`${
          searchData?.length ? 'result-overlay show-result-overlay' : ''
        } result-overlay`}></div>
      <SearchResult
        searchTerm={searchTerm}
        close={() => {
          setValue('search', '')
          setSearchData([])
          setShowModal({ show: false })
        }}
      />
    </form>
  )
})

export default SearchBar
