import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import Modal from 'components/common/Modal'
import ApiIcon from 'images/API_icon.svg'
import MobileIcon from 'images/mobile-wallet.svg'

const TemplateModal = ({
  hideModal,
  logo,
  sideImage,
  title,
  templateId,
  showIssuance,
  attributes = [
    'Issue your own mintable burnable token',
    'Wallet',
    'Merchants and suppliers',
    'Join Bonus'
  ],
  attributesTitle = `The Community currency  consists of the following modules on Fuse:`,
  Text
}) => {
  const useTemplate = () => {
    hideModal()
    window.analytics.track(`USE TEMPLATE - User picked ${title}`)
    showIssuance(templateId)
  }

  return (
    <Modal hasCloseBtn className='template_modal' onClose={hideModal}>
      <div className='content__wrapper grid-x'>
        <div className='content cell medium-10 small-24'>
          <div className='template_modal__logo'><img className='' src={logo} /></div>
          <div className='template_modal__title'>{title}</div>
          <Text />
          <div className='icons'>
            <div className='icon'>
              <img src={MobileIcon} />
              <span>Mobile wallet</span>
            </div>
            <div className='icon'>
              <img src={ApiIcon} />
              <span>API</span>
            </div>
          </div>
          <div className='title'>{attributesTitle}</div>
          <ul className='attributes'>
            {attributes.map((attribute, index) => <li key={index} className='item'>{attribute}</li>)}
          </ul>
          <div className='content__button'>
            <button onClick={useTemplate}>Use this template</button>
          </div>
        </div>
        <div className='side_image cell medium-10 show-for-medium'>
          <img src={sideImage} />
        </div>
      </div>
    </Modal>
  )
}

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(TemplateModal)
