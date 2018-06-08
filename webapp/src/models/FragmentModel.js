import { observable, action } from 'mobx';
import history from "../utils/history";

export class FragmentModel {
  @observable id = 0;
  @observable fragment = "";
  @observable start = "";
  @observable stop = "";
  @observable catchWord = true;

  constructor(data) {
    const {id, fragment, start, stop, catchWord} = data;
    this.id = id;
    this.setFragment(fragment);
    this.setStart(start);
    this.setStop(stop);
    this.setCatchWord(catchWord);
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
  setCatchWord = catchWord => {
    this.catchWord = catchWord;
  };
}
