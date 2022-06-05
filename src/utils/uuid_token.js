import { v4 as uuidv4 } from 'uuid';

// 单例
export const getUUID = ()=>{
    // 从本地赋值给uuid_taken
    let uuid_taken = localStorage.getItem('UUIDTAKEN')
    // 如果本地没有值，进行下面的程序
    // 如果本地有值，则不进行下面的if解构
    if(!uuid_taken){
        uuid_taken = uuidv4()
        localStorage.setItem('UUIDTAKEN',uuid_taken)
    }
    return uuid_taken
}