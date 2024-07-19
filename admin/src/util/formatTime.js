import moment from 'moment'
moment.locale('zh-cn')


const formatTime = {
    getTime:(date)=>{
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}
export default formatTime