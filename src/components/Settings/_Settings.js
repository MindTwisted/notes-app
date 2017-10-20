import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import {Modal, ModalHeader, ModalBody, ModalFooter} from "../common/_Modal";
import Button from '../common/_Button';
import UserSettings from './_UserSettings';

class Settings extends Component {
    render() {
        return (
            <div className="Settings">
                <Modal size='large'>
                    <ModalHeader onClose={this.props.hideSettings}>
                        Settings
                    </ModalHeader>
                    <ModalBody>
                        <Tabs>
                            <TabList>
                                <Tab>User Settings</Tab>
                                <Tab>App Settings</Tab>
                            </TabList>

                            <TabPanel>
                                <UserSettings user={this.props.user}
                                              updateUserEmail={this.props.updateUserEmail}
                                              updateUserPassword={this.props.updateUserPassword}
                                              updateUserName={this.props.updateUserName}/>
                            </TabPanel>
                            <TabPanel>
                                <p>This section is under construction</p>
                            </TabPanel>
                        </Tabs>
                    </ModalBody>
                    <ModalFooter>
                        <Button text='Close'
                                onClick={this.props.hideSettings}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

Settings.propTypes = {
    hideSettings: PropTypes.func.isRequired,
    updateUserEmail: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    updateUserName: PropTypes.func.isRequired,
    addSuccessNotification: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default Settings;