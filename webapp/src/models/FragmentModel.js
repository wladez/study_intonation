import { observable, action } from 'mobx';

export class FragmentModel {
  @observable id = 0;
  @observable fragment = "";
  @observable start = "";
  @observable stop = "";
  @observable catchword = true;

  constructor(data) {
    const {id="", fragment="", start="", stop="", catchword=true} = data;
    this.id = id;
    this.setFragment(fragment);
    this.setStart(start);
    this.setStop(stop);
    this.setCatchWord(catchword);
  }

  @action
  setFragment = fragment => {
    this.fragment = fragment;
  };

  @action
  setStart = start => {
    this.start = start;
  };

  @action
  setStop = stop => {
    this.stop = stop;
  };

  @action
  setCatchWord = catchword => {
    this.catchword = catchword;
  };
}
