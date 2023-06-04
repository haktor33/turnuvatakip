import React, { useEffect, useMemo, useRef, useState } from "react";
import 'styles/datagrid.css'
import { Table, Input, Button, Space, message } from 'antd';
import { withTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';
import { queryService } from "services/query.service";
import i18n from 'i18n';
import { columnRenderType, sortType } from "./DataGridRender";
import InfoCard from "./editors/InfoCardLink";

const DataGrid = (props) => {
    const [state, setState] = useState({ data: [], pagination: { current: 1, pageSize: 10, } });
    const components = useRef({ searchInput: null, searchText: null, searchedColumn: null, columns: [] })

    useEffect(() => {
        const columns = props.columnNameList.map(col => ({
            key: col.name,
            title: col.title ? i18n.t(col.title.toLocaleLowerCase()) : i18n.t(col.name.toLocaleLowerCase()),
            dataIndex: col.name,
            ...getColumnSearchProps(col),
        }));
        components.current.columns = columns;
        gridRefresh();

    }, [props.querName, props.gridKey]);

    const gridRefresh = () => {
        handleTableChange({ pagination: { current: 1, pageSize: 10, } });
    }
    const handleTableChange = ({ pagination, filters, sorter, extra }) => {
        if (props.filters) {
            filters = { ...props.filters, ...filters };
        }
        if (filters && Object.keys(filters).length > 0) {
            filters = JSON.stringify(filters);
        } else {
            filters = "";
        }
        const queryParams = { querName: props.querName }//{ querName: props.querName, ...pagination, ...sorter, filters };
        getQueryData({ queryParams, pagination });
    }

    const getQueryData = ({ queryParams, pagination }) => {
        setState({ ...state, loading: true });

        queryService.executeQuery(queryParams).then(result => {
            pagination.total = result.totalCount || result.length;
            setState({ ...state, data: result.pageList || result, pagination, loading: false });
        }).catch(err => {
            message.error(err);
            setState({ ...state, pagination, loading: false });
        });
    }

    const getColumnSearchProps = (colProps) => {
        const { dataIndex, columnType } = colProps;
        if (columnType && columnType.indexOf("Link") > -1) {
            return { render: cellData => columnRenderType({ ...colProps, gridRefresh, cellData }) };
        }
        const column = {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => { components.current.searchInput = node; }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                components.current.searchText = selectedKeys[0];
                                components.current.searchedColumn = dataIndex;
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
           
            render: cellData => columnRenderType({ ...colProps, gridRefresh, cellData }),
            ...sortType(columnType, null),
        }
        return column;
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        components.current.searchText = selectedKeys[0];
        components.current.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
        clearFilters();
        components.current.searchText = "";
    };

    const newRecordLink = useMemo(() => {
        if (props.newRecordComponent) {
            const infoCardProps = { comp: props.newRecordComponent, title: "newrecord", gridRefresh, gridProps: props };
            return <InfoCard {...infoCardProps} />
        } else {
            return null;
        }
    }, [props.querName, props.gridKey])

    return (<>
        {newRecordLink}
        <Table
            rowKey={record => record.id}
            sticky
            size="small"
            columns={components.current.columns}
            dataSource={state.data}
            pagination={{
                ...state.pagination, position: ['bottomRight'],
                showTotal: (total) => `${i18n.t('total')}: ${total} `,
                showSizeChanger: true,
                showQuickJumper: true,
            }}
            loading={state.loading}
            onChange={(pagination, filters, sorter, extra) => handleTableChange({ pagination, filters, sorter, extra })}
            rowClassName={(record, index) => {
                if (record.isGroupHeader) { return "group-header"; }
                else if (index % 2 === 0) { return "table-row-dark"; }
                else { return "table-row-light"; }
            }}
        />
    </>);
}

export default withTranslation()(DataGrid);