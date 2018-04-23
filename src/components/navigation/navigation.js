import React from 'react';
import {Grid} from "react-bootstrap";
import {Avatar, Chip, FontIcon} from "material-ui";

const navigation = (props) => {
    const styles = {
        chip: {
            marginRight:'4px'
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
            padding:'15px'
        },
    };

    return (<div style={styles.wrapper}>
            <Chip style={styles.chip}>
                <Avatar icon={<FontIcon className="material-icons">home</FontIcon>}/>
                Home
            </Chip>
            <Chip style={styles.chip}>
                <Avatar icon={<FontIcon className="material-icons">home</FontIcon>}/>
                All Post
            </Chip>
            <Chip style={styles.chip}>
                <Avatar icon={<FontIcon className="material-icons">home</FontIcon>}/>
                All Users
            </Chip>

        </div>
    );
}


export default navigation;