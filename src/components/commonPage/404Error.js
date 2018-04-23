import React from 'react';
import classes from './common.css';

const error = () => {
    return <div className={classes.Common}>
        <div className={classes.Content}>
            <div className={classes.VeryBigFont}>404</div>
            <h1>Page Not Found</h1>
            <p>Please check your url or call your web administrator if url is correct</p>
        </div>
    </div>
};

export default error;