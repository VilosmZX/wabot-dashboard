import React, { useState } from 'react'

const SearchBar = ({ setSearchTerm }) => {
    return (
        <div>
            <input onChange={(e) => setSearchTerm(e.target.value)} type={'text'} placeholder={'Search Group'} />
        </div>
    )
}

export default SearchBar