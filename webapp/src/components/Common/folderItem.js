import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import * as actions from '../../actions/configActions';
import { store } from '../../store/configureStore';

class FolderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {active: false};
        this.toggleItem = this.toggleItem.bind(this);
    }

    toggleItem() {
        const { folderName } = this.props;
        this.setState({active: !this.state.active});
        if (!this.state.active) {
            console.log(`ADDING CATEGORY...`);
            this.props.actions.addCategory(folderName);
        } else {
            console.log(`REMOVING CATEGORY...`);
            this.props.actions.removeCategory(folderName);
        }
        console.log(store.getState());
    }

    render() {
        const { folderName } = this.props;
        return (
            <a className={this.state.active ? 'list-group-item list-group-item-action active' :
                'list-group-item list-group-item-action'}
               onClick={this.toggleItem}>
                {folderName}
            </a>
            )
    }
}

const mapStateToProps = (state) => {
    const { config, folders } = state;
    return {
        config,
        folders,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
} ;

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (FolderItem);