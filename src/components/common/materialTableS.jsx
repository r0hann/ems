import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import '../../css/color.css';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 200
  }
}));

export default function MaterialTableS(props) {
  const { rows, columns } = props;

  const classes = useStyles();
  useEffect(() => {}, [props.items]);

  const raiseSort = path => {
    if (!props.sortColumn) return;
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    props.onSort(sortColumn);
  };

  const renderSortIcon = column => {
    const { sortColumn } = props;
    if (!sortColumn) return;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc m-2' />;
    return <i className='fa fa-sort-desc m-2' />;
  };

  const renderCell = (item, column) => {
    const { isAdmin } = props;
    if (column.content) return column.content(item, isAdmin);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <StyledTableCell
                style={{ fontSize: '15px', padding: '8px 10px 8px 5px' }}
                key={column.path || column.key}
                onClick={() => raiseSort(column.path)}
                align={column.titleAlign}>
                {column.label}
                {renderSortIcon(column)}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.id || row.user_id}>
              {columns.map(column => (
                <StyledTableCell
                  style={columnType(column.type, column.width)}
                  key={createKey(row, column)}
                  component={column.first ? 'th' : ''}
                  scope={column.first ? 'row' : ''}
                  padding='none'
                  size='small'
                  align={column.cellAlign}>
                  <div style={styleCell}>{renderCell(row, column)}</div>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const styleCell = {
  whiteSpace: 'nowrap',
  minWidth: '100px',
  maxWidth: '180px',
  paddingRight: '15px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const columnType = (type, width) => {
  if (!type) return { padding: '8px 10px 8px 5px' };
  else return { padding: '0px 10px 0px 5px' };
};
