import gql from 'graphql-tag';

// 发送验证码（验证码登录）
export let sendValidationCode = gql`
mutation sendValidationCode(
    $mobile: String!
){
    sendValidationCode(
        mobile: $mobile
    ){
        code
        message
    }
}`;
// 验证码登录
export let verificationCodeLogin = gql`
query verificationCodeLogin(
    $mobile: String!
    $validationCode: Int!
){
    verificationCodeLogin(
        mobile: $mobile
        validationCode: $validationCode
    ){
        code
        message
        data{
            token{
                accessToken
                expiresIn
            }
            newUser
        }
    }
}`;
// 验证码注册完设置密码
export let setPassword = gql`
mutation setPassword(
    $password: String!
){
    setPassword(
        password: $password
    ){
        code
        message
    }
}`;
// 密码登录
export let login = gql`
query login(
    $username: String!
    $password: String!
){
    login(
        username: $username
        password: $password
    ){
        code
        message
        data{
            token{
                accessToken
                expiresIn
            }
            newUser
        }
    }
}`;
// 重置密码
export let resetPassword = gql`
mutation resetPassword(
    $mobile: String!
    $validationCode: Int!
    $password: String!
){
    resetPassword(
        mobile: $mobile
        validationCode: $validationCode
        password: $password
    ){
        code
        message
    }
}`;
// 更换绑定手机 - 校验手机号
export let verifyMobile = gql`
query verifyMobile(
    $mobile: String!
    $validationCode: Int!
){
    verifyMobile(
        mobile: $mobile
        validationCode: $validationCode
    ){
        code
        message
    }
}`;
// 更换绑定手机 - 校验密码
export let verifyPassword = gql`
query verifyPassword(
    $password: String!
){
    verifyPassword(
        password: $password
    ){
        code
        message
    }
}`;
// 更换绑定手机 - 绑定手机
export let bindMobile = gql`
mutation bindMobile(
    $mobile: String!
    $validationCode: Int!
){
    bindMobile(
        mobile: $mobile
        validationCode: $validationCode
    ){
        code
        message
    }
}`;
export let verificationCodeRegister = gql`
mutation verificationCodeRegister(
    $mobile: String!
    $validationCode: Int!
){
    verificationCodeRegister(
        mobile: $mobile
        validationCode: $validationCode
    ){
        code
        message
    }
}`;
// 获取当前用户信息
export let findCurrentUserInfo = gql`
query findCurrentUserInfo{
    findCurrentUserInfo{
        code
        message
        data{
            userId
            username
            email
            mobile
            openId
            banned
            recycle
            createTime
            updateTime
            userRoles{
                id
                name
            }
            userOrganizations{
                id
                name
            }
            userInfos{
                id
                order
                relationId
                type
                name
                value
                description
                registerDisplay
                informationDisplay
            }
        }
    }
}`;
export let queryReferAttestation = gql`
query queryReferAttestation{
    queryReferAttestation{
        code
        message
        data{
            id
            state
            reason
            credentialsType
            credentialsNo
            name
            frontPic
            behindPic
            createDate
            updateDate
        }
    }
}`;
// 更新当前用户信息 （修改密码）
export let updateCurrentUserInfo = gql`
mutation updateCurrentUserInfo(
    $updateCurrentUserInput: UpdateCurrentUserInput
){
    updateCurrentUserInfo(
        updateCurrentUserInput: $updateCurrentUserInput
    ){
        code
        message
    }
}`;
export let referAttestation = gql`
mutation referAttestation(
    $referAttestationInput: ReferAttestationInput
){
    referAttestation(
        referAttestationInput: $referAttestationInput
    ){
        code
        message
    }
}`;
// 管理员修改用户信息
export let updateUserInfoById = gql`
mutation updateUserInfoById(
    $userId: Int!
    $updateUserInput: UpdateUserInput
){
    updateUserInfoById(
        userId: $userId
        updateUserInput: $updateUserInput
    ){
        code
        message
    }
}`;
// 微信授权登录
export let weChatLogin = gql`
query weChatLogin(
    $authCode: String!
){
    weChatLogin(
        authCode: $authCode
    ){
        code
        message
        data{
            token{
                accessToken
                expiresIn
            }
            newUser
        }
    }
}`;
// 绑定微信
export let bindWeChat = gql`
mutation bindWeChat(
    $authCode: String!
){
    bindWeChat(
        authCode: $authCode
    ){
        code
        message
    }
}`;
