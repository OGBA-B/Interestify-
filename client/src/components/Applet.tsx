import React, { useState, useEffect, useContext, Context } from 'react';
import Panel from '../components/Panel';
import CircularProgress from '@material-ui/core/CircularProgress'
import { Grid } from '@material-ui/core';

interface AppletProps {
    title: string
    id?: string
    width?: string,
    height?: string,
    children: JSX.Element,
    StateContext: Context<any>,
    run: Function,
    Toolbar?: Function
}

const Applet = (props: AppletProps): JSX.Element => {

    /**
     * calucates the top disposition of the dialog loader
     * based on the height of the panel
     */
    const disposition = () => {
        if (props.height) {
            var height = props.height;
            var unit = height.substring(height.length - 2);
            height = height.substring(0, height.length - 2);
            return (parseInt(height) / 3) + unit;
        } else return '';
    }

    const { title, id, width, height, StateContext, run, Toolbar } = props;
    const [ overflow, setOverflow ] = useState('hidden'); // set overflow initial state

    const state = useContext(StateContext); // context containing the state

    /**
     * updates overflow property
     * overflow is set to scroll when there is content available
     * and false otherwise
     */
    useEffect(() => {
        if (state.tableData.body.length > 0) {
            setOverflow('scroll');
        }
    }, [ state.tableData.body ]);

    // run applet logic
    useEffect(() => {
        run();
    }, [ run ]);

    return (
        <Panel id={ id } width={ width } height={ height } overflow={ overflow }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 }>
                    <div className="h4 text-muted float-left pl-3 applet-title">{ title }</div>
                </Grid>
                {
                    Toolbar && (
                        <Grid item xs={ 12 }>
                            <Toolbar />
                        </Grid>
                    )
                }
                {
                    state.isLoading && (
                        <Grid item xs={ 12 }>
                            <CircularProgress 
                                variant="indeterminate"
                                className="dialogLoader"
                                style={{ top: disposition() }}
                            />
                        </Grid>
                    )
                }
                {
                    !state.isLoading && (
                        <Grid className="p-3" item xs={ 12 }>
                            { props.children }
                        </Grid>
                    )
                }
            </Grid>
        </Panel>
    );
}

export default Applet;