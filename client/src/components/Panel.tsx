import React from 'react';
import { Card } from '@material-ui/core';
 
interface PanelProps {
    children: JSX.Element,
    width?: string,
    height?: string,
    id?: string,
    overflow?: string
}

const Panel = (props: PanelProps): JSX.Element => {
    var style = {
        width: (props.width) ? props.width : undefined,
        height: (props.height) ? props.height : undefined,
        paddingTop: '15px',
        overflow: props.overflow
    };

    return (
        <Card id={ props.id } className="panel" style={ style }>
            { props.children }
        </Card>
    );
}

export default Panel;