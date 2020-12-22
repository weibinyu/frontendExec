import React from 'react'
import propTypes from 'prop-types'
import {WingBlank,WhiteSpace,Card} from "antd-mobile";
import {withRouter} from 'react-router-dom'
import RcQueueAnim from "rc-queue-anim";

UserList.propTypes = {
  userList: propTypes.array.isRequired
}

const Header = Card.Header
const Body = Card.Body

function UserList(props){

  const {userList} = props

  return (
      <>
        <WingBlank className='lists'>
          <RcQueueAnim type='bottom' delay={100}>
            {
              userList.map(user => (
                  <div key={user._id}>
                    <WhiteSpace />
                    <Card onClick={()=> props.history.push(`/chat/${user._id}`)}>
                      <Header
                          thumb={require(`@/assets/avatars/${user.avatar}.png`).default}
                          extra={user.username}
                      />
                      <Body>
                        {user.desiredPosition ? <div>Position:{user.desiredPosition}</div> : null}
                        {user.companyName ? <div>Company:{user.companyName}</div> : null}
                        {user.offerSalary ? <div>Offer salary:{user.offerSalary}</div> : null}
                        {user.personalInfo ? <div>Personal Info:{user.personalInfo}</div> : null}
                        {user.positionRequirement ? <div>Requirement:{user.positionRequirement}</div> : null}
                      </Body>
                    </Card>
                  </div>
              ))
            }
          </RcQueueAnim>
        </WingBlank>
      </>
  )
}

export default withRouter(UserList)