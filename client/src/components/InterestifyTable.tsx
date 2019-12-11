import * as React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Icon } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';
import '../App.css';

interface TableHeader {
	id: string,
	title: string
}

interface TableProps {
	header: TableHeader[],
	body: {}[],
	striped?: boolean,
	pagination?: boolean,
	actions?: boolean
}

interface TableState {
	header: {},
	body: {}
}

const ActionIcons: {[index: string]: any} = {
	add: <AddCircle fontSize='small' />,
	delete: <Delete fontSize='small' />
}

class InterestifyTable extends React.Component<TableProps, TableState> {
	constructor(props: TableProps) {
		super(props);
		this.state = {
			header: this.getHeader(),
			body: this.getBody()
		};
	}

	/**
	 * creates the table row for the header of the table
	 * @author oderah
	 * 
	 * @return a TableRow component containing info 
	 * 			from this.props.header mapped to a TableCell component
	 */
	getHeader = (): {} => {
		// var header = [...this.props.header];
		if (this.props.actions) {
			this.props.header.push({ id: 'actions', title: 'Actions' });
		}
		return <TableRow children={ this.props.header.map(column => <TableCell key={ column.id }>{ column.title }</TableCell>) } />;
	}

	/**
	 * creates table rows for the body of the table
	 * @author oderah
	 * 
	 * @return a TableBody component containing TableRow components
	 * 			which contain info from this.props.body mapped to
	 * 			TableCell components
	 */
	getBody = (): {} => {
		return this.props.body.map((row: {}, index: number) => 
			(<TableRow className={ (this.props.striped && index % 2 != 0) ?  'dark-row' : 'light-row'} hover key={ index } children={ this.orderByHeader(row).map((data, index) => 
				<TableCell key={ index } children={ data } />) } />));
	}

	/**
	 * orders a row object following this.props.header
	 * @author oderah
	 * 
	 * @param row an object containing info for a table row
	 * @return an array containg the data of the row object
	 * 			in an ordered format.
	 */
	orderByHeader = (row: {}): any[] => {
		var entries = Object.entries(row);
		var rowData: any[] = [];
		this.props.header.forEach(heading => {
			var entry: any = entries.find(x => x[0] === heading.id);
			if (entry) { // if entry is found
				if (this.props.actions && 'actions' === heading.id) { // if actions
					// map icons for all actions
					var actions = entry[1].map((action: any, index: number) => 
						<IconButton 
							key={ index } 
							children={ ActionIcons[action.icon] }
							size='small'
							onClick={ action.click } />);
					rowData.push(actions); 
				} else { // if other properties other than actions
					rowData.push(entry[1]);
				}
			} else {
				rowData.push('N/A');
			}
		});
		return rowData;
	}
	
	render() {
		return(
			<Table>
				<TableHead children={ this.state.header } />
				<TableBody children={ this.state.body } />
			</Table>
		);
	}
}

export default InterestifyTable;
