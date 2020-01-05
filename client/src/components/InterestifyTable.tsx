import * as React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TableSortLabel, TableFooter, TablePagination } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import * as _ from 'lodash';
import '../App.css';

interface TableHeader {
	id: string,
	title: string
}

interface TableProps {
	header: TableHeader[],
	body: {}[],
	striped?: boolean,
	pagination?: PaginationOptions,
	actions?: boolean,
	sortable?: boolean,
	missingValue?: string,
	footer?: {},
	elevated?: boolean
}

interface TableState {
	header: {},
	body: {},
	footer: {},
	headerData: {}[],
	bodyData: {}[],
	footerData: {
		customFooter: {},
		pagination: {}
	},
	sortBy: SortBy,
	pagination: PaginationState | undefined
}

interface SortBy {
	id: string,
	order: 'asc' | 'desc' | undefined
}

interface PaginationOptions {
	rowsPerPageOptions: number[],
	colSpan?: number,
	rowsPerPage: number,
	currentPage?: number,
}

interface PaginationState {
	currentPageIndex: number,
	rowsPerPage: number
}

const ActionIcons: {[index: string]: any} = {
	add: <AddCircle fontSize='small' />,
	delete: <Delete fontSize='small' />
}

class InterestifyTable extends React.Component<TableProps, TableState> {
	constructor(props: TableProps) {
		super(props);
		// var customFooter = (this.props.footer) ? { ...this.props.footer, colSpan: this.props.header.length + 1 } : {};
		this.state = {
			header: [],
			body: [],
			footer: [],
			headerData: this.props.header,
			bodyData: this.props.body,
			footerData: {
				customFooter: (this.props.footer) ? this.props.footer : {},
				// customFooter: customFooter,
				pagination: {}
			},
			sortBy: {
				id: '',
				order: undefined
			},
			pagination: (!this.props.pagination) ? undefined : {
				currentPageIndex: (this.props.pagination.currentPage) ? this.props.pagination.currentPage : 0,
				rowsPerPage: this.props.pagination.rowsPerPage
			}
		};
	}

	componentDidMount() {
		this.setState({
			header: this.getHeader() // set header state
		}, () => {
			if (this.props.pagination) { // then if table is pagenated set pagination state data
				this.setState({
					footerData: {
						customFooter: this.state.footerData.customFooter,
						pagination: this.getPagination()
					}
				});
			}
			if (this.props.sortable) this.sortTableBy(this.props.header[0].id); // sort table if table is sortable
			else this.setState({ // else set body and footer state
				body: this.getBody(),
				footer: this.getFooter()
			});
		});
	}

	/**
	 * updates the pagination state
	 * @author oderah
	 * 
	 * @param currentPageIndex the current page index
	 * @param rowsPerPage the number of row to display per page
	 */
	updatePagination = (currentPageIndex: number, rowsPerPage: number): void => {
		this.setState({ // update pagination state
			pagination: {
				currentPageIndex: currentPageIndex,
				rowsPerPage: rowsPerPage
			}
		}, () => {
			this.setState({ // then update footer state data
				footerData: {
					customFooter: this.state.footerData.customFooter,
					pagination: this.getPagination()
				}
			}, () => {
				this.setState({ // then update footer state
					body: this.getBody(),
					footer: this.getFooter()
				});
			});	
		});
	}

	/**
	 * creates a row for the header of the table
	 * @author oderah
	 * 
	 * @return a TableRow component containing info 
	 * 			from this.props.header mapped to a TableCell component
	 */
	getHeader = (): {} => {
		var actions = this.props.header.find(x => 'actions' === x.id);
		if (this.props.actions && !actions) {
			this.props.header.push({ id: 'actions', title: 'Actions' });
		}
		return <TableRow children={ this.props.header.map(column => 
			<TableCell key={ column.id }>{ (this.props.sortable && 'actions' !== column.id) ? 
												<TableSortLabel 
													active={ column.id === this.state.sortBy.id } 
													direction={ (this.state.sortBy.id === column.id) ? this.state.sortBy.order : 'asc' } 
													children={ column.title } 
													onClick={ ($event: any) => { this.sortTableBy(column.id) } } /> : column.title } </TableCell>) } />;
	}

	/**
	 * creates rows for the body of the table
	 * @author oderah
	 * 
	 * @return TableRow components
	 * 			which contain info from this.props.body mapped to
	 * 			TableCell components
	 */
	getBody = (): {} => {
		var page = undefined;
		if (this.state.pagination && this.props.pagination) {
			var pages = _.chunk(this.state.bodyData, this.state.pagination.rowsPerPage);
			page = pages[this.state.pagination.currentPageIndex];
		} else page = this.state.bodyData;
		return page.map((row: {}, index: number) => 
			(<TableRow className={ (this.props.striped && index % 2 !== 0) ?  'dark-row' : 'light-row'} hover key={ index } children={ this.orderByHeader(row).map((data: {}[], index: number) => 
				<TableCell key={ index } children={ data } />) } />));
	}

