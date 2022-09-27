import React from 'react'

const EachParticipantCard = ({ participant }) => {
  return (
    <div>
        <span>{participant.id} {participant.admin ? (participant.admin === 'superadmin' ? 'Owner' : 'Admin') : 'Member'}</span>
    </div>
  )
}

export default EachParticipantCard