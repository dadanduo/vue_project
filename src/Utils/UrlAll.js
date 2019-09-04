/**
 * Created by chenda on 2019/8/8.
 */
function getEnvironment() {
    return "test"
}
function getSendUrl() {
    console.log("------" + getEnvironment())
    switch (getEnvironment()) {
        case 'test':
            return 'https://test.ouyeel.com/jk-mobile/'
            break
        case 'prod':
            return 'https://www.ouyeel.com/'
            break
        case 'dev':
            return 'https://dev.ouyeel.com/'
            break
    }
}
const getUrl =url => getSendUrl().concat('steelPrice/queryChangepriceProductTypeCodeList/')
const  getHomeCard3=url=>getSendUrl().concat('home/getHomeCardData3/')
//产能采购协议列表
const  getQueryProductionAgreement=url=>('api/lookgoods/presell/queryProductionAgreement/')
export {getUrl,getHomeCard3,getQueryProductionAgreement}










