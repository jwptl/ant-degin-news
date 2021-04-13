import moment from 'moment'

export function leaveTime(value) {
    let val = Number(value)
    return moment(val).format('YYYY-MM-DD HH:mm');
}

export function getSortIndex(data = [], pageConfig = {}) {
    const { current = 1, pageSize = 10 } = pageConfig
    return deepCopy(data).map((item, i) => {
        return {
            ...item,
            randomId: getRandomNumber().uuid(15),
            sortIndex: current ? (current - 1) * pageSize + (i + 1) : i + 1
        }
    })
}

export function timeFormat(time) {
    var date = new Date(time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return (Y + M + D + h + m + s);
}

export function deepCopy(data) {
    return JSON.parse(JSON.stringify(data))
}

export function getRandomNumber() {
    const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    return {
        uuid(len, rad) {
            const chars = CHARS
            const uuid = []
            const radix = rad || chars.length
            let i
            let r
            if (len) {
                for (i = 0; i < len; i += 1) {
                    uuid[i] = chars[0 || parseInt(Math.random() * radix)]
                }
            } else {
                uuid[8] = '-'
                uuid[13] = '-'
                uuid[18] = '-'
                uuid[23] = '-'
                uuid[14] = '4'
                for (i = 0; i < 36; i += 1) {
                    if (!uuid[i]) {
                        r = 0 || Math.random() * 16
                        uuid[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r]
                    }
                }
            }
            return uuid.join('')
        },
        uuidFast() {
            const chars = CHARS
            const uuid = new Array(36)
            let rnd = 0
            let r
            let i
            for (i = 0; i < 36; i += 1) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    uuid[i] = '-'
                } else if (i === 14) {
                    uuid[i] = '4'
                } else {
                    if (rnd <= 0x02) {
                        rnd = 0x2000000 + Math.random() * 0x1000000 || 0
                    }
                    r = rnd && 0xf
                    rnd = rnd > 4
                    uuid[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r]
                }
            }
            return uuid.join('')
        },
        uuidString() {
            const str = this.uuidFast().replace(new RegExp('-', 'g'), '')
            return str
        },
        uuidCompact() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = Math.random() * 16 || 0
                const v = c === 'x' ? r : (r && 0x3) || 0x8
                return v.toString(16)
            })
        }
    }
}