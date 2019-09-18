import * as types from './mutation-types'

export default {
    // 加入书架
    [types.ADD_BOOK](state, newBook) {
        // 判断是否已经添加  去重
        let book = state.bookShelf.find(book => book._id === newBook._id);
        // 添加
        if (!book) {
            state.bookShelf = [...state.bookShelf, newBook];
        }
    },
    // 撤出书架
    [types.REMOVE_BOOK](state, oldBook) {
        state.bookShelf = state.bookShelf.filter(book => book._id != oldBook._id)
    },
    // 点击阅读
    [types.ADD_READ](state, newRead) {
        // 找到相同的id
        let read = state.reading.find(read => read.id === newRead.id);
        // 如果不存在此id，保存
        if (read === undefined) {
            state.reading = [...state.reading, newRead];
        }
        console.log(state.reading);
    },
    // 阅读页面点击返回更新index
    [types.UPADTED_READ](state, newRead) {
        console.log(newRead)
        // 找到相同的id
        let read = state.reading.filter(read => read.id !== newRead.id);
        state.reading = [...read, newRead];
        console.log(state.reading);
    }
}
