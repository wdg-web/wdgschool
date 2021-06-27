import dayjs from 'dayjs'

// 时间格式转化
export function timeCycle(x) {
    console.log('时间格式转化函数');
    return dayjs(x).format('YYYY-MM-DD HH:mm:ss')
}