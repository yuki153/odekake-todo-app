
export const state = () => ({
  isUpdate: false,
  isSelected: false,
  todo: {
    svgName: '',
    hexCode: '',
    time: {
      hour: '00',
      min: '00',
    },
    text: '',
    id: '',
  }
});

export const mutations = {
  init(state) {
    state.isUpdate = false;
    state.isSelected = false;
  },
  update(state, payload) {
    console.log('UPDATE.STORE');
    state.isUpdate = true;
    state.isSelected = true;
    state.todo.svgName = payload.svgName;
    state.todo.hexCode = payload.hexCode;
    state.todo.time.hour = payload.time.hour;
    state.todo.time.min = payload.time.min;
    state.todo.text = payload.text;
    state.todo.id = payload.id;
  },
  reset(state) {
    state.isUpdate = false;
    state.isSelected = false;
    state.todo.svgName = '';
    state.todo.hexCode = '';
    state.todo.time.hour = '00';
    state.todo.time.min = '00';
    state.todo.text = '';
  },
  backToIconSelect(state) {
    console.log('back to icon select');
    state.isSelected = false;
  },
  goToIconInfo(state) {
    console.log('Go to icon info');
    state.isSelected = true;
  },
  setTodoText(state, text) {
    state.todo.text = text;
  },
  setTodoHour(state, hour) {
    state.todo.time.hour = hour;
  },
  setTodoMin(state, min) {
    state.todo.time.min = min;
  },
  setTodoSvgName(state, name) {
    state.todo.svgName = name;
  },
  setTodoHexCode(state, code) {
    state.todo.hexCode = code;
  }
};