	/**
	 * creates rows for the footer of the table
	 * @author oderah
	 * 
	 * @return TableRow components containing custom footer elements and
	 * 			pagination if enabled
	 */
	getFooter = (): {} => {
		var customFooter = <TableCell colSpan={ this.props.header.length } children={ this.state.footerData.customFooter } />;
		var combinedFooter: any[] = [ customFooter ];
		if (this.props.pagination) combinedFooter.push(this.state.footerData.pagination);
		return combinedFooter.map((row: {}, index: number) => (
			<TableRow className={ (index === 0) ? 'footer-row' : '' } key={ index } children={ row } />
		));
	}

	/**
	 * creates a foote element for pagination if enabled
	 * @author oderah
	 * 
	 * @return TablePagination component reflecting the current pagination state
	 */
	getPagination = (): {} => {
		if (this.props.pagination && this.state.pagination) {
			return (<TablePagination
				rowsPerPageOptions={ this.props.pagination.rowsPerPageOptions }
				colSpan={ (this.props.pagination.colSpan) ? this.props.pagination.colSpan : this.props.header.length }
				count={ this.props.body.length }
				rowsPerPage={ this.state.pagination.rowsPerPage }
				page={ this.state.pagination.currentPageIndex }
				onChangePage={ this.changePage }
				onChangeRowsPerPage={ this.changeRowsPerPage }
				ActionsComponent={ this.paginationNavActions }  />);
		} else return [];
	}

	/**
	 * creates the navigation icons for pagination if enabled
	 * @author oderah
	 * 
	 * @return a list of icon buttons for page navigation
	 */
	paginationNavActions = (): any => {
		// index of the last page
		var lastPageIndex = (this.state.pagination) ? Math.ceil(this.props.body.length / this.state.pagination.rowsPerPage) - 1 : 0;
		// index of the current page
		var currentPageIndex = (this.state.pagination) ? this.state.pagination.currentPageIndex : 0;
		return (
			<ul className="pagination-actions-root">
				<li>
					<IconButton
						onClick={ () => { this.changePage(null, 0); } }
						disabled={ currentPageIndex <= 0 }
						aria-label="first  page">
							{ <FirstPageIcon /> }
					</IconButton>
				</li>
				<li>
					<IconButton
						onClick={ () => { this.changePage(null, currentPageIndex - 1); } }
						disabled={ currentPageIndex <= 0 }
						aria-label="previous page">
							{ <KeyboardArrowLeft /> }
					</IconButton>
				</li>
				<li>
					<IconButton
						onClick={ () => { this.changePage(null, currentPageIndex + 1); } }
						disabled={ currentPageIndex >= lastPageIndex }
						aria-label="next page">
							{ <KeyboardArrowRight />}
					</IconButton>
				</li>
				<li>
					<IconButton
						onClick={ () => { this.changePage(null, lastPageIndex); } }
						disabled={ currentPageIndex >= lastPageIndex }
						aria-label="last page">
							{ <LastPageIcon />  }
					</IconButton>
				</li>
			</ul>
		);
	}

	/**
	 * changes page displayed
	 * @author oderah
	 * 
	 * @param $event click event
	 * @param newPageIndex index of new page to switch to
	 */
	changePage = ($event: React.MouseEvent<HTMLButtonElement> | null, newPageIndex: number) => {
		if (this.state.pagination) this.updatePagination(newPageIndex, this.state.pagination.rowsPerPage);
	}

	/**
	 * changes the number of rows displayed per page
	 * @author oderah
	 * 
	 * @param $event change event containing the new value
	 */
	changeRowsPerPage = ($event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (this.state.pagination) {
			this.updatePagination(0, parseInt($event.target.value, 10));
		}
	}

	/**
	 * orders a row object in the same other as this.props.header
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
				rowData.push((this.props.missingValue) ? this.props.missingValue : <span>&mdash;</span>);
			}
		});
		return rowData;
	}

	/**
	 * sorts the table by the given id
	 * @author oderah
	 * 
	 * @param id key of object to sort by
	 */
	sortTableBy = (id: string): void => {
		var prevSortId = this.state.sortBy.id;
		var body = [ ...this.props.body ];
		var sortBy: SortBy = {
			id: id,
			order: undefined
		}
		// switch sort direction based on last sort
		if (prevSortId === id) sortBy.order = ('asc' === this.state.sortBy.order) ? 'desc' : 'asc';
		else sortBy.order = 'asc';
		body = _.orderBy(body, id, sortBy.order);
		this.setState({
			bodyData: body,
			sortBy: sortBy,
			pagination: {
				currentPageIndex: 0,
				rowsPerPage: (this.state.pagination) ? this.state.pagination.rowsPerPage : this.props.body.length
			}
		}, () => { 
			this.setState({
				header: this.getHeader(),
				body: this.getBody(),
				footer: this.getFooter()
			});
		});
	}
	
	render() {
		return(
			<Table>
				<TableHead className={ (this.props.elevated) ? 'elevated-table' : '' } children={ this.state.header } />
				<TableBody className={ (this.props.elevated) ? 'elevated-table' : '' } children={ this.state.body } />
				<TableFooter children={ this.state.footer } />
			</Table>
		);
	}
}

export default InterestifyTable;
