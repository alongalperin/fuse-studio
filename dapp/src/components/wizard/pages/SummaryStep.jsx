import React from 'react'
import CommunityLogo from 'components/common/CommunityLogo'
import { getIn, useFormikContext } from 'formik'
import pickBy from 'lodash/pickBy'
import pluginsIcons from 'constants/pluginsIcons'
import upperCase from 'lodash/upperCase'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'
import upperFirst from 'lodash/upperFirst'
import isEmpty from 'lodash/isEmpty'
import { toLongName } from 'utils/network'

const SummaryStep = ({
  foreignNetwork
}) => {
  const formik = useFormikContext()
  const contracts = getIn(formik.values, 'contracts')
  const communitySymbol = getIn(formik.values, 'communitySymbol')
  const totalSupply = getIn(formik.values, 'totalSupply')
  const isOpen = getIn(formik.values, 'isOpen')
  const communityType = getIn(formik.values, 'communityType')
  const existingToken = getIn(formik.values, 'existingToken')
  const customTokenAddress = getIn(formik.values, 'customToken')
  const images = getIn(formik.values, 'images')
  const plugins = getIn(formik.values, 'plugins')
  const coverPhoto = getIn(formik.values, 'coverPhoto')

  const pluginsSelected = React.useMemo(() => {
    return Object.keys(pickBy(plugins, { isActive: true }))
  }, [])

  const { chosen } = images

  const contractsItems = Object.values(contracts)
    .filter((contract) => contract.checked)
    .map(({ label, icon }) => ({ label, icon }))

  return (
    <div className='summary-step'>
      <div className='summary-step__wrapper'>
        <div className='summary-step__inner'>
          <div className='summary-step__images'>
            <img alt='cover photo' src={(coverPhoto && coverPhoto.croppedImageUrl)} />
            <div className='summary-step__logo'>
              <CommunityLogo
                imageUrl={images && images[chosen] && images[chosen].croppedImageUrl}
                metadata={{
                  isDefault: chosen !== 'custom' && !existingToken
                }}
                symbol={communitySymbol}
              />
            </div>
          </div>
          <div className='summary-step__content'>
            <div className='summary-step__content__item'>
              <h4 className='summary-step__content__title'>Currency type</h4>
              {communityType && <p>{communityType.label}</p>}
              {existingToken && <p>{`Existing token - ${existingToken.label}`}</p>}
              {customTokenAddress && <p>{`Existing token - ${communitySymbol}`}</p>}
            </div>
            {
              totalSupply && (
                <div className='summary-step__content__item'>
                  <h4 className='summary-step__content__title'>Total supply</h4>
                  <p>{totalSupply}</p>
                </div>
              )
            }
            <div className='summary-step__content__item'>
              <h4 className='summary-step__content__title'>Contracts</h4>
              <div className='summary-step__content__contracts'>
                {
                  contractsItems.map(({ icon, label }) => label && (
                    <div key={label} className='summary-step__content__contracts__item'>
                      <span className='summary-step__content__contracts__icon'><img src={icon} />{label}</span>
                      {
                        label && label.includes('Members') && isOpen && (
                          <span className='summary-step__content__contracts__small'>Open community</span>
                        )
                      }
                      {
                        label && label.includes('Members') && !isOpen && (
                          <span className='summary-step__content__contracts__small'>Close community</span>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            </div>
            {
              pluginsSelected && !isEmpty(pluginsSelected) && (
                <div className='summary-step__content__item'>
                  <h4 className='summary-step__content__title'>Plugins</h4>
                  <div className='summary-step__content__contracts'>
                    {
                      pluginsSelected.map((name) => name && (
                        <div key={name} className='summary-step__content__contracts__item'>
                          <span className='summary-step__content__contracts__icon'>
                            <img src={pluginsIcons[name]} />
                            {upperFirst(lowerCase(upperCase(name)))}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className='summary-step__text'>
          <span>Your coin will be issued on the Ethereum {capitalize(toLongName(foreignNetwork))}</span>
          <br />
          <span>Once launched, the Fuse bridge will allow you to start using your tokens on the Fuse chain, greatly reducing transaction cost and time!</span>
        </div>
      </div>
    </div>
  )
}

export default SummaryStep
