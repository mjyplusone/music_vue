import * as types from './mutation-types.js';

const mutations = {
    // 使用常量替代 Mutation 事件类型,使eslint发挥作用
    [types.SET_SINGER] (state, singer) {
        state.singer = singer;
    }
};

export default mutations;