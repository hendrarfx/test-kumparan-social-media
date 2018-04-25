import React, {Component} from 'react';
import {Card, CardHeader} from "material-ui";
import {CardText} from "material-ui/Card/index";
import PropTypes from 'prop-types';
import {CircularProgress} from 'material-ui';

class UserDetail extends Component {
    static propTypes = {
        user: PropTypes.object,
        isStillLoading:PropTypes.bool,
        error:PropTypes.string
    }

    render() {

        let rendered = <Card><CardText align="center">Cannot render user detail<br /> {this.props.error}</CardText></Card>;
        if (this.props.isStillLoading) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            if (this.props.user !== undefined) {
                rendered = (<Card>
                        <CardHeader
                            title={this.props.user.name}
                            titleStyle={{fontWeight: 'bold', fontSize: '12pt'}}
                            subtitle={this.props.user.email}
                            avatar={'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png'}
                        />
                        <CardText style={{fontSize: 'smaller'}}>
                            <table width={'100%'}>
                                <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{this.props.user.id}</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.props.user.username}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{this.props.user.phone}</td>
                                </tr>
                                {/*<tr>
                                <td>Address</td>
                                <td>{this.props.user.address.street}, {this.props.user.address.suite}, {this.props.user.address.city}</td>
                            </tr>

                            <tr>
                                <td>Company</td>
                                <td>{this.props.user.company.name}</td>
                            </tr>*/}
                                <tr>
                                    <td>Website</td>
                                    <td>{this.props.user.website}</td>
                                </tr>
                                </tbody>
                            </table>
                        </CardText></Card>
                );
            }
        }

        return (rendered);
    }
}


export default UserDetail;