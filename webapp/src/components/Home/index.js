import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from "./component";
import * as configActions from '../../actions/configActions';
import * as foldersActions from '../../actions/foldersActions';
import * as messageActions from '../../actions/messageActions';
import { bindActionCreators } from 'redux';



const mapStateToProps = (state) => {
    const { config, folders, messages } = state;
    return {
        config,
        folders,
        messages
    }
};

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...foldersActions,
        ...configActions,
        ...messageActions
    };
    return {
        actions: bindActionCreators(actions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (HomePage);
