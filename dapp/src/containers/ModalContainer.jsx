import React from 'react'
import { connect } from 'react-redux'

import { hideModal } from 'actions/ui'
import ImageCropperModal from 'components/common/ImageCropper'
import TemplateModal from 'components/common/modals/TemplateModal'
import WrongNetworkModal from 'components/common/WrongNetworkModal'
import ErrorBoundary from 'components/common/ErrorBoundary'
import QrModal from 'components/common/QrModal'
import AddBusinessModal from 'components/dashboard/modals/AddBusinessModal'
import AddUserModal from 'components/dashboard/modals/AddUserModal'
import EntityAddedModal from 'components/dashboard/modals/EntityAddedModal'
import BusinessListModal from 'components/dashboard/modals/BusinessListModal'
import ShowMoreModal from 'components/dashboard/modals/ShowMoreModal'
import ImportExistingEntity from 'components/dashboard/modals/ImportExistingEntity'
import PluginInfoModal from 'components/dashboard/modals/PluginInfoModal'
import SwitchNetwork from 'components/common/SwitchNetwork'
import Web3ConnectModal from 'components/common/modals/Web3ConnectModal'

import {
  WRONG_NETWORK_MODAL,
  ADD_BUSINESS_MODAL,
  BUSINESS_LIST_MODAL,
  SHOW_MORE_MODAL,
  QR_MODAL,
  ADD_USER_MODAL,
  IMPORT_EXISTING_ENTITY,
  ENTITY_ADDED_MODAL,
  IMAGE_CROPPER_MODAL,
  PLUGIN_INFO_MODAL,
  SWITCH_NETWORK,
  TEMPLATE_MODAL,
  WEB3_CONNECT_MODAL
} from 'constants/uiConstants'

const renderModal = (modalComponent, props) =>
  <ErrorBoundary hideModal={props.hideModal}>
    {React.createElement(modalComponent, props)}
  </ErrorBoundary>

const MODAL_COMPONENTS = {
  [WRONG_NETWORK_MODAL]: WrongNetworkModal,
  [ADD_BUSINESS_MODAL]: AddBusinessModal,
  [BUSINESS_LIST_MODAL]: BusinessListModal,
  [SHOW_MORE_MODAL]: ShowMoreModal,
  [QR_MODAL]: QrModal,
  [ADD_USER_MODAL]: AddUserModal,
  [IMPORT_EXISTING_ENTITY]: ImportExistingEntity,
  [ENTITY_ADDED_MODAL]: EntityAddedModal,
  [IMAGE_CROPPER_MODAL]: ImageCropperModal,
  [PLUGIN_INFO_MODAL]: PluginInfoModal,
  [SWITCH_NETWORK]: SwitchNetwork,
  [TEMPLATE_MODAL]: TemplateModal,
  [WEB3_CONNECT_MODAL]: Web3ConnectModal
}

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null
  }
  const ModalType = MODAL_COMPONENTS[props.modalType]
  return renderModal(ModalType, { ...props.modalProps, hideModal: props.hideModal })
}

const mapStateToProps = state => ({
  modalType: state.ui.modalType,
  modalProps: state.ui.modalProps
})

const mapDispatchToProps = {
  hideModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
